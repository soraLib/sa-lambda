import { npm, once, queue, sub } from 'darl'

export const build = once([
  queue(
    npm`tsc`('--', '-p', 'tsconfig.build.json'),
    sub(
      npm`babel`('--', '--config-file', './babel.config.esm.mjs', 'dist/es', '-d', 'dist/esm', '--out-file-extension', '.mjs'),
      npm`babel`('--', '--config-file', './babel.config.umd.mjs', 'dist/es', '-d', 'dist/umd'),
    ),
  ),
  npm`tsc`('--', '-p', 'tsconfig.cjs.json'),
  npm`rollup`('--', '-c'),
  npm`rollup`('--', '-c', 'rollup.config.cjs.js'),
  npm`rollup`('--', '-c', 'rollup.config.es.js'),
  npm`rollup`('--', '-c', 'rollup.config.min.js')
])
