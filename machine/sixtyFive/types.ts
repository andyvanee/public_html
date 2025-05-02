export type I8 = number
export type I16 = number

export interface Cpu {
    halt: boolean
    memory: Uint8Array
    registers: Uint8Array
    address: I16
    value: I8
    pc: I16
    sp: I16
}

export enum Register {
    PC = 0, // Program counter (16 bits)
    A = 2, // Accumulator
    X = 3, // X register
    Y = 4, // Y register
    P = 5, // Processor status register
    SP = 6, // Stack pointer
}

export enum StatusFlag {
    N = 0, // Negative flag
    V = 1, // Overflow flag
    U = 2, // Unused flag
    B = 3, // Break flag
    D = 4, // Decimal mode flag
    I = 5, // Interrupt disable flag
    Z = 6, // Zero flag
    C = 7, // Carry flag
}

export type ImpliedInstruction = (cpu: Cpu) => void
export type AddressInstruction = (cpu: Cpu, address: I16) => void
export type ValueInstruction = (cpu: Cpu, value: I8) => void
export type Instruction = ImpliedInstruction | AddressInstruction | ValueInstruction
