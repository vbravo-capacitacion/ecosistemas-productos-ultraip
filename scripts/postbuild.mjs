import fs from "node:fs";
import path from "node:path";

// Ensure compatibility regardless of whether Netlify is configured to publish
// 'dist', 'dist/client', or '.output/public'.
const root = process.cwd();
const distDir = path.join(root, "dist");
const outputPublicDir = path.join(root, ".output", "public");

if (fs.existsSync(distDir)) {
  // 1. Mirror dist -> .output/public
  if (!fs.existsSync(outputPublicDir)) {
    fs.mkdirSync(outputPublicDir, { recursive: true });
    fs.cpSync(distDir, outputPublicDir, { recursive: true });
  }

  // 2. Mirror dist -> dist/client (in case Netlify UI has 'dist/client' hardcoded)
  const clientDir = path.join(distDir, "client");
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
    for (const item of fs.readdirSync(distDir)) {
      if (item !== "client") {
        fs.cpSync(path.join(distDir, item), path.join(clientDir, item), { recursive: true });
      }
    }
  }
} else if (fs.existsSync(outputPublicDir)) {
  // If build produced .output/public, mirror to dist and dist/client
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(outputPublicDir, distDir, { recursive: true });

  const clientDir = path.join(distDir, "client");
  fs.mkdirSync(clientDir, { recursive: true });
  fs.cpSync(outputPublicDir, clientDir, { recursive: true });
}
