import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
const maxWidth = 640;
const webpQuality = 82;
const jpegQuality = 82;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const outputPath =
    ext === ".png" ? filePath.replace(/\.png$/i, ".webp") : filePath;

  const image = sharp(filePath).rotate().resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    await image.webp({ quality: webpQuality }).toFile(outputPath);
    await fs.unlink(filePath);
    return { from: filePath, to: outputPath };
  }

  await image.jpeg({ quality: jpegQuality, mozjpeg: true }).toFile(`${filePath}.tmp`);
  await fs.rename(`${filePath}.tmp`, filePath);
  return { from: filePath, to: filePath };
}

const files = await walk(screenshotsDir);
let before = 0;
let after = 0;

for (const file of files) {
  const { size } = await fs.stat(file);
  before += size;
  const result = await optimizeFile(file);
  const { size: newSize } = await fs.stat(result.to);
  after += newSize;
  console.log(`${path.relative(screenshotsDir, file)} -> ${Math.round(size / 1024)}KB to ${Math.round(newSize / 1024)}KB`);
}

console.log(`Total: ${Math.round(before / 1024 / 1024)}MB -> ${Math.round(after / 1024 / 1024)}MB`);
