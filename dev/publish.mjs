import "./prebuild.mjs";
import os from "os";
import fs from "fs/promises";
import ChildProcess from "child_process";
import ncpRaw from "ncp";
import { promisify } from "util";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("../package");

console.log("argv", process.argv, '\n');

const isPack = process.argv[2] == 'pack'

const ncp = promisify(ncpRaw);
const cwd = process.cwd();
const __dirname = path.basename(cwd);
const tmpdir = os.tmpdir();
const uid = `${new Date().getTime().toString(36)}${Math.random()
  .toString(36)
  .slice(2)}`;

const publishDir = `${tmpdir}/${__dirname}_publish_${uid}`;
console.log(`\npublish dir`, publishDir, '\n');

await fs.mkdir(publishDir, { recursive: true });
try {
  await ncp(`${cwd}`, publishDir);
  console.log("\nnpm run build", '\n');
  ChildProcess.execSync(`npm run build`, {
    encoding: "utf-8",
    cwd: publishDir,
  });
  await ncp(`${publishDir}/type`, publishDir);
  if (isPack) {
    console.log("\nnpm pack", '\n');
    ChildProcess.execSync(`npm pack`, { encoding: 'utf-8', cwd: publishDir });
    await fs.mkdir(`${cwd}/pack`, { recursive: true });
    await ncp(
      `${publishDir}/${packageJson.name}-${packageJson.version}.tgz`,
      `${cwd}/pack/${packageJson.name}-${packageJson.version}.tgz`
    );
  } else {
    console.log("\nnpm publish", '\n');
    ChildProcess.execSync(`npm publish`, { encoding: 'utf-8', cwd: publishDir });
  }
} finally {
  await fs.rm(publishDir, { recursive: true });
}
