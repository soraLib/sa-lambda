export interface None {
  readonly _tag: 'None'
}

export interface Some<T> {
  readonly _tag: 'Some'
  readonly value: T
}

export type Maybe<T> = None | Some<T>

export const isNone = <T>(m: Maybe<T>): m is Some<T> => m._tag === 'None'
export const isSome = <T>(m: Maybe<T>): m is Some<T> => m._tag === 'Some'

export const none: Maybe<never> = { _tag: 'None' }
export const some = <T>(value: T): Maybe<T> => ({ _tag: 'Some', value })
