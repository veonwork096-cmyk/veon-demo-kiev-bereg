// Hero photo, art-directed: 3:2 frame from 768 px, 2.17:1 strip on phones. WebP srcset + JPEG fallback.
import { getImage } from "astro:assets";
import { heroPhotos } from "../data/photos";

export interface HeroImage { srcsetD: string; srcsetM: string; sizesD: string; sizesM: string; fallback: string; }

export async function getHeroImage(): Promise<HeroImage> {
  const fmt = { format: "webp" as const, quality: 78 };
  const wd = [345, 500, 690];
  const wm = [390, 690];
  const d = await Promise.all(wd.map((width) => getImage({ src: heroPhotos.desktop, width, ...fmt })));
  const m = await Promise.all(wm.map((width) => getImage({ src: heroPhotos.mobile, width, ...fmt })));
  const fb = await getImage({ src: heroPhotos.desktop, width: 690, format: "jpg", quality: 80 });
  return {
    srcsetD: d.map((i, k) => `${i.src} ${wd[k]}w`).join(", "),
    srcsetM: m.map((i, k) => `${i.src} ${wm[k]}w`).join(", "),
    sizesD: "(min-width: 1200px) 500px, 40vw",
    sizesM: "100vw",
    fallback: fb.src,
  };
}
