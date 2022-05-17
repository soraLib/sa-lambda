import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/sa-lambda.js',
    format: 'umd',
    name: 'sa-lambda'
  },
  plugins: [typescript(), resolve()]
};