"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, Heading } from "./section";
import { Icon } from "./icon";
import { asset } from "@/lib/asset";
import type { Home } from "@/content/home";

type IconItem = { icon: string; title: string; line: string; when?: string };
type ImgItem = { img: string; title: string; line: string; href?: string };

/* ---------- Proof ---------- */
export function ProofBar({ names }: { names: string[] }) {
  return (
    <div className="container-x">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border py-6">
        <span className="text-[14px] text-muted-foreground">Fielded with</span>
        {names.map((n) => <span key={n} className="text-[15px] font-semibold">{n}</span>)}
      </div>
    </div>
  );
}

/* ---------- Offers: bento of the four things we do ---------- */
export function Offers({ data }: { data: Home["offers"] }) {
  return (
    <Section id="offers">
      <span className="eyebrow-dot">What we do</span>
      <Heading className="mt-3">{data.heading}</Heading>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((o, i) => (
          <Link key={o.key} href={o.href} className={`tile tile-hover group relative flex flex-col overflow-hidden ${i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}>
            <div className={`photo-tile !rounded-none ${i === 0 ? "aspect-[16/9] lg:aspect-auto lg:h-[300px]" : "aspect-[16/9]"}`}><img src={asset(o.img)} alt="" className="absolute inset-0 h-full w-full" /></div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center gap-3"><span className="icon-tile"><Icon name={o.icon} size={20} /></span><h3 className="display text-[length:var(--t-3)]">{o.title}</h3></div>
              <p className="text-[15px] text-muted-foreground">{o.line}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">{o.links.map((l) => <li key={l} className="chip !h-7 !text-[12.5px]">{l}</li>)}</ul>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Generic: icon feature grid ---------- */
export function IconGrid({ id, eyebrow, heading, items, cols = 4, tone = "default", numbered = false }: { id?: string; eyebrow?: string; heading: string; items: IconItem[]; cols?: 2 | 3 | 4; tone?: "default" | "card"; numbered?: boolean }) {
  const colCls = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  const Tag = numbered ? "ol" : "ul";
  return (
    <Section id={id} tone={tone}>
      {eyebrow && <span className="eyebrow-dot">{eyebrow}</span>}
      <Heading className="mt-3">{heading}</Heading>
      <Tag className={`mt-10 grid gap-4 ${colCls}`}>
        {items.map((it, i) => (
          <li key={it.title} className="tile flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between"><span className="icon-tile"><Icon name={it.icon} size={20} /></span>{numbered && <span className="display text-[length:var(--t-3)] text-muted-foreground">{i + 1}</span>}</div>
            <div><h3 className="display text-[21px]">{it.title}</h3><p className="mt-1 text-[15px] text-muted-foreground">{it.line}</p></div>
            {it.when && <span className="mt-auto text-[13px] font-semibold">{it.when}</span>}
          </li>
        ))}
      </Tag>
    </Section>
  );
}

/* ---------- Generic: photo cards (products, modules, work) ---------- */
export function PhotoGrid({ id, eyebrow, heading, items, tone = "card" }: { id?: string; eyebrow?: string; heading: string; items: ImgItem[]; tone?: "default" | "card" }) {
  return (
    <Section id={id} tone={tone}>
      {eyebrow && <span className="eyebrow-dot">{eyebrow}</span>}
      <Heading className="mt-3">{heading}</Heading>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Link key={it.title} href={it.href ?? "#"} className="tile tile-hover overflow-hidden">
            <div className="photo-tile aspect-[4/3] !rounded-none"><img src={asset(it.img)} alt="" className="absolute inset-0 h-full w-full" /></div>
            <div className="p-4"><h3 className="display text-[19px]">{it.title}</h3><p className="mt-1 text-[14px] text-muted-foreground">{it.line}</p></div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Scenes ---------- */
export function Scenes({ data }: { data: Home["scenes"] }) {
  return (
    <Section id="scenes" tone="card">
      <div className="grid items-end gap-6 lg:grid-cols-12"><div className="lg:col-span-7"><span className="eyebrow-dot">The problem</span><Heading className="mt-3">{data.heading}</Heading></div><p className="text-[length:var(--t-2)] text-muted-foreground lg:col-span-5">{data.close}</p></div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {data.items.map((s) => (
          <figure key={s.title} className="photo-tile aspect-[4/3]">
            <img src={asset(s.img)} alt={s.alt} className="absolute inset-0 h-full w-full" />
            <figcaption className="cap flex items-start gap-3"><span className="icon-tile onpanel"><Icon name={s.icon} size={20} /></span><span><span className="display block text-[length:var(--t-3)]">{s.title}</span><span className="block text-[14px] opacity-90">{s.line}</span></span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Outcomes ---------- */
export function Outcomes({ data }: { data: Home["outcomes"] }) {
  return (
    <Section id="solutions">
      <span className="eyebrow-dot">What changes</span>
      <Heading className="mt-3">{data.heading}</Heading>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {data.items.map((o) => (
          <div key={o.title} className="tile flex gap-4 p-5">
            <span className="icon-tile lg"><Icon name={o.icon} size={24} /></span>
            <div className="flex flex-1 flex-col gap-3">
              <div><h3 className="display text-[length:var(--t-3)]">{o.title}</h3><p className="mt-1 text-[15px] text-muted-foreground">{o.line}</p></div>
              <ul className="flex flex-wrap gap-2">{o.products.map(([n, img]) => <li key={n} className="chip !h-9 !pl-1"><img src={asset(img)} alt="" className="h-7 w-7 rounded-md object-cover" />{n}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Mechanism ---------- */
export function Mechanism({ data }: { data: Home["mechanism"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <Section id="services" tone="card">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><span className="eyebrow-dot">Why us</span><Heading className="mt-3">{data.heading}</Heading><p className="mt-5 text-[length:var(--t-2)] text-muted-foreground">{data.line}</p></div>
        <div ref={ref} className="grid gap-4 lg:col-span-8 md:grid-cols-2">
          <div className="tile p-5">
            <p className="text-[14px] font-semibold text-muted-foreground">Typical project</p>
            <div className="mt-4 flex flex-col gap-3">
              {data.typical.map((v, i) => <div key={v} className="flex items-center gap-3"><span className="flex h-11 flex-1 items-center rounded-lg border border-dashed border-input px-4 text-[15px] text-muted-foreground">{v}</span>{i < 3 && <span className="text-[13px] text-[var(--warn)]">hand-off</span>}</div>)}
              <p className="mt-2 text-[14px] text-muted-foreground">When readings stop, each vendor points at the other three.</p>
            </div>
          </div>
          <div className="panel p-5">
            <p className="text-[14px] font-semibold text-[var(--panel-muted)]">AID-IoT</p>
            <ol className="mt-4 flex flex-col gap-2">
              {data.layers.map((l, i) => (
                <motion.li key={l.name} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }} className="flex h-11 items-center gap-3 rounded-lg bg-[color-mix(in_srgb,var(--panel-foreground)_9%,transparent)] px-3">
                  <Icon name={l.icon} size={18} /><span className="display text-[17px]">{l.name}</span><span className="ml-auto text-[13px] text-[var(--panel-muted)]">{l.who}</span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-4 text-[14px]" style={{ color: "#7BD0A3" }}>One team. One number to call. Built in India.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Sectors ---------- */
export function Sectors({ data }: { data: Home["sectors"] }) {
  return (
    <Section id="sectors-list">
      <span className="eyebrow-dot">Solutions by sector</span>
      <Heading className="mt-3">{data.heading}</Heading>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((s, i) => (
          <Link key={s.title} href={i === 1 ? "/solutions/fleet-and-fuel" : "#"} className="photo-tile aspect-[5/4]">
            <img src={asset(s.img)} alt="" className="absolute inset-0 h-full w-full" />
            <div className="cap flex items-center gap-3"><span className="icon-tile onpanel"><Icon name={s.icon} size={20} /></span><span><span className="display block text-[length:var(--t-3)]">{s.title}</span><span className="block text-[14px] opacity-90">{s.line}</span></span></div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Results ---------- */
export function Results({ heading, items, eyebrow = "Proof" }: { heading: string; items: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; tag: string }[]; eyebrow?: string }) {
  return (
    <Section id="company">
      <span className="eyebrow-dot">{eyebrow}</span>
      <Heading className="mt-3">{heading}</Heading>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((r) => (
          <div key={r.label} className="tile p-6">
            <div className="display text-[length:var(--t-7)] tabular text-[var(--accent)]">{r.prefix}<NumberTicker value={r.value} decimalPlaces={r.decimals ?? 0} className="display text-[length:var(--t-7)] tabular text-[var(--accent)]" />{r.suffix}</div>
            <p className="mt-2 text-[17px] font-semibold">{r.label}</p><p className="mt-2 text-[13px] text-muted-foreground">{r.tag}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Platform ---------- */
export function Platform({ data }: { data: Home["platform"] }) {
  const [t, setT] = useState({ temp: 842, hz: 47.2, kg: 1206, litres: 18420 });
  useEffect(() => { const id = setInterval(() => setT({ temp: 842 + Math.round((Math.random() - 0.5) * 6), hz: +(47.2 + (Math.random() - 0.5) * 0.6).toFixed(1), kg: 1206 + Math.round((Math.random() - 0.5) * 8), litres: 18420 + Math.round((Math.random() - 0.5) * 60) }), 1500); return () => clearInterval(id); }, []);
  return (
    <Section id="software" tone="panel">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="icon-tile lg onpanel"><Icon name="Layers" size={24} /></span>
          <Heading className="mt-5 text-[var(--panel-foreground)]">{data.heading}</Heading>
          <p className="mt-5 text-[length:var(--t-2)] text-[var(--panel-muted)]">{data.line}</p>
          <ul className="mt-6 flex flex-col gap-2">{data.modules.map(([n, d]) => <li key={n} className="flex items-center gap-3 rounded-lg bg-[color-mix(in_srgb,var(--panel-foreground)_9%,transparent)] px-4 py-3"><Icon name="Check" size={16} /><span className="font-semibold">{n}</span><span className="ml-auto text-[13px] text-[var(--panel-muted)]">{d}</span></li>)}</ul>
          <Link href="/software/signal" className="btn btn-onpanel mt-8">See Signal</Link>
        </div>
        <div className="relative rounded-2xl bg-card p-5 text-foreground lg:col-span-7" aria-label="Signal dashboard, illustrative">
          <BorderBeam size={220} duration={9} colorFrom="#F04E1A" colorTo="#F04E1A" />
          <div className="flex items-center justify-between text-[13px]"><span className="font-semibold">Signal · Plant 2 · Line B</span><span className="live">8 devices online</span></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[["Furnace 1", `${t.temp} °C`, "set 850"], ["VFD 3", `${t.hz} Hz`, "nominal"], ["Scale A", `${t.kg.toLocaleString("en-IN")} kg`, "over 1,200 · slowed"]].map(([a, b, c], i) => (
              <div key={a} className="rounded-xl bg-secondary p-4"><div className="text-[12px] text-muted-foreground">{a}</div><div className="display mt-1 text-[length:var(--t-4)] tabular">{b}</div><div className={`mt-1 text-[12px] ${i === 2 ? "font-semibold text-[var(--accent-ink)]" : "text-muted-foreground"}`}>{c}</div></div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary p-4">
            <div><div className="text-[12px] text-muted-foreground">Depot 4 · dispensed today</div><div className="display mt-1 text-[length:var(--t-5)] tabular">{t.litres.toLocaleString("en-IN")} L</div></div>
            <div className="rounded-lg px-3 py-2 text-[13px] font-semibold" style={{ background: "#FFE6DC", color: "var(--accent-ink)" }}>HR 55 AB 1274 · −38 L flagged</div>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">Illustrative values. Real Signal screens replace this panel.</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Spec strip + table (product) ---------- */
export function SpecStrip({ items }: { items: string[][] }) {
  return <div className="container-x"><div className="grid gap-4 rounded-2xl bg-[var(--panel)] p-5 text-[var(--panel-foreground)] sm:grid-cols-2 lg:grid-cols-4">{items.map(([l, v]) => <div key={l}><div className="text-[12px] text-[var(--panel-muted)]">{l}</div><div className="mt-1 text-[15px] font-semibold">{v}</div></div>)}</div></div>;
}
export function SpecTable({ groups }: { groups: (string | string[][])[][] }) {
  return (
    <Section id="specs" tone="card">
      <div className="flex flex-wrap items-end justify-between gap-6"><div><span className="eyebrow-dot">Specifications</span><Heading className="mt-3">Engineered for the panel room.</Heading></div><a href="#" className="btn btn-outline">Download datasheet (PDF)</a></div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {groups.map(([g, rows]) => <div key={g as string} className="tile p-5"><h3 className="display text-[19px]">{g as string}</h3><dl className="mt-3 divide-y divide-border">{(rows as string[][]).map(([k, v]) => <div key={k} className="flex justify-between gap-3 py-2.5 text-[14px]"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}</dl></div>)}
      </div>
    </Section>
  );
}

/* ---------- Chips list (use cases) ---------- */
export function ChipList({ heading, items }: { heading: string; items: string[] }) {
  return <Section><span className="eyebrow-dot">In the field</span><Heading className="mt-3">{heading}</Heading><ul className="mt-8 flex flex-wrap gap-2">{items.map((u) => <li key={u} className="chip !h-10 !px-4 !text-[15px]">{u}</li>)}</ul></Section>;
}

/* ---------- FAQ ---------- */
export function Faq({ items, heading = "Frequently asked questions" }: { items: { q: string; a: string }[]; heading?: string }) {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5"><Heading>{heading}</Heading></div>
        <Accordion className="lg:col-span-7">{items.map((f) => <AccordionItem key={f.q} value={f.q} className="border-border"><AccordionTrigger className="py-5 text-left text-[18px] font-semibold hover:no-underline">{f.q}</AccordionTrigger><AccordionContent className="text-[16px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion>
      </div>
    </Section>
  );
}

/* ---------- CTA ---------- */
export function Cta({ data }: { data: { heading: string; body: string; note: string } }) {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact">
      <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-[var(--accent)] p-8 text-white md:p-12 lg:grid-cols-2">
        <div><Heading>{data.heading}</Heading><p className="mt-5 max-w-[44ch] text-[length:var(--t-2)] opacity-95">{data.body}</p></div>
        <form className="tile flex flex-col gap-4 p-6 text-foreground" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">Work email<input required type="email" className="h-12 rounded-lg border border-input bg-card px-3 text-[16px] font-normal" placeholder="you@company.com" /></label>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">What are you trying to solve?<textarea required rows={3} className="rounded-lg border border-input bg-card p-3 text-[16px] font-normal" placeholder="e.g. We run 40 trucks and lose track of fuel" /></label>
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[14px] text-muted-foreground">{sent ? "Sent. An engineer will reply within one business day." : data.note}</span><button className="btn btn-primary" type="submit">Send</button></div>
        </form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
export function Footer({ cols }: { cols: Record<string, string[]> }) {
  const hrefs: Record<string, string> = { "Fleet & fuel": "/solutions/fleet-and-fuel", "Gateways & edge": "/products/iiot-bridge", "Signal platform": "/software/signal", "Product development": "/services", About: "/company", Contact: "/contact" };
  return (
    <footer className="border-t border-border py-12 text-[14px]">
      <div className="container-x grid gap-8 md:grid-cols-6">
        <div><div className="flex items-center gap-2 text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}><img src={asset("/brand/aid-iot-mark.svg")} alt="" width={26} height={23} />AID-IoT</div><p className="mt-3 max-w-[26ch] text-muted-foreground">Devices, software and cloud for connected operations. Designed and built in India.</p></div>
        {Object.entries(cols).map(([k, items]) => <div key={k}><div className="mb-2 font-semibold">{k}</div>{items.map((i) => <Link key={i} href={hrefs[i] ?? "#"} className="block py-1 text-muted-foreground hover:text-foreground">{i}</Link>)}</div>)}
      </div>
      <div className="container-x mt-10 text-[13px] text-muted-foreground">© 2026 AID-IoT · Delhi · Acton ON</div>
    </footer>
  );
}
