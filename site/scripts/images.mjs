// Generates responsive variants (480, 960) beside each source webp in public/img. Run: npm run images
import sharp from "sharp"; import { readdirSync, existsSync, statSync } from "node:fs"; import { join } from "node:path"; import { fileURLToPath } from "node:url";
const dir = fileURLToPath(new URL("../public/img/", import.meta.url));
for (const f of readdirSync(dir).filter((f) => f.endsWith(".webp") && !/-(480|960)\.webp$/.test(f))) {
  for (const w of [480, 960]) {
    const out = join(dir, f.replace(/\.webp$/, `-${w}.webp`));
    if (existsSync(out) && statSync(out).mtimeMs > statSync(join(dir, f)).mtimeMs) continue;
    await sharp(join(dir, f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(out);
  }
}
console.log("images ok");
