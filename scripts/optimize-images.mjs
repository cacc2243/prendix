import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const ASSETS_DIR = "./src/assets";
const QUALITY = 78; // WebP quality — bom balanço tamanho/qualidade
const MAX_WIDTH = 800; // posters não precisam de mais que 800px

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const info = await stat(filePath);
  const sizeBefore = info.size;
  totalBefore += sizeBefore;

  const outPath = filePath.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp");

  try {
    const image = sharp(filePath);
    const meta = await image.metadata();

    // Redimensiona só se for maior que MAX_WIDTH
    const needsResize = meta.width && meta.width > MAX_WIDTH;

    await image
      .resize(needsResize ? MAX_WIDTH : undefined)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outPath + ".tmp");

    const outInfo = await stat(outPath + ".tmp");
    const sizeAfter = outInfo.size;

    // Só substitui se realmente ficou menor
    if (sizeAfter < sizeBefore) {
      if (outPath !== filePath) {
        await unlink(filePath); // remove original
      }
      await rename(outPath + ".tmp", outPath);
      totalAfter += sizeAfter;
      converted++;
      const pct = Math.round((1 - sizeAfter / sizeBefore) * 100);
      console.log(`✓ ${basename(filePath)} → ${Math.round(sizeBefore/1024)}KB → ${Math.round(sizeAfter/1024)}KB (-${pct}%)`);
    } else {
      await unlink(outPath + ".tmp");
      totalAfter += sizeBefore;
      skipped++;
      console.log(`– ${basename(filePath)} já otimizado, mantido`);
    }
  } catch (err) {
    console.error(`✗ Erro em ${basename(filePath)}: ${err.message}`);
    totalAfter += sizeBefore;
    skipped++;
  }
}

const files = await getAllFiles(ASSETS_DIR);
console.log(`\n🔍 ${files.length} arquivos encontrados\n`);

for (const file of files) {
  await optimizeFile(file);
}

const saved = totalBefore - totalAfter;
const pctTotal = Math.round((saved / totalBefore) * 100);
console.log(`\n✅ Concluído!`);
console.log(`   Antes : ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Depois: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Economia: ${(saved / 1024 / 1024).toFixed(2)} MB (-${pctTotal}%)`);
console.log(`   Convertidos: ${converted} | Mantidos: ${skipped}`);
