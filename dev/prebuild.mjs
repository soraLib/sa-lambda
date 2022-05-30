import fs from "fs/promises";

const cwd = process.cwd();
await Promise.all([
  fs.rm(`${cwd}/cjs`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/dist`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/dist`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/es`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/esm`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/type`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/umd`, { recursive: true }).catch(() => { }),
  fs.rm(`${cwd}/sa-lambda.js`).catch(() => { }),
  fs.rm(`${cwd}/sa-lambda.mjs`).catch(() => { }),
]);
