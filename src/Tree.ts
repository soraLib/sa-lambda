import type { Predicate } from './Predicate'

export type TreeNode<A> = A & {
  children?: TreeNode<A>[]
}

export const TreeKind = Symbol('Tree')
export type TreeKind = typeof TreeKind

declare module './Functors/HKT' {
  interface Kinded<T> {
    readonly [TreeKind]: TreeNode<T>
  }
}

/**
 * Collects the tree nodes that satisfy the predicate and store them in an array.
 *
 * @example
 *
 * const root = {
 *  id: 1,
 *   children: [{
 *      id: 2
 *   }, {
 *     id: 3,
 *     children: [{
 *       id: 4
 *     }]
 *  }]
 * }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     collectTreeNodes(root, (a) => a.id === 2 || a.id === 4),
 *     map(a => a.id),
 *     collect
 *   ),
 *   [2, 4])
 */
export const collectTreeNodes = <T extends TreeNode<Record<string, any>>>(root: T, p: Predicate<T>): T[] => {
  const nodes: T[] = []

  const traverse = (node: T) => {
    if (p(node))
      nodes.push(node)
    if (node.children) {
      for (const child of node.children) {
        traverse(child as T)
      }
    }
  }
  traverse(root)

  return nodes
}

/**
 * Filters the tree nodes that satisfy the predicate and return the root.
 *
 * @example
 *
 * const root = {
 *  id: 1,
 *   children: [{
 *      id: 2
 *   }, {
 *     id: 3,
 *     children: [{
 *       id: 4
 *     }]
 *  }]
 * }
 *
 * assert.deepStrictEqual(
 *   collectTreeNodes(root, (a) => a.id <= 2),
 *   {
 *     id: 1,
 *     children: [{
 *       id: 2,
 *     }]
 *   })
 */
export const filterTreeNodes = <T extends TreeNode<Record<string, any>>>(root: T, p: Predicate<T>): T | null => {
  if (!p(root))
    return null

  if (root.children?.length) {
    root.children = (root.children as T[]).reduce<T[]>((prev, cur) => {
      const result = filterTreeNodes(cur, p)

      if (result)
        return [...prev, result]

      return prev
    }, [])
  }

  return root
}
