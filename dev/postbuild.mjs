import fs from 'fs'
import ncpRaw from "ncp"
import { promisify } from "util"
const ncp = promisify(ncpRaw)

const cwd = process.cwd()
const OUTPUT_FOLDER = 'dist'
const OUTPUT_PATH = `${cwd}/${OUTPUT_FOLDER}`
const PKG = 'package.json'

const copyPackageJson = async () => {
  const pkg = fs.readFileSync(PKG)
  const json = JSON.parse(pkg)
  const clone = Object.assign({}, json)
  delete clone.scripts
  delete clone.files
  delete clone.devDependencies

  fs.writeFileSync(`${OUTPUT_PATH}/${PKG}`, JSON.stringify(clone, null, 2))
}

await Promise.all([
  ncp(`${cwd}/type`, `${OUTPUT_PATH}/cjs`),
  ncp(`${cwd}/type`, `${OUTPUT_PATH}/cjs`),
  ncp(`${cwd}/type`, `${OUTPUT_PATH}/esm`),
  ncp(`${cwd}/type`, `${OUTPUT_PATH}/umd`),
  ncp(`${cwd}/type`, `${OUTPUT_PATH}/es`),
  copyPackageJson()
])

