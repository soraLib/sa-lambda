/**
 * Type defunctionalization
 */

/**
 * `* -> *` constructors
 */
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export const Kind = Symbol('Kind')
export type Kind = typeof Kind

export interface Kinded<T extends any[]> {}
export type URIS = keyof Kinded<any[]>

export type KindOf<T extends URIS, P extends any[]> = Kinded<P>[T]
