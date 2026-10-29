import { cp, mkdir } from 'node:fs/promises';

const output = new URL('../portal-dist/', import.meta.url);
await mkdir(output, { recursive: true });
for (const file of [
  'index.html',
  'style.css',
  'home.js',
  'favicon.svg',
  'assets',
]) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output), {
    recursive: true,
  });
}

// Export only the HxH game; Berserk remains on its existing upstream.
await cp(
  new URL('../out/hxh.html', import.meta.url),
  new URL('hxh.html', output),
);
await mkdir(new URL('hxh/', output), { recursive: true });
await cp(
  new URL('../out/_next/', import.meta.url),
  new URL('hxh/_next/', output),
  { recursive: true },
);
await cp(
  new URL('../public/hxh/images/', import.meta.url),
  new URL('hxh/images/', output),
  { recursive: true },
);
await cp(
  new URL('../public/hxh/fonts/', import.meta.url),
  new URL('hxh/fonts/', output),
  { recursive: true },
);
