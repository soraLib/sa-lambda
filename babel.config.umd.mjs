import fs from 'fs'
import { basename, dirname, extname, join, normalize } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, './dist/es')

/** @type {Map<string, string[]>} */
const moduleIds = new Map

function getModuleId(/** @type {string} */name) {
  const file = basename(name, '.js')

  if (file == 'index') return ['sa-lambda']

  return ['sa-lambda', file]
}

function getDoduleIds(/** @type {string} */dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const path = normalize(join(dir, file))
    if (extname(path) == '') {
      getDoduleIds(path)
      continue
    }

    const id = getModuleId(path)

    moduleIds.set(path, id)
  }
}
getDoduleIds(dir)

const globals = Object.fromEntries([...moduleIds.entries()].flatMap(([k, id]) => {
  return [
    [id.join('/'), id.join('.')],
    [`.${k.substring(dir.length).replace(/\/\//g, '/')}`, id.join('.')]
  ]
}))

export default {
  moduleIds: true,
  getModuleId(/** @type {string} */name) {
    const r = getModuleId(name).join('/')

    return r
  },
  plugins: [
    ['@babel/plugin-transform-modules-umd', {
      globals: globals,
      exactGlobals: true
    }],
    ['babel-plugin-add-import-extension', {
      extension: 'js'
    }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining'
  ]
}
