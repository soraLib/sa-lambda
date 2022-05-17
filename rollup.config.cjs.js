import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './sa-lambda.js',
    format: 'cjs',
    name: 'sa-lambda'
  },
  plugins: [typescript(), resolve()]
};