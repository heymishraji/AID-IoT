"use client";
/* The brand-level hero visual: real operations → AID-IoT → the Signal screen. Beams show the signal travelling. */
import { useRef, useEffect, useState } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Icon } from "@/components/site/icon";
import { asset } from "@/lib/asset";

const SOURCES = [
  { icon: "Factory", label: "Plant", sub: "Furnace 1 · 842 °C", img: "/img/control-room.webp" },
  { icon: "Truck", label: "Fleet", sub: "HR 55 AB 1274 · 47 km/h", img: "/img/convoy-india.webp" },
  { icon: "Fuel", label: "Depot", sub: "Tank 2 · 61.4 %", img: "/img/rail-tankers.webp" },
];

export function SignalPath() {
  const container = useRef<HTMLDivElement>(null);
  const src = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const hub = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 1600); return () => clearInterval(id); }, []);
  const temp = 842 + ((tick * 7) % 5) - 2;
  return (
    <div ref={container} className="relative h-full min-h-[440px] w-full overflow-hidden rounded-2xl border border-border bg-card lg:min-h-[560px]">
      <DotPattern className="[mask-image:radial-gradient(60%_60%_at_50%_50%,white,transparent)] text-[#D9D9D4]" />
      <div className="relative grid h-full grid-cols-1 items-center gap-5 p-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:p-8">
        {/* sources */}
        <div className="flex flex-row gap-3 sm:flex-col sm:gap-4">
          {SOURCES.map((s, i) => (
            <div key={s.label} ref={src[i]} className="tile flex min-w-0 flex-1 items-center gap-3 p-2.5 sm:flex-none sm:pr-4">
              <img src={asset(s.img.replace(".webp","-480.webp"))} alt="" width={44} height={44} className="h-11 w-11 flex-none rounded-lg object-cover" />
              <div className="min-w-0"><div className="text-[14px] font-semibold">{s.label}</div><div className="hidden truncate text-[12px] text-muted-foreground sm:block">{s.sub}</div></div>
            </div>
          ))}
        </div>
        {/* hub */}
        <div ref={hub} className="flex flex-col items-center gap-2">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-[var(--panel)] shadow-[0_20px_40px_-20px_rgba(15,17,21,.6)]"><img src={asset("/brand/aid-iot-mark.svg")} alt="" className="h-9 w-10" /></div>
          <div className="text-center text-[12px] font-semibold leading-tight">Device · link<br />· Signal</div>
        </div>
        {/* outputs */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div ref={screen} className="tile overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[12px]"><span className="font-semibold">Signal</span><span className="live">live</span></div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="rounded-lg bg-secondary p-2"><div className="text-[12px] text-muted-foreground">Furnace 1</div><div className="display text-[20px] tabular">{temp} °C</div></div>
              <div className="rounded-lg bg-secondary p-2"><div className="text-[12px] text-muted-foreground">Depot 4</div><div className="display text-[20px] tabular">18,4{(tick % 9)}0 L</div></div>
              <div className="col-span-2 rounded-lg px-2 py-1.5 text-[12px] font-medium" style={{ background: "#FFE6DC", color: "var(--accent-ink)" }}>−38 L drain flagged · supervisor notified</div>
            </div>
          </div>
          <div ref={phone} className="tile flex items-center gap-3 p-2.5 pr-4"><span className="icon-tile"><Icon name="Smartphone" size={20} /></span><div><div className="text-[14px] font-semibold">Your team&apos;s phone</div><div className="text-[12px] text-muted-foreground">alert · 14:22:06</div></div></div>
        </div>
      </div>
      {src.map((r, i) => <AnimatedBeam key={i} containerRef={container} fromRef={r} toRef={hub} curvature={(i - 1) * 40} duration={4 + i} pathColor="#D9D9D4" pathWidth={2} gradientStartColor="#F04E1A" gradientStopColor="#F04E1A" />)}
      <AnimatedBeam containerRef={container} fromRef={hub} toRef={screen} curvature={-30} duration={4} pathColor="#D9D9D4" pathWidth={2} gradientStartColor="#F04E1A" gradientStopColor="#F04E1A" />
      <AnimatedBeam containerRef={container} fromRef={hub} toRef={phone} curvature={30} duration={5} pathColor="#D9D9D4" pathWidth={2} gradientStartColor="#F04E1A" gradientStopColor="#F04E1A" />
    </div>
  );
}
