// Processed client photos (scripts/prepare-assets.mjs). Captions = alt = object name and place (concept §8.7).
import heroOsokorky from "../assets/photos/hero-osokorky.jpg";
import heroOsokorkyStrip from "../assets/photos/hero-osokorky-strip.jpg";
import vidradnyi from "../assets/photos/dir-vidradnyi.jpg";
import terrace from "../assets/photos/dir-terrace.jpg";
import pond from "../assets/photos/dir-pond.jpg";
import lagoons from "../assets/photos/dir-lagoons.jpg";
import kozyn from "../assets/photos/dir-kozyn-level.jpg";
import kozynPit from "../assets/photos/about-kozyn-pit.jpg";
import type { PhotoKey } from "./site";

export const heroPhotos = { desktop: heroOsokorky, mobile: heroOsokorkyStrip };
export const directionPhotos: Record<PhotoKey, ImageMetadata> = { vidradnyi, terrace, pond, lagoons, kozyn };
export const aboutPhoto = kozynPit;
