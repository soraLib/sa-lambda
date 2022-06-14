/**
 * A lazy `thunk`
 */
export type Lazy<A> = () => A

/**
  * Identity
  */
export const identity = <A>(a: A): A => a

/**
  * A thunk returns self.
  */
export const constant = <A>(a: A): Lazy<A> => () => a
/**
  * A thunk returns always `true`.
  */
export const constTrue: Lazy<boolean> = constant(true)
/**
  * A thunk returns always `false`.
  */
export const constFalse: Lazy<boolean> = constant(false)
/**
  * A thunk returns always `null`.
  */
export const constNull: Lazy<null> = constant(null)
/**
  * A thunk returns always `undefined`.
  */
export const constUndefined: Lazy<undefined> = constant(void 0)
/**
  * A thunk returns always `void`.
  */
export const constVoid = constUndefined
