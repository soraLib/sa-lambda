import { defineConfig } from 'rolldown'
import terser from '@rollup/plugin-terser'

const input = 'src/index.ts'
const name = 'SaLambda'

export default defineConfig([
  // CJS
  { input, output:{ file:'dist/cjs/index.js', format:'cjs' } },
  // ESM
  { input, output:{ file:'dist/esm/index.mjs', format:'esm' } },
  // UMD / IIFE main
  { input, output:{ file:'dist/lib/sa-lambda.js', format:'iife', name } },
  // browser min
  { input, output:{ file:'dist/lib/sa-lambda.min.js', format:'iife', name }, plugins: [terser()] }
])
