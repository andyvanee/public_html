import { Cpu, Register, StatusFlag, type I8, type I16 } from './types'

export type GetFlag = (cpu: Cpu, flag: StatusFlag) => boolean
export const getFlag: GetFlag = (cpu, flag) => (cpu.registers[Register.P] & flag) !== 0

export type SetFlag = (cpu: Cpu, flag: StatusFlag, value: boolean) => void
export const setFlag: SetFlag = (cpu, flag, value) => {
    cpu.registers[Register.P] = value ? cpu.registers[Register.P] | flag : cpu.registers[Register.P] & ~flag
}

export type FetchByte = (cpu: Cpu) => I8
export const fetchByte: FetchByte = (cpu) => {
    cpu.address = cpu.pc
    cpu.value = cpu.memory[cpu.address]
    cpu.pc += 1
    cpu.pc = cpu.pc % 0xffff
    return cpu.value
}

export type FetchWord = (cpu: Cpu) => I16
export const fetchWord: FetchWord = (cpu: Cpu) => {
    const low = fetchByte(cpu)
    const high = fetchByte(cpu)
    return low | (high << 8)
}

export const signed = (value: I8) => (value & 0x80 ? value - 0x100 : value)
