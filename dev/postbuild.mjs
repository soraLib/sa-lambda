import ncpRaw from "ncp";
import { promisify } from "util";
const ncp = promisify(ncpRaw);

const cwd = process.cwd();

await Promise.all([
  ncp(`${cwd}/package.json`, `${cwd}/dist/package.json`),
  ncp(`${cwd}/type`, `${cwd}/dist/cjs`),
  ncp(`${cwd}/type`, `${cwd}/dist/cjs`),
  ncp(`${cwd}/type`, `${cwd}/dist/esm`),
  ncp(`${cwd}/type`, `${cwd}/dist/umd`),
  ncp(`${cwd}/type`, `${cwd}/dist/es`),
])

