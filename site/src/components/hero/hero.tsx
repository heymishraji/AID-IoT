"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useWorld, type World } from "@/components/site/theme";
import { LiveDiagram } from "./live-diagram";
import { Ledger } from "./ledger";
import type { Home } from "@/content/home";
const DeviceScene = dynamic(() => import("./device-scene").then((m) => m.DeviceScene), { ssr: false });

export function Hero({ data }: { data: Home["hero"] }) {
  const [world, setWorld] = useWorld();
  useEffect(() => { const f = (e: Event) => setWorld((e as CustomEvent).detail as World); addEventListener("aid-world", f); return () => removeEventListener("aid-world", f); }, [setWorld]);
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [labels, setLabels] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progress.current = v; setLabels(v > 0.62); });

  const copy = (
    <div className="flex max-w-[600px] flex-col gap-6">
      <h1 className={`display ${world === "c" ? "text-[var(--panel-foreground)]" : ""} text-[length:var(--t-7)] md:text-[length:var(--t-8)]`}>{data.headline}</h1>
      <p className={`prose-lead ${world === "c" ? "!text-[var(--panel-foreground)]/90" : ""}`}>{data.sub}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a href="#contact" className={`btn ${world === "c" ? "bg-[var(--panel-foreground)] text-[var(--panel)]" : "btn-primary"}`}>{data.cta}</a>
        <a href="#scenes" className={`btn ${world === "c" ? "btn-onpanel" : "btn-outline"}`}>{data.secondary}</a>
      </div>
      <p className={`max-w-[44ch] text-[14px] ${world === "c" ? "text-[var(--panel-muted)]" : "text-muted-foreground"}`}>{data.ctaNote}</p>
    </div>
  );

  if (world === "a") return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 grid h-screen items-center gap-8 pt-[68px] lg:grid-cols-12">
        <div className="container-x lg:col-span-6">{copy}</div>
        <div className="relative mx-[var(--gutter)] h-[52vh] overflow-hidden rounded-[var(--radius)] bg-[var(--accent)] lg:col-span-6 lg:mr-5 lg:ml-0 lg:h-[calc(100vh-100px)]">
          <div className="absolute left-5 top-4 z-10 text-[13px] text-[#101317]">{labels ? "IIoT Bridge, open: six layers, one company" : "IIoT Bridge — scroll to open"}</div>
          <DeviceScene progress={progress} labels={labels} />
        </div>
      </div>
    </div>
  );
  if (world === "b") return (
    <div className="container-x grid items-center gap-10 pt-[124px] pb-12 lg:min-h-[92vh] lg:grid-cols-12">
      <div className="lg:col-span-5">{copy}</div>
      <div className="lg:col-span-7"><LiveDiagram /></div>
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-[var(--panel)]">
      <div className="absolute inset-0 bg-[url(/img/petrol-night.webp)] bg-cover bg-center opacity-80" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,27,43,.2)] via-[rgba(20,27,43,.35)] to-[rgba(20,27,43,.92)]" aria-hidden />
      <div className="container-x relative grid items-end gap-10 pt-[140px] pb-16 lg:min-h-[100vh] lg:grid-cols-12">
        <div className="lg:col-span-7">{copy}</div>
        <div className="lg:col-span-5"><Ledger /></div>
      </div>
    </div>
  );
}
