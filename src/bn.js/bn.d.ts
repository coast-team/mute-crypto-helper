/// <reference types="node" />
// tslint:disable:interface-name variable-name

// declare module 'bn.js' {
export type Endianness = 'le' | 'be'

export type IPrimeName = 'k256' | 'p224' | 'p192' | 'p25519'

export interface ReductionContext {
  m: number
  prime: any
  [key: string]: any
}

export class RedBN {
  redAdd(b: RedBN): RedBN
  redIAdd(b: RedBN): RedBN
  redSub(b: RedBN): RedBN
  redISub(b: RedBN): RedBN
  redShl(num: number): RedBN
  redMul(b: RedBN): RedBN
  redIMul(b: RedBN): RedBN
  redSqr(): RedBN
  redISqr(): RedBN
  /**
   * @description square root modulo reduction context's prime
   */
  redSqrt(): RedBN
  /**
   * @description  modular inverse of the number
   */
  redInvm(): RedBN
  redNeg(): RedBN
  /**
   * @description modular exponentiation
   */
  redPow(b: RedBN): RedBN
  fromRed(): BN
}

export class BN {
  static isBN(b: any): boolean
  static min(left: BN, right: BN): BN
  static max(left: BN, right: BN): BN
  static mont(num: BN): ReductionContext
  static red(reductionContext: BN | IPrimeName): ReductionContext

  constructor(number: number | string | number[] | Buffer | Uint8Array, base?: number | 'hex', endian?: Endianness)
  clone(): BN
  copy(dest: BN): void
  inspect(): string
  toString(base?: number | 'hex', length?: number): string
  toNumber(): number
  toJSON(): string
  toArray(endian?: Endianness, length?: number): number[]
  toArrayLike(constructor: Uint8ArrayConstructor, endian?: Endianness, length?: number): Uint8Array
  toBuffer(endian?: Endianness, length?: number): Buffer
  toRed(reductionContext: ReductionContext): RedBN
  bitLength(): number
  zeroBits(): number
  byteLength(): number
  isNeg(): boolean
  isEven(): boolean
  isOdd(): boolean
  isZero(): boolean
  cmp(b: BN): number
  lt(b: BN): boolean
  lte(b: BN): boolean
  gt(b: BN): boolean
  gte(b: BN): boolean
  eq(b: BN): boolean
  eqn(b: number): boolean

  redAdd(b: BN): BN
  redIAdd(b: BN): BN
  redSub(b: BN): BN
  redISub(b: BN): BN
  redShl(num: number): BN
  redMul(b: BN): BN
  redIMul(b: BN): BN
  redSqr(): BN
  redISqr(): BN
  redSqrt(): BN
  redInvm(): BN
  redNeg(): BN
  redPow(b: BN): BN
  fromRed(): BN

  neg(): BN
  abs(): BN
  add(b: BN): BN
  sub(b: BN): BN
  mul(b: BN): BN
  sqr(): BN
  pow(b: BN): BN
  div(b: BN): BN
  mod(b: BN): BN
  divRound(b: BN): BN

  or(b: BN): BN
  and(b: BN): BN
  xor(b: BN): BN
  setn(b: number): BN
  shln(b: number): BN
  shrn(b: number): BN
  testn(b: number): boolean
  maskn(b: number): BN
  bincn(b: number): BN
  notn(w: number): BN

  gcd(b: BN): BN
  egcd(b: BN): { a: BN; b: BN; gcd: BN }
  invm(b: BN): BN

  gtn(b: number): boolean
  isubn(b: number): BN
  muln(b: number): BN
}
// }
