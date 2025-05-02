export interface ProcessorConfig {
    memory?: number
    freq?: number
}

const startMessage = `Hello world.`

const addressing = {
    implied: (fn: ImpliedInstruction) => {
        return (cpu: Cpu) => {
            return fn(cpu)
        }
    },
    immediate: (fn: ValueInstruction) => {
        return (cpu: Cpu) => {
            const value = byte(cpu)
            return fn(cpu, value)
        }
    },
    absolute: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I16 = address(cpu)
            return fn(cpu, addr)
        }
    },
    zeropage: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I8 = byte(cpu)
            return fn(cpu, addr)
        }
    },
    zeropageX: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I8 = byte(cpu)
            const x = cpu.registers[Register.X]
            return fn(cpu, (addr + x) & 0xff)
        }
    },
    zeropageY: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I8 = byte(cpu)
            const y = cpu.registers[Register.Y]
            return fn(cpu, (addr + y) & 0xff)
        }
    },
    absoluteX: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I16 = address(cpu)
            const x = cpu.registers[Register.X]
            return fn(cpu, (addr + x) & 0xffff)
        }
    },
    absoluteY: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I16 = address(cpu)
            const x = cpu.registers[Register.Y]
            return fn(cpu, (addr + x) & 0xffff)
        }
    },
    xIndexedIndirect: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I16 = byte(cpu)
            const x = cpu.registers[Register.X]
            const low = cpu.memory[(addr + x) & 0xff]
            const high = cpu.memory[(addr + x + 1) & 0xff]
            return fn(cpu, low | (high << 8))
        }
    },
    indirectYIndexed: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const addr: I16 = byte(cpu)
            const low = cpu.memory[addr & 0xff]
            const high = cpu.memory[(addr + 1) & 0xff]
            const y = cpu.registers[Register.Y]
            return fn(cpu, (low | (high << 8)) + y)
        }
    },
    relative: (fn: AddressInstruction) => {
        return (cpu: Cpu) => {
            const offset = byte(cpu)
            const addr = (cpu.pc + offset) & 0xffff
            return fn(cpu, addr)
        }
    },
}

