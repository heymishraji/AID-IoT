"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, Heading } from "./section";
import { Icon } from "./icon";
import type { Home } from "@/content/home";

const tone = (t: string) => `tone-${t}`;

/* ---------- Proof ---------- */
export function ProofBar({ names }: { names: string[] }) {
  return (
    <div className="container-x">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border py-6">
        <span className="text-[15px] text-muted-foreground">Fielded with</span>
        {names.map((n) => <span key={n} className="rounded-md bg-card px-3 py-1.5 text-[15px] font-semibold ring-1 ring-border">{n}</span>)}
      </div>
    </div>
  );
}

/* ---------- Offers: the four things we do, scannable ---------- */
export function Offers({ data }: { data: Home["offers"] }) {
  return (
    <Section id="offers">
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.items.map((o) => (
          <a key={o.key} href={`#${o.key}`} className={`tile tile-tone ${tone(o.tone)} flex flex-col gap-4 p-6 transition-transform duration-200 hover:-translate-y-1`}>
            <span className="icon-tile lg"><Icon name={o.icon} size={28} /></span>
            <div><h3 className="display text-[length:var(--t-4)]">{o.title}</h3><p className="mt-1 text-[16px] text-muted-foreground">{o.line}</p></div>
            <ul className="mt-auto flex flex-wrap gap-2">{o.links.map((l) => <li key={l} className="chip">{l}</li>)}</ul>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Scenes: three ways you find out today ---------- */
export function Scenes({ data }: { data: Home["scenes"] }) {
  return (
    <Section id="scenes" tone="card">
      <div className="grid items-end gap-6 lg:grid-cols-12"><Heading className="lg:col-span-7">{data.heading}</Heading><p className="text-[length:var(--t-2)] text-muted-foreground lg:col-span-5">{data.close}</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {data.items.map((s) => (
          <figure key={s.title} className={`${tone(s.tone)} relative aspect-[4/3] overflow-hidden rounded-2xl`}>
            <Image src={s.img} alt={s.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,23,38,.85)] via-[rgba(14,23,38,.25)] to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-start gap-3 p-5 text-white">
              <span className="icon-tile" style={{ background: "var(--tone)", color: "#fff" }}><Icon name={s.icon} size={22} /></span>
              <span><span className="display block text-[length:var(--t-3)]">{s.title}</span><span className="block text-[15px] opacity-90">{s.line}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Outcomes: icon + one line + the products that do it ---------- */
export function Outcomes({ data }: { data: Home["outcomes"] }) {
  return (
    <Section id="solutions">
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {data.items.map((o) => (
          <div key={o.title} className={`tile ${tone(o.tone)} flex gap-5 p-6`}>
            <span className="icon-tile lg"><Icon name={o.icon} size={28} /></span>
            <div className="flex flex-1 flex-col gap-3">
              <div><h3 className="display text-[length:var(--t-3)]">{o.title}</h3><p className="mt-1 text-[16px] text-muted-foreground">{o.line}</p></div>
              <ul className="flex flex-wrap gap-2">
                {o.products.map(([n, img]) => <li key={n} className="chip !h-9 !pl-1"><Image src={img} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-cover" />{n}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Mechanism: 4 vendors vs 1 team, drawn ---------- */
export function Mechanism({ data }: { data: Home["mechanism"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <Section id="services" tone="card">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><Heading>{data.heading}</Heading><p className="mt-5 text-[length:var(--t-2)] text-muted-foreground">{data.line}</p></div>
        <div ref={ref} className="grid gap-4 lg:col-span-8 md:grid-cols-2">
          <div className="tile p-6">
            <p className="text-[14px] font-semibold text-muted-foreground">Typical project</p>
            <div className="mt-4 flex flex-col gap-3">
              {data.typical.map((v, i) => (
                <div key={v} className="flex items-center gap-3">
                  <span className="flex h-11 flex-1 items-center rounded-lg border border-dashed border-border px-4 text-[15px] text-muted-foreground">{v}</span>
                  {i < 3 && <span className="text-[13px] text-[var(--warn)]">hand-off</span>}
                </div>
              ))}
              <p className="mt-2 text-[14px] text-[var(--warn)]">When readings stop, each vendor points at the other three.</p>
            </div>
          </div>
          <div className="panel p-6">
            <p className="text-[14px] font-semibold text-[var(--panel-muted)]">AID-IoT</p>
            <ol className="mt-4 flex flex-col gap-2">
              {data.layers.map((l, i) => (
                <motion.li key={l.name} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  className="flex h-11 items-center gap-3 rounded-lg bg-[color-mix(in_srgb,var(--panel-foreground)_9%,transparent)] px-3">
                  <Icon name={l.icon} size={20} className="text-[var(--c-amber)]" />
                  <span className="display text-[17px]">{l.name}</span>
                  <span className="ml-auto text-[13px] text-[var(--panel-muted)]">{l.who}</span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-4 text-[14px] text-[#7BD0A3]">One team. One number to call. Built in India.</p>
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
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((s) => (
          <a key={s.title} href="#" className={`${tone(s.tone)} group relative aspect-[5/4] overflow-hidden rounded-2xl`}>
            <Image src={s.img} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,23,38,.9)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 text-white">
              <span className="icon-tile" style={{ background: "var(--tone)", color: "#fff" }}><Icon name={s.icon} size={22} /></span>
              <span><span className="display block text-[length:var(--t-3)]">{s.title}</span><span className="block text-[14px] opacity-90">{s.line}</span></span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Steps (a real sequence) ---------- */
export function Steps({ data }: { data: Home["steps"] }) {
  return (
    <Section tone="card">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><Heading>{data.heading}</Heading><a href="#contact" className="btn btn-primary mt-8">Talk to an engineer</a></div>
        <ol className="grid gap-4 lg:col-span-8 md:grid-cols-3">
          {data.items.map((s, i) => (
            <li key={s.title} className="tile tone-blue flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between"><span className="icon-tile"><Icon name={s.icon} size={22} /></span><span className="display text-[length:var(--t-4)] text-[var(--c-blue)]">{i + 1}</span></div>
              <h3 className="display text-[22px]">{s.title}</h3>
              <p className="text-[15px] text-muted-foreground">{s.line}</p>
              <span className="mt-auto text-[13px] font-semibold">{s.when}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Results ---------- */
export function Results({ data }: { data: Home["results"] }) {
  return (
    <Section id="company">
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {data.items.map((r) => (
          <div key={r.label} className={`tile tile-tone ${tone(r.tone)} p-7`}>
            <div className="display text-[length:var(--t-7)] tabular" style={{ color: "var(--tone)" }}>{r.prefix}<NumberTicker value={r.value} decimalPlaces={r.decimals ?? 0} className="display text-[length:var(--t-7)] tabular" style={{ color: "var(--tone)" }} />{r.suffix}</div>
            <p className="mt-2 text-[17px] font-semibold">{r.label}</p>
            <p className="mt-2 text-[13px] text-muted-foreground">{r.tag}</p>
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
        <div className="tone-green lg:col-span-5">
          <span className="icon-tile lg" style={{ background: "var(--c-green)", color: "#fff" }}><Icon name="Layers" size={28} /></span>
          <Heading className="mt-5 text-[var(--panel-foreground)]">{data.heading}</Heading>
          <p className="mt-5 text-[length:var(--t-2)] text-[var(--panel-muted)]">{data.line}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {data.modules.map(([n, d]) => <li key={n} className="flex items-center gap-3 rounded-lg bg-[color-mix(in_srgb,var(--panel-foreground)_9%,transparent)] px-4 py-3"><Icon name="Check" size={18} className="text-[var(--c-green)]" /><span className="font-semibold">{n}</span><span className="ml-auto text-[13px] text-[var(--panel-muted)]">{d}</span></li>)}
          </ul>
          <a href="#" className="btn btn-onpanel mt-8">See Signal</a>
        </div>
        <div className="tile !border-0 p-6 text-foreground lg:col-span-7" aria-label="Signal dashboard, illustrative">
          <div className="flex items-center justify-between text-[13px] text-muted-foreground"><span className="font-semibold text-foreground">Signal · Plant 2 · Line B</span><span className="flex items-center gap-2 text-[var(--c-green)]"><span className="h-2 w-2 rounded-full bg-[var(--c-green)]" />8 devices online</span></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[["Furnace 1", `${t.temp} °C`, "set 850", "green"], ["VFD 3", `${t.hz} Hz`, "nominal", "green"], ["Scale A", `${t.kg.toLocaleString("en-IN")} kg`, "over 1,200 · slowed", "orange"]].map(([a, b, c, k]) => (
              <div key={a} className={`tone-${k} rounded-xl p-4`} style={{ background: "var(--tone-soft)" }}>
                <div className="text-[12px] text-muted-foreground">{a}</div>
                <div className="display mt-1 text-[length:var(--t-4)] tabular">{b}</div>
                <div className="mt-1 text-[12px]" style={{ color: "var(--tone)" }}>{c}</div>
              </div>
            ))}
          </div>
          <div className="tone-blue mt-3 flex items-center justify-between rounded-xl p-4" style={{ background: "var(--tone-soft)" }}>
            <div><div className="text-[12px] text-muted-foreground">Depot 4 · dispensed today</div><div className="display mt-1 text-[length:var(--t-5)] tabular">{t.litres.toLocaleString("en-IN")} L</div></div>
            <div className="tone-orange rounded-lg px-3 py-2 text-[13px] font-semibold" style={{ background: "var(--tone-soft)", color: "var(--tone)" }}>HR 55 AB 1274 · −38 L flagged</div>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">Illustrative values. Real Signal screens replace this panel.</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ data }: { data: Home["faq"] }) {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5"><Heading>{data.heading}</Heading></div>
        <Accordion className="lg:col-span-7">
          {data.items.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-5 text-left text-[18px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[16px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ---------- CTA ---------- */
export function Cta({ data }: { data: Home["cta"] }) {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" className="tone-orange" >
      <div className="grid items-center gap-10 overflow-hidden rounded-3xl p-8 md:p-12 lg:grid-cols-2" style={{ background: "var(--c-orange)" }}>
        <div className="text-[#101317]"><Heading>{data.heading}</Heading><p className="mt-5 max-w-[44ch] text-[length:var(--t-2)]">{data.body}</p></div>
        <form className="tile flex flex-col gap-4 p-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">Work email<input required type="email" className="h-12 rounded-lg border border-input bg-card px-3 text-[16px] font-normal" placeholder="you@company.com" /></label>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">What are you trying to solve?<textarea required rows={3} className="rounded-lg border border-input bg-card p-3 text-[16px] font-normal" placeholder="e.g. We run 40 trucks and lose track of fuel" /></label>
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[14px] text-muted-foreground">{sent ? "Sent. An engineer will reply within one business day." : data.note}</span><button className="btn btn-primary" type="submit">Send</button></div>
        </form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
export function Footer({ cols }: { cols: Home["footer"] }) {
  return (
    <footer className="border-t border-border py-12 text-[14px]">
      <div className="container-x grid gap-8 md:grid-cols-6">
        <div><div className="flex items-center gap-2 text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}><img src="/brand/aid-iot-mark.svg" alt="" width={26} height={23} />AID-IoT</div><p className="mt-3 max-w-[26ch] text-muted-foreground">Devices, software and cloud for connected operations. Designed and built in India.</p></div>
        {Object.entries(cols).map(([k, items]) => (
          <div key={k}><div className="mb-2 font-semibold">{k}</div>{items.map((i) => <a key={i} href="#" className="block py-1 text-muted-foreground hover:text-foreground">{i}</a>)}</div>
        ))}
      </div>
      <div className="container-x mt-10 text-[13px] text-muted-foreground">© 2026 AID-IoT · Delhi · Acton ON</div>
    </footer>
  );
}
