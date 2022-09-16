import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/sa-lambda.js',
    format: 'cjs',
    name: 'sa-lambda'
  },
  plugins: [typescript(), resolve()]
};