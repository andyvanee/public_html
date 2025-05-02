import { describe, it, expect } from 'bun:test'

import {
    immediate,
    absolute,
    zeroPage,
    zeroPageX,
    absoluteX,
    relative,
    xIndexedIndirect,
    indirectYIndexed,
} from './instructions'
import { Cpu, I8, Register, StatusFlag } from './types'
import { getFlag, setFlag } from './Cpu'

const zpLo = 0x1a
const zpHi = 0x1a
const addrLo = 0x34
const addrHi = 0x12
const addr = 0x1234
const opcodeSize = 1
const opcodeStart = 0x122

const mockCpu = () => {
    const cpu: Cpu = {
        halt: true,
        memory: new Uint8Array(256 * 256),
        registers: new Uint8Array(8),
        address: 0x00,
        value: 0x00,
        pc: opcodeStart + opcodeSize,
        sp: 0x00,
    }

    cpu.memory.fill(0)
    cpu.registers.fill(0)
    cpu.registers[Register.A] = 19
    cpu.registers[Register.X] = 20
    cpu.registers[Register.Y] = 21
    cpu.memory[0x81] = zpLo
    cpu.memory[0x82] = zpHi
    cpu.memory[0x0123] = addrLo
    cpu.memory[0x0124] = addrHi
    cpu.memory[addr] = 42 // value at address

    return cpu
}

const lda = (cpu: Cpu, value: number) => {
    cpu.registers[Register.A] = value
    return value
}

const inc = (cpu: Cpu, value: number) => value + 1

// "side-effect" instructions may use address or registers rather than value, but the value should still be returned
const jmp = (cpu: Cpu, value: number) => {
    cpu.pc = cpu.address
    return value
}

const cpx = (cpu: Cpu, value: I8) => {
    setFlag(cpu, StatusFlag.Z, cpu.registers[Register.X] - value === 0)
    return value
}

const adc = (cpu: Cpu, value: I8) => {
    console.log('adc', value, cpu.registers[Register.A], cpu.registers[Register.X], cpu.address)
    const result = cpu.registers[Register.A] + value
    cpu.registers[Register.A] = result & 0xff
    setFlag(cpu, StatusFlag.Z, result === 0)
    setFlag(cpu, StatusFlag.C, result > 0xff)
    setFlag(cpu, StatusFlag.N, (result & 0x80) !== 0)
    return value
}

describe('immediate', () => {
    describe('CPX', () => {
        const cpu = mockCpu()
        cpu.memory[0x123] = 20
        immediate(cpx)(cpu)

        it('does not modify the value at the address', () => {
            expect(cpu.memory[0x123]).toBe(20)
        })

        it('sets the zero flag', () => {
            expect(getFlag(cpu, StatusFlag.Z)).toBe(true)
        })

        it('increments the program counter by 1', () => {
            expect(cpu.pc).toBe(0x124)
        })
    })
})

describe('abs', () => {
    describe('LDA', () => {
        const cpu = mockCpu()
        absolute(lda)(cpu)

        it('does not modify the value at the address', () => {
            expect(cpu.memory[0x123]).toBe(0x34)
            expect(cpu.memory[0x124]).toBe(0x12)
        })

        it('sets A to the value at the address', () => {
            expect(cpu.registers[Register.A]).toBe(42)
        })

        it('increments the program counter by 2', () => {
            expect(cpu.pc).toBe(0x125)
        })
    })

    describe('INC', () => {
        const cpu = mockCpu()
        cpu.memory[0x123] = 0x34 // low byte
        cpu.memory[0x124] = 0x12 // high byte
        cpu.memory[0x1234] = 42

        absolute(inc)(cpu)

        it('does not modify the instruction', () => {
            expect(cpu.memory[0x123]).toBe(0x34)
            expect(cpu.memory[0x124]).toBe(0x12)
        })

        it('increments the value at the address', () => {
            expect(cpu.memory[0x1234]).toBe(43)
        })
    })

    describe('JMP', () => {
        const cpu = mockCpu()
        cpu.memory[0x123] = 0x34 // low byte
        cpu.memory[0x124] = 0x12 // high byte

        absolute(jmp)(cpu)

        it('does not modify the value at the address', () => {
            expect(cpu.memory[0x123]).toBe(0x34)
            expect(cpu.memory[0x124]).toBe(0x12)
        })

        it('sets the program counter to the address', () => {
            expect(cpu.pc).toBe(0x1234)
        })
    })
})

describe('zpg', () => {
    describe('LDA', () => {
        const cpu = mockCpu()
        cpu.memory[0x123] = 0x81
        zeroPage(lda)(cpu)

        it('does not modify the value at the address', () => {
            expect(cpu.memory[0x123]).toBe(0x81)
        })

        it('sets A to the value at the address', () => {
            expect(cpu.registers[Register.A]).toBe(zpLo)
        })

        it('increments the program counter by 1', () => {
            expect(cpu.pc).toBe(0x124)
        })
    })
})

