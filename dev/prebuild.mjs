import fs from "fs/promises";

const cwd = process.cwd();
await Promise.all([
  fs.rm(`${cwd}/dist`, { recursive: true }).catch(() => {}),
  fs.rm(`${cwd}/type`, { recursive: true }).catch(() => {}),
]);
