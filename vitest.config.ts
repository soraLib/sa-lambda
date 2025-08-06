import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.spec.ts'],
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
      include: [
        'src/Async.ts',
        'src/Delay.ts',
        'src/Effect.ts',
        'src/Either.ts',
        'src/Equal.ts',
        'src/Iterator.ts',
        'src/Math.ts',
        'src/Maybe.ts',
        'src/Pipe.ts',
        'src/Tree.ts',
        'src/function.ts'
      ]
    }
  }
})
