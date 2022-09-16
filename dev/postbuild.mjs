import fs from 'fs'
import glob from 'glob'
import ncpRaw from "ncp"
import path from 'path'
import { promisify } from "util"
const ncp = promisify(ncpRaw)

const cwd = process.cwd()
const OUTPUT_FOLDER = 'dist'
const OUTPUT_PATH = path.join(cwd, OUTPUT_FOLDER)
const PKG = 'package.json'

const copyPackageJson = () => {
  const pkg = fs.readFileSync(PKG)
  const json = JSON.parse(pkg)
  const clone = Object.assign({}, json)
  delete clone.scripts
  delete clone.files
  delete clone.devDependencies

  fs.writeFileSync(path.join(OUTPUT_PATH, PKG), JSON.stringify(clone, null, 2))
}

const FILES = ['CHANGELOG.md', 'LICENSE', 'README.md']
const copyFiles = () => {
  for (const file of FILES) {
    fs.copyFileSync(file, path.join(OUTPUT_PATH, file))
  }
}

const makeModules = async () => {
  const matches = glob.sync('dist/cjs/*.js')
  const modules = getModules(matches)

  for(const module of modules) {
    makeSingleModule(module)
  }
}

const getModules = paths => 
   paths.map(filePath => path.basename(filePath, '.js')).filter(x => x !== 'index')

const makePkgJson = module => ({
    main: `../cjs/${module}.js`,
    module: `../esm/${module}.js`,
    types: `../type/${module}.d.ts`,
    sideEffects: false
  })

const makeSingleModule = module => {
  fs.mkdirSync(path.join(OUTPUT_PATH, module))
  fs.writeFileSync(path.join(OUTPUT_PATH, module, PKG), JSON.stringify(makePkgJson(module), null, 2))
}

await Promise.all([
  ncp(path.join(cwd, 'type'), path.join(OUTPUT_PATH, 'type')),
  ncp(path.join(cwd, 'type'), path.join(OUTPUT_PATH, 'cjs')),
  ncp(path.join(cwd, 'type'), path.join(OUTPUT_PATH, 'esm')),
  ncp(path.join(cwd, 'type'), path.join(OUTPUT_PATH, 'umd')),
  ncp(path.join(cwd, 'type'), path.join(OUTPUT_PATH, 'es')),
  copyPackageJson(),
  copyFiles(),
  makeModules(),
])