const implied: Record<string, ImpliedInstruction> = {
    BRK: (cpu: Cpu) => {
        cpu.halt = true
    },
    NOP: (cpu: Cpu) => {},
    ASL: (cpu: Cpu) => {
        const a = cpu.registers[Register.A]
        const bits: I16 = a << 1
        const result = bits & 0xff
        cpu.registers[Register.A] = result

        flag.set(cpu, StatusFlag.N, (result & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, result === 0)
        flag.set(cpu, StatusFlag.C, bits !== result)
    },
}

const absolute: Record<string, AddressInstruction> = {
    JMP: (cpu: Cpu, addr: I16) => {
        cpu.pc = addr
    },
}

const immediate: Record<string, ValueInstruction> = {
    ADC: (cpu: Cpu, value: I8) => {
        const a = cpu.registers[Register.A]
        const c = flag.get(cpu, StatusFlag.C) ? 1 : 0
        const result = a + value + c
        cpu.registers[Register.A] = result & 0xff

        flag.set(cpu, StatusFlag.N, (result & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, result === 0)
        flag.set(cpu, StatusFlag.C, result > 0xff)
        flag.set(cpu, StatusFlag.V, result > 0xff)
    },
    AND: (cpu: Cpu, value: I8) => {
        const a = cpu.registers[Register.A]
        cpu.registers[Register.A] = a & value

        flag.set(cpu, StatusFlag.N, (cpu.registers[Register.A] & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, cpu.registers[Register.A] === 0)
    },
    ASL: (cpu: Cpu, value: I8) => {
        const bits: I16 = value << 1
        const result = bits & 0xff

        flag.set(cpu, StatusFlag.N, (result & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, result === 0)
        flag.set(cpu, StatusFlag.C, bits !== result)
        return result
        // const result = value << 1
        // flags.set(cpu, StatusFlag.N, result !== 0)
        // flags.set(cpu, StatusFlag.Z, result === 0)
        // flags.set(cpu, StatusFlag.C, (result & 0x80) !== 0)
    },
    BCC: (cpu: Cpu, addr: I16) => {
        if (!flag.get(cpu, StatusFlag.C)) {
            cpu.pc = addr
        }
    },
    BCS: (cpu: Cpu, addr: I16) => {
        if (flag.get(cpu, StatusFlag.C)) {
            cpu.pc = addr
        }
    },
    LDA: (cpu: Cpu, value: I8) => {
        cpu.registers[Register.A] = value

        flag.set(cpu, StatusFlag.N, (cpu.registers[Register.A] & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, cpu.registers[Register.A] === 0)
    },
    LDX: (cpu: Cpu, value: I8) => {
        cpu.registers[Register.X] = value

        flag.set(cpu, StatusFlag.N, (cpu.registers[Register.X] & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, cpu.registers[Register.X] === 0)
    },
    LDY: (cpu: Cpu, value: I8) => {
        cpu.registers[Register.Y] = value

        flag.set(cpu, StatusFlag.N, (cpu.registers[Register.Y] & 0x80) !== 0)
        flag.set(cpu, StatusFlag.Z, cpu.registers[Register.Y] === 0)
    },
    STA: (cpu: Cpu, value: I8) => {
        const addr = cpu.registers[Register.A]
        cpu.memory[addr] = value
    },
    STX: (cpu: Cpu, value: I8) => {
        const addr = cpu.registers[Register.X]
        cpu.memory[addr] = value
    },
    STY: (cpu: Cpu, value: I8) => {
        const addr = cpu.registers[Register.Y]
        cpu.memory[addr] = value
    },
}

const instructionSet: [number, string, ImpliedInstruction][] = [
    [0x00, 'BRK', addressing.implied(implied.BRK)],
    [0x06, 'ASL', addressing.zeropage(immediate.ASL)],
    [0x0a, 'ASL', addressing.implied(implied.ASL)],
    [0x0e, 'ASL', addressing.absolute(immediate.ASL)],
    [0x16, 'ASL', addressing.zeropageX(immediate.ASL)],
    [0x1e, 'ASL', addressing.absoluteX(immediate.ASL)],
    [0x21, 'AND', addressing.xIndexedIndirect(immediate.AND)],
    [0x25, 'AND', addressing.zeropage(immediate.AND)],
    [0x29, 'AND', addressing.immediate(immediate.AND)],
    [0x2d, 'AND', addressing.absolute(immediate.AND)],
    [0x31, 'AND', addressing.indirectYIndexed(immediate.AND)],
    [0x35, 'AND', addressing.zeropageX(immediate.AND)],
    [0x39, 'AND', addressing.absoluteY(immediate.AND)],
    [0x3d, 'AND', addressing.absoluteX(immediate.AND)],
    [0x4c, 'JMP', addressing.absolute(absolute.JMP)],
    [0x4c, 'JMP', addressing.relative(implied.JMP)],
    [0x61, 'ADC', addressing.xIndexedIndirect(immediate.ADC)],
    [0x65, 'ADC', addressing.zeropage(immediate.ADC)],
    [0x69, 'ADC', addressing.immediate(immediate.ADC)],
    [0x6c, 'JMP', addressing.absolute(absolute.JMP)],
    [0x6d, 'ADC', addressing.absolute(immediate.ADC)],
    [0x71, 'ADC', addressing.indirectYIndexed(immediate.ADC)],
    [0x75, 'ADC', addressing.zeropageX(immediate.ADC)],
    [0x79, 'ADC', addressing.absoluteY(immediate.ADC)],
    [0x7d, 'ADC', addressing.absoluteX(immediate.ADC)],
    [0x81, 'STA', addressing.xIndexedIndirect(immediate.STA)],
    [0x84, 'STY', addressing.zeropage(immediate.STY)],
    [0x85, 'STA', addressing.implied(implied.STA)],
    [0x86, 'STX', addressing.zeropage(immediate.STX)],
    [0x8c, 'STY', addressing.absolute(immediate.STY)],
    [0x8d, 'STA', addressing.absolute(immediate.STA)],
    [0x8e, 'STX', addressing.absolute(immediate.STX)],
    [0x90, 'BCC', addressing.relative(implied.BCC)],
    [0x91, 'STA', addressing.indirectYIndexed(immediate.STA)],
    [0x94, 'STY', addressing.zeropageX(immediate.STY)],
    [0x96, 'STX', addressing.zeropageY(immediate.STX)],
    [0x99, 'STA', addressing.absoluteY(immediate.STA)],
    [0x9d, 'STA', addressing.absoluteX(immediate.STA)],
    [0xa0, 'LDY', addressing.immediate(immediate.LDY)],
    [0xa1, 'LDA', addressing.xIndexedIndirect(immediate.LDA)],
    [0xa2, 'LDX', addressing.immediate(immediate.LDX)],
    [0xa4, 'LDY', addressing.zeropage(immediate.LDY)],
    [0xa5, 'LDA', addressing.zeropage(immediate.LDA)],
    [0xa6, 'LDX', addressing.zeropage(immediate.LDX)],
    [0xa9, 'LDA', addressing.immediate(immediate.LDA)],
    [0xac, 'LDY', addressing.absolute(immediate.LDY)],
    [0xad, 'LDA', addressing.absolute(immediate.LDA)],
    [0xae, 'LDX', addressing.absolute(immediate.LDX)],
    [0xb1, 'LDA', addressing.indirectYIndexed(immediate.LDA)],
    [0xb4, 'LDY', addressing.zeropageX(immediate.LDY)],
    [0xb5, 'LDA', addressing.zeropageX(immediate.LDA)],
    [0xb6, 'LDX', addressing.zeropageY(immediate.LDX)],
    [0xb9, 'LDA', addressing.absoluteY(immediate.LDA)],
    [0xbc, 'LDY', addressing.absoluteX(immediate.LDY)],
    [0xbd, 'LDA', addressing.absoluteX(immediate.LDA)],
    [0xbe, 'LDX', addressing.absoluteY(immediate.LDX)],
    [0xea, 'NOP', addressing.implied(implied.NOP)],
]

const instructions = new Map<number, ImpliedInstruction>()
const opcodes = new Map<number, string>()
const operations = new Map<string, number[]>()

for (const [opcode, name, fn] of instructionSet) {
    const ops = operations.get(name) ?? []
    operations.set(name, [...ops, opcode])
    opcodes.set(opcode, name)
    instructions.set(opcode, fn)
}

export class Processor {
    freq: number
    cpu: Cpu
    now: number
    delta: number
    opsPerTick: number = 0

    get halt() {
        return this.cpu.halt
    }
    set halt(value: boolean) {
        this.cpu.halt = value
    }

    constructor(config: ProcessorConfig = {}) {
        this.freq = config.freq ?? 1_000_000
        this.now = performance.now()
        this.delta = 100

        this.cpu = {
            halt: true,
            memory: new Uint8Array(config.memory ?? 256 * 256),
            registers: new Uint8Array(8),
            pc: 0,
            sp: 0,
        }
    }

    reset() {
        this.halt = true
        this.cpu.pc = 0
        this.cpu.sp = 0x01ff
        this.cpu.registers.fill(0)
        this.cpu.memory.fill(0)

        // Program
        this.cpu.memory[0x00] = 0xea // NOP
        this.cpu.memory[0x01] = 0x4c // JMP
        this.cpu.memory[0x02] = 0x00 // low byte
        this.cpu.memory[0x03] = 0x00 // high byte

        // Screen
        this.cpu.memory[0x1000 - 3] = 0 // mode
        this.cpu.memory[0x1000 - 2] = 1 // fg
        this.cpu.memory[0x1000 - 1] = 0 // bg
        for (let i = 0; i < 0x1000; i++) {
            this.cpu.memory[0x1000 + i] = startMessage.charCodeAt(i) || 48
        }
    }

    resume() {
        this.halt = false
        this.now = performance.now()
    }

    tick() {
        this.opsPerTick = Math.floor(this.freq / 60)

        for (let i = 0; i < this.opsPerTick; i++) {
            if (this.halt) break
            const opcode = byte(this.cpu)
            const instruction = instructions.get(opcode)
            if (instruction) instruction(this.cpu)
        }
    }
}
