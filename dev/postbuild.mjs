import ncpRaw from "ncp";
import { promisify } from "util";
const ncp = promisify(ncpRaw);

const cwd = process.cwd();
await Promise.all([
  ncp(`${cwd}/type`, `${cwd}/cjs`),
  ncp(`${cwd}/type`, `${cwd}/esm`),
  ncp(`${cwd}/type`, `${cwd}/umd`),
  ncp(`${cwd}/type`, `${cwd}/es`),
])

