// Build-time checks of files in public/ (server components only).
import fs from "node:fs";
import path from "node:path";

// Set in next.config.ts, so the check works whatever folder `next` is started from.
const PUBLIC_DIR = process.env.PUBLIC_DIR ?? path.join(process.cwd(), "public");

export const hasPublicFile = (src: string) => fs.existsSync(path.join(PUBLIC_DIR, decodeURIComponent(src)));

// Product pictures the archive did not keep. A known stand-in is used when there is one, otherwise a
// placeholder; put the real file at the original path and it takes over on the next build.
const STAND_INS: Record<string, string> = {
  "/wp-content/uploads/2022/07/kuraga.png": "/wp-content/uploads/2025/04/vizualperedkashi-kuraga-1.webp",
};
export const PRODUCT_PLACEHOLDER = "/wp-content/themes/velle/images/logo_header.svg";

export function productImage(src: string | null): string {
  if (src && hasPublicFile(src)) return src;
  const standIn = src ? STAND_INS[src] : undefined;
  return standIn && hasPublicFile(standIn) ? standIn : PRODUCT_PLACEHOLDER;
}
