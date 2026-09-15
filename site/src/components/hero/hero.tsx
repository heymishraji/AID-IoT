"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "motion/react";
import type { Home } from "@/content/home";
const DeviceScene = dynamic(() => import("./device-scene").then((m) => m.DeviceScene), { ssr: false });

export function Hero({ data }: { data: Home["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [labels, setLabels] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progress.current = v; setLabels(v > 0.62); });
  return (
    <div ref={ref} className="relative lg:h-[260vh]">
      <div className="grid items-center gap-8 pt-[92px] lg:sticky lg:top-0 lg:h-screen lg:grid-cols-12 lg:pt-[68px]">
        <div className="container-x lg:col-span-6">
          <div className="flex max-w-[600px] flex-col gap-6">
            <h1 className="display text-[length:var(--t-7)] md:text-[length:var(--t-8)]">{data.headline}</h1>
            <p className="prose-lead">{data.sub}</p>
            <div className="flex flex-wrap items-center gap-3"><a href="#contact" className="btn btn-primary">{data.cta}</a><a href="#offers" className="btn btn-outline">{data.secondary}</a></div>
            <p className="max-w-[44ch] text-[14px] text-muted-foreground">{data.ctaNote}</p>
          </div>
        </div>
        <div className="relative mx-[var(--gutter)] mt-6 h-[56vh] overflow-hidden rounded-2xl bg-[var(--c-orange)] lg:col-span-6 lg:mr-5 lg:ml-0 lg:mt-0 lg:h-[calc(100vh-100px)]">
          <div className="absolute left-5 top-4 z-10 rounded-md bg-[rgba(16,19,23,.85)] px-3 py-1.5 text-[13px] text-white">{labels ? "IIoT Bridge, open — six layers, one company" : "IIoT Bridge — scroll to open"}</div>
          <DeviceScene progress={progress} labels={labels} />
        </div>
      </div>
    </div>
  );
}
