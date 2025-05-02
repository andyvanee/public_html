import { fetchByte, fetchWord, signed } from './Cpu'
import { Cpu, I16, I8, Register } from './types'

type immediateCallback = (cpu: Cpu, value: I8) => void
type valueCallback = (cpu: Cpu, value: I8) => I8

/**
 * Immediate mode where callback uses the value directly (eg: CPX)
 */
export const immediate = (callback: immediateCallback) => (cpu: Cpu) => {
    callback(cpu, fetchByte(cpu))
}

/**
 * Abolute addressing where callback uses value at given address (eg: LDA)
 */
export const absolute = (callback: valueCallback) => (cpu: Cpu) => {
    cpu.address = fetchWord(cpu)
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

const absoluteIndexed = (register: Register) => (callback: valueCallback) => (cpu: Cpu) => {
    cpu.address = fetchWord(cpu)
    const index = cpu.registers[register]
    cpu.address = (cpu.address + index) & 0xffff
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

export const absoluteX = absoluteIndexed(Register.X)
export const absoluteY = absoluteIndexed(Register.Y)

export const zeroPage = (callback: valueCallback) => (cpu: Cpu) => {
    cpu.address = fetchByte(cpu)
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

const zeroPageIndexed = (register: Register) => (callback: valueCallback) => (cpu: Cpu) => {
    cpu.address = fetchByte(cpu)
    const index = cpu.registers[register]
    cpu.address = (cpu.address + index) & 0xff
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

export const zeroPageX = zeroPageIndexed(Register.X)
export const zeroPageY = zeroPageIndexed(Register.Y)

export const indirect = (callback: valueCallback) => (cpu: Cpu) => {
    cpu.address = fetchWord(cpu)
    const low = cpu.memory[cpu.address]
    const high = cpu.memory[(cpu.address + 1) & 0xffff]
    cpu.address = low | (high << 8)
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

export const relative = (callback: valueCallback) => (cpu: Cpu) => {
    const pc = cpu.pc
    const offset = fetchByte(cpu)
    console.log('offset', offset.toString(16))
    cpu.address = (pc + signed(offset) - 1) & 0xffff
    cpu.memory[cpu.address] = callback(cpu, cpu.memory[cpu.address])
}

export const xIndexedIndirect = (callback: valueCallback) => (cpu: Cpu) => {
    const address = (fetchByte(cpu) + cpu.registers[Register.X]) & 0xff
    cpu.address = cpu.memory[address]
    cpu.memory[cpu.address] = callback(cpu, cpu.address)
}

export const indirectYIndexed = (callback: valueCallback) => (cpu: Cpu) => {
    const address = fetchByte(cpu) + cpu.registers[Register.Y]
    cpu.address = cpu.memory[address]
    cpu.memory[cpu.address] = callback(cpu, cpu.address)
}
