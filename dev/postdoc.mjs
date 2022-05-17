import fs from 'fs/promises'

const cwd = process.cwd()
await fs.writeFile(`${cwd}/docs/.nojekyll`, '.nojekyll')
