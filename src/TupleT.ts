/**
 * Returns tail of tuple.
 *
 * ```ts
 * TupleTail<[1, 2, 3]> => [2, 3]
 * ```
 */
export type TupleTail<T extends any[]> = T extends [any, ...infer R] ? R : never

/**
  * Returns last of tuple.
  *
  * ```ts
  * TupleLast<[1, 2, 3]> => 3
  * ```
  */
export type TupleLast<T extends any[]> = T[TupleTail<T>['length']]
