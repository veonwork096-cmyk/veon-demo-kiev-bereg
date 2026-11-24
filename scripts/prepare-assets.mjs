// One-off asset preparation for the demo homepage (run: node scripts/prepare-assets.mjs).
// Photos: crop per design/concept.md §8.7 (no client watermark in frame) -> auto-levels -> light unsharp -> high-quality JPEG master.
// astro:assets then emits WebP in two widths with srcset. Logo: optimized copy of content/brand/logo.svg.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const src = path.join(root, "content", "photos");
const out = path.resolve(here, "..", "src", "assets", "photos");
await mkdir(out, { recursive: true });

const P = (name) => path.join(src, `${name}_690x460.jpg`);
const jobs = [
  // hero, desktop 3:2 — whole frame: sheet-pile wall runs to the bottom edge
  { file: P("beregoukreplenie-pvx-shpuntom-na-osokorkax-v-kieve_b1e9"), name: "hero-osokorky", crop: null },
  // hero, 390 strip ~2.17:1 — lower part: wall + water line
  { file: P("beregoukreplenie-pvx-shpuntom-na-osokorkax-v-kieve_b1e9"), name: "hero-osokorky-strip", crop: { left: 0, top: 142, width: 690, height: 318 } },
  // directions · banks: crane laying slabs, Vidradnyi park (no watermark)
  { file: P("blagoustrojstvo-ozera-v-parke-otradnyj-g-kiev_aedf"), name: "dir-vidradnyi", crop: null },
  // directions · piers/terraces: right part of 3ac6 — steel frame under the deck, right of the centre watermark, between corner captions
  { file: P("stroitelstvo-naberezhnoj-terrasy-baza-otdyxa-kievskaya-oblast_3ac6"), name: "dir-terrace", crop: { left: 430, top: 132, width: 260, height: 294 } },
  // directions · ponds: bottom strip of 4190 — water, stones, deck edge; below the watermark, above the corner captions
  { file: P("blagoustrojstvo-uchastka-s-iskusstvennym-vodoemom_4190"), name: "dir-pond", crop: { left: 0, top: 300, width: 690, height: 128 } },
  // directions · industrial: aerial view of two lagoons
  { file: P("stroitelstvo-lagun-dlya-navoza_b9ea"), name: "dir-lagoons", crop: null },
  // directions · design & equipment: level on site, Kozyn
  { file: P("stroitelstvo-ograzhdeniya-dlya-kotlovana-pod-zalivku-bassejna-v-kottedzhnom-poselke-koncha-zaspa-_acd9"), name: "dir-kozyn-level", crop: null },
  // about: sheet piling of the pit, Kozyn (strip)
  { file: P("stroitelstvo-ograzhdeniya-dlya-kotlovana-pod-zalivku-bassejna-v-kottedzhnom-poselke-koncha-zaspa-_9dbf"), name: "about-kozyn-pit", crop: { left: 0, top: 96, width: 690, height: 300 } },
];

for (const j of jobs) {
  let img = sharp(j.file);
  if (j.crop) img = img.extract(j.crop);
  const info = await img
    .normalise({ lower: 0.5, upper: 99.5 })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(out, `${j.name}.jpg`));
  console.log(j.name, `${info.width}x${info.height}`);
}

// Logo: drop the hidden raster layer (display:none), comments, metadata; round coordinates; tighten viewBox.
const brandOut = path.resolve(here, "..", "src", "assets", "brand");
await mkdir(brandOut, { recursive: true });
let svg = await readFile(path.join(root, "content", "brand", "logo.svg"), "utf8");
svg = svg
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<g id="[^"]*" class="st0">[\s\S]*?<\/g>/, "")
  .replace(/(\d+\.\d)\d+/g, "$1")
  .replace(/\s*\n\s*/g, " ")
  .replace(/>\s+</g, "><")
  .replace(/ id="Слой_\d+"/g, "")
  .replace(/ (x|y)="0px"/g, "")
  .replace(/ xml:space="preserve"/, "")
  .replace(/ style="enable-background:[^"]*"/, "")
  .replace(/viewBox="[^"]*"/, 'viewBox="20 8 1245 870"')
  .replace(/<svg /, '<svg aria-hidden="true" focusable="false" ')
  .trim();
await writeFile(path.join(brandOut, "logo.svg"), svg);
console.log("logo.svg", svg.length, "bytes");
