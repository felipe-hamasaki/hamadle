import { cp, mkdir } from 'node:fs/promises';

const output = new URL('../portal-dist/', import.meta.url);
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'home.js', 'favicon.svg', 'assets']) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output), { recursive: true });
}