describe('zpg, X', () => {
    describe('LDA', () => {
        const cpu = mockCpu()
        cpu.registers[Register.X] = 0x01 // X register
        cpu.memory[0x123] = 0x81
        zeroPageX(lda)(cpu)

        it('does not modify the value at the address', () => {
            expect(cpu.memory[0x123]).toBe(0x81)
        })

        it('sets A to effective address (zpHi)', () => {
            expect(cpu.registers[Register.A]).toBe(zpHi)
        })

        it('increments the program counter by 1', () => {
            expect(cpu.pc).toBe(0x124)
        })
    })

    describe('address wrap', () => {
        const cpu = mockCpu()
        cpu.registers[Register.X] = 0xff // X register
        cpu.memory[0x123] = 0x81
        cpu.memory[0x80] = 0x11

        zeroPageX(lda)(cpu)

        it('reads from address 0x80', () => {
            expect(cpu.address).toBe(0x80)
        })

        it('sets A to the value at the address', () => {
            expect(cpu.registers[Register.A]).toBe(0x11)
        })
    })
})

describe('absolute, X', () => {
    const value = 0x11

    describe('LDA', () => {
        const cpu = mockCpu()
        const address = 0x1235
        cpu.registers[Register.X] = 0x01 // X register
        cpu.memory[address] = value
        absoluteX(lda)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(addrLo)
        })

        it('reads from expected address', () => {
            expect(cpu.address).toBe(address)
        })

        it('sets A to effective address (zpHi)', () => {
            expect(cpu.registers[Register.A]).toBe(value)
        })

        it('increments the program counter by 2', () => {
            expect(cpu.pc).toBe(0x125)
        })
    })

    describe('16-bit address wrap', () => {
        const cpu = mockCpu()
        const address = 0x00
        cpu.registers[Register.X] = 0x01 // X register
        cpu.memory[0x00] = value
        cpu.memory[0x123] = 0xff // addr low
        cpu.memory[0x124] = 0xff // addr high

        zeroPageX(lda)(cpu)

        it('reads from expected address', () => {
            expect(cpu.address).toBe(address)
        })

        it('sets A to the value at the address', () => {
            expect(cpu.registers[Register.A]).toBe(value)
        })
    })
})

describe('indirect', () => {
    describe('LDA', () => {
        const cpu = mockCpu()
        cpu.memory[0x123] = 0x34
        cpu.memory[0x124] = 0x12
        cpu.memory[0x1234] = 42

        absolute(lda)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(addrLo)
            expect(cpu.memory[0x124]).toBe(addrHi)
        })

        it('sets A to the value at the address', () => {
            expect(cpu.registers[Register.A]).toBe(42)
        })

        it('increments the program counter by 2', () => {
            expect(cpu.pc).toBe(0x125)
        })
    })
})

describe('relative', () => {
    describe('JMP', () => {
        const cpu = mockCpu()
        const offset = 0x05
        cpu.memory[0x123] = offset

        relative(jmp)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(offset)
        })

        it('sets the program counter to the address', () => {
            expect(cpu.pc).toBe(opcodeStart + offset)
        })
    })

    describe('negative offset', () => {
        const cpu = mockCpu()
        const offset = 0x80
        cpu.memory[0x123] = offset

        relative(jmp)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(0x80)
        })

        it('sets the program counter to the address', () => {
            expect(cpu.pc).toBe(opcodeStart - offset)
        })
    })
})

describe('xIndexedIndirect', () => {
    describe('ADC', () => {
        const cpu = mockCpu()
        cpu.registers[Register.A] = 99
        cpu.registers[Register.X] = 0x01
        cpu.memory[0x123] = zpLo
        cpu.memory[zpLo + 1] = 2

        xIndexedIndirect(adc)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(zpLo)
        })

        it('sets A to the sum of A + (M + X)', () => {
            expect(cpu.registers[Register.A]).toBe(101)
        })

        it('increments the program counter by 1', () => {
            expect(cpu.pc).toBe(0x124)
        })
    })
})

describe('indirectYIndexed', () => {
    describe('ADC', () => {
        const cpu = mockCpu()
        cpu.registers[Register.A] = 99
        cpu.registers[Register.Y] = 0x05
        cpu.memory[0x123] = 0xff
        cpu.memory[0xff + 0x05] = 4

        indirectYIndexed(adc)(cpu)

        it('does not modify the instruction address', () => {
            expect(cpu.memory[0x123]).toBe(0xff)
        })

        it('sets A to the sum of A + (M + Y)', () => {
            expect(cpu.registers[Register.A]).toBe(103)
        })

        it('increments the program counter by 1', () => {
            expect(cpu.pc).toBe(0x124)
        })
    })
})
