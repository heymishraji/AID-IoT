/** Prefix static asset paths with the deploy base path (GitHub Pages serves under /aid-iot-website). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE}${p}`;
