import terser from '@rollup/plugin-terser'
import glob from 'fast-glob'
import { defineConfig } from 'rolldown'

const name = 'SaLambda'
const inputFiles = glob.sync('src/**/*.ts', { absolute: false })

export default defineConfig([
  {
    input: inputFiles,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
    },
  },
  {
    input: inputFiles,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      entryFileNames: '[name].js',
    },
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/lib/sa-lambda.js', format: 'iife', name },
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/lib/sa-lambda.min.js', format: 'iife', name },
    plugins: [terser()],
  },
])
