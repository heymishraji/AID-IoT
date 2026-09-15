import { SignalPath } from "./signal-path";

/* Hero copy renders visible immediately (it is the LCP element); only the visual eases in, via CSS. */
export function Hero({ data }: { data: { headline: string; sub: string; cta: string; ctaNote: string; secondary: string; secondaryHref?: string } }) {
  return (
    <div className="container-x grid items-center gap-10 pt-[112px] pb-12 lg:min-h-[92vh] lg:grid-cols-12 lg:pt-[68px]">
      <div className="flex max-w-[600px] flex-col gap-6 lg:col-span-6">
        <h1 className="display text-[length:var(--t-7)] md:text-[length:var(--t-8)]">{data.headline}</h1>
        <p className="prose-lead">{data.sub}</p>
        <div className="flex flex-wrap items-center gap-3"><a href="/contact/" className="btn btn-primary">{data.cta}</a><a href={data.secondaryHref ?? "#offers"} className="btn btn-outline">{data.secondary}</a></div>
        <p className="max-w-[44ch] text-[14px] text-muted-foreground">{data.ctaNote}</p>
      </div>
      <div className="enter lg:col-span-6"><div className="h-[460px] lg:h-[calc(100vh-140px)] lg:max-h-[640px]"><SignalPath /></div></div>
    </div>
  );
}
