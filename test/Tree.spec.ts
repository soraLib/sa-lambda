import { expect, it } from 'vitest'
import { collect, map } from '../src/Iterator'
import { pipe } from '../src/Pipe'
import { collectTreeNodes, filterTreeNodes } from '../src/Tree'

it('collect tree nodes', () => {
  interface Node {
    id: number
    children?: Node[]
  }

  const root: Node = {
    id: 1,
    children: [{
      id: 2,
    }, {
      id: 3,
      children: [{
        id: 4,
      }],
    }],
  }

  expect(pipe(
    collectTreeNodes(root, a => a.id === 2 || a.id === 4),
    map(a => a.id),
    collect,
  )).toEqual([2, 4])
})

it('filter tree', () => {
  interface Node {
    id: number
    children?: Node[]
  }

  const root: Node = {
    id: 1,
    children: [{
      id: 2,
    }, {
      id: 3,
      children: [{
        id: 4,
      }],
    }, {
      id: 5,
    }],
  }

  expect(
    filterTreeNodes(root, a => a.id === 1 || a.id >= 3),
  ).toEqual({
    id: 1,
    children: [{
      id: 3,
      children: [{
        id: 4,
      }],
    }, {
      id: 5,
    }],
  })

  expect(
    filterTreeNodes(root, a => a.id === 2),
  ).toEqual(null)
})
