// Runs after `next build`. Next 16's static export writes prefetch segments for dynamic routes as
// nested folders (out/cars/a10/__next.cars/$d$slug/__PAGE__.txt), but the browser asks for a flat,
// dot-joined name (out/cars/a10/__next.cars.$d$slug.__PAGE__.txt). Copy each nested file to the flat
// name so prefetching works on any static host instead of logging 404s.
import { copyFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "out");
let copied = 0;

async function files(dir) {
  const list = [];
  for (const name of await readdir(dir)) {
    const p = path.join(dir, name);
    if ((await stat(p)).isDirectory()) list.push(...(await files(p)));
    else list.push(p);
  }
  return list;
}

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const p = path.join(dir, name);
    if (!(await stat(p)).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of await files(p)) {
        const flat = path.relative(dir, f).split(path.sep).join(".");
        await copyFile(f, path.join(dir, flat));
        copied++;
      }
    } else {
      await walk(p);
    }
  }
}

await walk(out);
console.log(`fix-export: ${copied} prefetch segment file(s) flattened`);
