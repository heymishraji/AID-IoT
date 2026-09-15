import { asset } from "@/lib/asset";
/** Responsive image from public/img: expects {name}.webp plus generated -480 / -960 variants. */
export function Img({ src, alt = "", sizes = "(max-width: 768px) 100vw, 33vw", className = "", priority = false, width, height }: { src: string; alt?: string; sizes?: string; className?: string; priority?: boolean; width?: number; height?: number }) {
  const base = src.replace(/\.webp$/, "");
  return (
    <img src={asset(src)} srcSet={`${asset(base + "-480.webp")} 480w, ${asset(base + "-960.webp")} 960w, ${asset(src)} 1800w`} sizes={sizes} alt={alt} className={className}
      loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} width={width} height={height} />
  );
}
