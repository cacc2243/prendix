import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = join(__dirname, "dist", "railway");
const INDEX = join(DIST, "index.html");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
};

createServer((req, res) => {
  const url = req.url.split("?")[0];
  const filePath = join(DIST, url === "/" ? "index.html" : url);

  try {
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = extname(filePath);
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      if (url.startsWith("/assets/")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      res.writeHead(200);
      res.end(readFileSync(filePath));
    } else {
      // SPA fallback
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.writeHead(200);
      res.end(readFileSync(INDEX));
    }
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
}).listen(PORT, () => console.log(`Prendix running on :${PORT}`));
