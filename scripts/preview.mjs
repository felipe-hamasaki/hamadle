import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep, extname } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};
const publicFiles = new Set([
  "/index.html",
  "/style.css",
  "/home.js",
  "/favicon.svg",
]);
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    if (url.pathname === "/berserk" || url.pathname.startsWith("/berserk/")) {
      const upstream = await fetch(
        `https://berserk-dle-tau.vercel.app${url.pathname}${url.search}`,
      );
      response.writeHead(upstream.status, {
        "content-type":
          upstream.headers.get("content-type") || "application/octet-stream",
      });
      response.end(Buffer.from(await upstream.arrayBuffer()));
      return;
    }
    if (
      url.pathname === "/hxh" ||
      url.pathname === "/hxh/" ||
      url.pathname.startsWith("/hxh/")
    ) {
      const pathname = decodeURIComponent(
        url.pathname === "/hxh" || url.pathname === "/hxh/"
          ? "/hxh.html"
          : url.pathname,
      );
      const output = resolve(root, "portal-dist");
      const file = resolve(output, "." + pathname);
      if (!file.startsWith(output + sep)) {
        response.writeHead(404).end("Not found");
        return;
      }
      const content = await readFile(file);
      response.writeHead(200, {
        "content-type": types[extname(file)] || "application/octet-stream",
      });
      response.end(content);
      return;
    }
    const pathname = decodeURIComponent(
      url.pathname === "/" ? "/index.html" : url.pathname,
    );
    const path = resolve(root, `.${pathname}`);
    if (
      !path.startsWith(root.endsWith(sep) ? root : root + sep) ||
      (!publicFiles.has(pathname) && !pathname.startsWith("/assets/"))
    ) {
      response.writeHead(404).end("Not found");
      return;
    }
    const content = await readFile(path);
    response.writeHead(200, {
      "content-type": types[extname(path)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("Hamadle: http://127.0.0.1:4173"),
);
