import Link from "next/link";
import { Img } from "./img";
export function PageHero({ data, crumb }: { data: { headline: string; sub: string; cta: string; ctaNote: string; secondary: string; secondaryHref?: string; img: string }; crumb: string[] }) {
  return (
    <div className="container-x grid items-center gap-10 pt-[112px] pb-8 lg:grid-cols-12 lg:pt-[120px]">
      <div className="flex max-w-[600px] flex-col gap-6 lg:col-span-6">
        <nav aria-label="Breadcrumb" className="text-[13px] text-muted-foreground">{crumb.map((c, i) => <span key={c}>{i > 0 && <span className="mx-2">/</span>}{i === 0 ? <Link href="/" className="hover:text-foreground">{c}</Link> : c}</span>)}</nav>
        <h1 className="display text-[length:var(--t-6)] md:text-[length:var(--t-7)]">{data.headline}</h1>
        <p className="prose-lead">{data.sub}</p>
        <div className="flex flex-wrap items-center gap-3"><Link href="/contact" className="btn btn-primary">{data.cta}</Link><a href={data.secondaryHref ?? "#"} className="btn btn-outline">{data.secondary}</a></div><p className="mt-4 text-[14px] text-muted-foreground">{data.ctaNote}</p>
      </div>
      <div className="enter lg:col-span-6"><div className="photo-tile aspect-[4/3] lg:aspect-[5/4]"><Img src={data.img} priority sizes="(max-width:1024px) 100vw, 50vw" className="absolute inset-0 h-full w-full" width={960} height={768} /></div></div>
    </div>
  );
}
