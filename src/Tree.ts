import { Predicate } from './Predicate'

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

export const collectTreeNodes = <T extends TreeNode<Record<string, any>>>(root: T, p: Predicate<T>): T[] => {
  const nodes: T[] = []

  const traverse = (node: T) => {
    if (p(node)) nodes.push(node)
    if(node.children) {
      for (const child of node.children) {
        traverse(child as T)
      }
    }
  }
  traverse(root)

  return nodes
}
