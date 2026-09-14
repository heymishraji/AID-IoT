"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, Heading } from "./section";
import type { Home } from "@/content/home";

/* ---------- Proof: names that make the claim believable ---------- */
export function ProofBar({ names }: { names: string[] }) {
  return (
    <div className="container-x">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border py-6 text-[15px] text-muted-foreground">
        <span>Fielded with</span>
        {names.map((n) => <span key={n} className="font-semibold text-foreground">{n}</span>)}
      </div>
    </div>
  );
}

/* ---------- Scenes: the reader's discomfort, three vignettes ---------- */
export function Scenes({ data }: { data: Home["scenes"] }) {
  return (
    <Section id="scenes">
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {data.items.map((s) => (
          <article key={s.title} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)]"><Image src={s.img} alt={s.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
            <h3 className="display text-[length:var(--t-3)]">{s.title}</h3>
            <p className="text-[16px] leading-relaxed text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 max-w-[60ch] text-[length:var(--t-2)] leading-snug">{data.close}</p>
    </Section>
  );
}

/* ---------- Outcomes: what changes (not a sequence — no numbers) ---------- */
export function Outcomes({ data }: { data: Home["outcomes"] }) {
  return (
    <Section id="solutions" tone="card">
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {data.items.map((o) => (
          <div key={o.title} className="border-t border-border pt-5">
            <h3 className="display text-[length:var(--t-3)]">{o.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{o.body}</p>
            <p className="mt-3 text-[14px]"><span className="text-muted-foreground">Done by </span>{o.proof}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Mechanism: one team, sensor to screen ---------- */
export function Mechanism({ data }: { data: Home["mechanism"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <Section id="services">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading>{data.heading}</Heading>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">{data.p1}</p>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed">{data.p2}</p>
        </div>
        <div ref={ref} className="lg:col-span-6">
          <ol className="panel flex flex-col gap-2 p-6" aria-label="The layers, all ours">
            {data.layers.map((l, i) => (
              <motion.li key={l.name} initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex flex-col gap-1 border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 border-[color-mix(in_srgb,var(--panel-foreground)_15%,transparent)] py-3 last:border-0">
                <span className="display text-[length:var(--t-2)]">{l.name}</span>
                <span className="text-[14px] text-[var(--panel-muted)] sm:text-right">{l.who}</span>
              </motion.li>
            ))}
            <li className="pt-3 text-[14px] text-[var(--panel-muted)]">All designed and built in India.</li>
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Steps: how it starts (a real sequence, so numbered) ---------- */
export function Steps({ data }: { data: Home["steps"] }) {
  return (
    <Section tone="card">
      <Heading>{data.heading}</Heading>
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {data.items.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-3">
            <span className="display flex h-11 w-11 items-center justify-center rounded-full bg-primary text-[18px] text-primary-foreground">{i + 1}</span>
            <h3 className="display text-[length:var(--t-3)]">{s.title}</h3>
            <p className="text-[16px] leading-relaxed text-muted-foreground">{s.body}</p>
            <span className="text-[14px] font-semibold">{s.when}</span>
          </li>
        ))}
      </ol>
      <a href="#contact" className="btn btn-primary mt-12">Talk to an engineer</a>
    </Section>
  );
}

/* ---------- Results ---------- */
export function Results({ data }: { data: Home["results"] }) {
  return (
    <Section id="company">
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {data.items.map((r) => (
          <div key={r.label} className="frame flex flex-col gap-2 p-7">
            <div className="display text-[length:var(--t-6)] tabular">{r.prefix}<NumberTicker value={r.value} decimalPlaces={r.decimals ?? 0} className="display text-[length:var(--t-6)] tabular" />{r.suffix}</div>
            <p className="text-[17px] font-semibold">{r.label}</p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{r.detail}</p>
            <p className="mt-2 text-[13px] text-muted-foreground">{r.tag}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Platform: Signal, shown as a live panel ---------- */
export function Platform({ data }: { data: Home["platform"] }) {
  const [t, setT] = useState({ temp: 842, hz: 47.2, kg: 1206, litres: 18420 });
  useEffect(() => { const id = setInterval(() => setT({ temp: 842 + Math.round((Math.random() - 0.5) * 6), hz: +(47.2 + (Math.random() - 0.5) * 0.6).toFixed(1), kg: 1206 + Math.round((Math.random() - 0.5) * 8), litres: 18420 + Math.round((Math.random() - 0.5) * 60) }), 1500); return () => clearInterval(id); }, []);
  return (
    <Section id="software" tone="card">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading>{data.heading}</Heading>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">{data.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {data.modules.map((m) => <li key={m.name} className="text-[16px]"><span className="font-semibold">{m.name}</span> <span className="text-muted-foreground">— {m.body}</span></li>)}
          </ul>
          <a href="#" className="btn btn-outline mt-8">See Signal</a>
        </div>
        <div className="panel p-6 lg:col-span-7" aria-label="Signal dashboard, illustrative">
          <div className="flex items-center justify-between text-[13px] text-[var(--panel-muted)]"><span>Signal · Plant 2 · Line B</span><span className="text-[var(--ok)]" style={{ color: "#7BD0A3" }}>8 devices online</span></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[["Furnace 1", `${t.temp} °C`, "set 850"], ["VFD 3", `${t.hz} Hz`, "nominal"], ["Scale A", `${t.kg.toLocaleString("en-IN")} kg`, "over 1,200 · conveyor slowed"]].map(([a, b, c]) => (
              <div key={a} className="rounded-[var(--radius)] bg-[color-mix(in_srgb,var(--panel-foreground)_8%,transparent)] p-4">
                <div className="text-[12px] text-[var(--panel-muted)]">{a}</div>
                <div className="display mt-1 text-[length:var(--t-4)] tabular">{b}</div>
                <div className="mt-1 text-[12px] text-[var(--panel-muted)]">{c}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[var(--radius)] bg-[color-mix(in_srgb,var(--panel-foreground)_8%,transparent)] p-4">
            <div className="text-[12px] text-[var(--panel-muted)]">Depot 4 · dispensed today</div>
            <div className="display mt-1 text-[length:var(--t-5)] tabular">{t.litres.toLocaleString("en-IN")} L</div>
            <div className="mt-2 text-[13px]">HR 55 AB 1274 · <span style={{ color: "#FFB27A" }}>−38 L drain flagged</span> · supervisor notified</div>
          </div>
          <p className="mt-3 text-[12px] text-[var(--panel-muted)]">Illustrative values. Real Signal screens replace this panel.</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ data }: { data: Home["faq"] }) {
  return (
    <Section id="products">
      <div className="grid gap-12 lg:grid-cols-12">
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
    <Section id="contact" tone="panel">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div><Heading className="text-[var(--panel-foreground)]">{data.heading}</Heading><p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-[var(--panel-muted)]">{data.body}</p></div>
        <form className="frame flex flex-col gap-4 p-6 text-foreground" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">Work email<input required type="email" className="h-12 rounded-[var(--radius)] border border-input bg-card px-3 text-[16px] font-normal" placeholder="you@company.com" /></label>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">What are you trying to solve?<textarea required rows={3} className="rounded-[var(--radius)] border border-input bg-card p-3 text-[16px] font-normal" placeholder="e.g. We run 40 trucks and lose track of fuel" /></label>
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
        <div className="md:col-span-1"><div className="flex items-center gap-2 text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}><img src="/brand/aid-iot-mark.svg" alt="" width={26} height={23} />AID-IoT</div><p className="mt-3 max-w-[26ch] text-muted-foreground">Devices, software and cloud for connected operations. Designed and built in India.</p></div>
        {Object.entries(cols).map(([k, items]) => (
          <div key={k}><div className="mb-2 font-semibold">{k}</div>{items.map((i) => <a key={i} href="#" className="block py-1 text-muted-foreground hover:text-foreground">{i}</a>)}</div>
        ))}
      </div>
      <div className="container-x mt-10 text-[13px] text-muted-foreground">© 2026 AID-IoT · Delhi · Acton ON · Prototype build; photos: AID-IoT and Pexels (credits in repo).</div>
    </footer>
  );
}
