import { collectTreeNodes } from '../src/Tree'
import { pipe } from '../src/Pipe'
import { map, collect } from '../src/Iterator'

test('collect tree nodes', () => {
  type Node = {
    id: number
    children?: Node[]
  }

  const root: Node = {
    id: 1,
    children: [{
      id: 2
    }, {
      id: 3,
      children: [{
        id: 4
      }]
    }]
  }

  expect(pipe(
    collectTreeNodes(root, (a) => a.id === 2 || a.id === 4),
    map(a => a.id),
    collect
  )).toEqual([2, 4])
})
