import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;

// MIME types
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".webp": "image/webp",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
  ".woff": "font/woff",
};

const DIST = join(__dirname, "dist", "static");
const INDEX = join(DIST, "index.html");

const server = createServer((req, res) => {
  const url = req.url.split("?")[0];
  const filePath = join(DIST, url);

  // Try to serve static file
  if (existsSync(filePath) && !filePath.endsWith("/")) {
    const ext = extname(filePath);
    const mime = MIME[ext] || "application/octet-stream";
    // Cache assets forever (they have hashed names)
    if (url.startsWith("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    res.setHeader("Content-Type", mime);
    res.writeHead(200);
    res.end(readFileSync(filePath));
    return;
  }

  // SPA fallback — serve index.html for all routes
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.writeHead(200);
  res.end(readFileSync(INDEX));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
