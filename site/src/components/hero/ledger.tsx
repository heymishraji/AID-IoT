"use client";
/* World C signature: the paper register dissolves into the Signal ledger as the visitor scrolls. */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const rows = [
  ["12 Jun", "HR 55 AB 1200", "210 L", "210.4 L", "signed 09:41:07", false],
  ["13 Jun", "HR 55 AB 1237", "180 L", "180.0 L", "signed 07:12:51", false],
  ["13 Jun", "HR 55 AB 1274", "?? L", "−38.0 L", "drain flagged", true],
  ["14 Jun", "HR 55 AB 1311", "195 L", "195.2 L", "signed 08:03:19", false],
  ["14 Jun", "HR 55 AB 1348", "160 L", "160.1 L", "signed 11:30:44", false],
] as const;

export function Ledger() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const rec = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-border bg-white shadow-[0_40px_80px_-40px_rgba(23,20,15,.5)]">
      <div className="absolute inset-0 p-7" style={{ background: "#F8F3E7", backgroundImage: "repeating-linear-gradient(transparent 0 35px,#DCCFB3 35px 36px)", backgroundPosition: "0 74px" }}>
        <div className="grid grid-cols-[80px_1fr_90px_70px] gap-2 border-b-2 border-[#5A4E3A] pb-1 text-[13px] text-[#5A4E3A]" style={{ fontFamily: "var(--font-display)" }}><span>Date</span><span>Vehicle</span><span className="text-right">Litres</span><span>Sign</span></div>
        {rows.map((r) => <div key={r[1]} className="grid h-9 grid-cols-[80px_1fr_90px_70px] items-end gap-2 text-[19px] text-[#2E2A22]" style={{ fontFamily: "Caveat, cursive", transform: "rotate(-.3deg)" }}><span>{r[0]}</span><span>{r[1]}</span><span className="text-right">{r[2]}</span><span>{r[5] ? "—" : "✓"}</span></div>)}
        <span className="absolute bottom-6 right-7 border border-dashed border-[#B8A98A] px-2 py-1 text-[10px] tracking-widest text-[#8A7A5A]">PAPER REGISTER · DEPOT 4</span>
      </div>
      <motion.div style={{ opacity: rec }} className="absolute inset-0 bg-[var(--panel)] p-7 text-[var(--panel-foreground)]">
        <div className="flex justify-between border-b border-white/10 pb-2 text-[11px] tracking-widest text-[var(--panel-muted)]"><span>SIGNAL · DEPOT 4 · FUEL LEDGER</span><span>NAVIC TIME</span></div>
        {rows.map((r) => <div key={r[1]} className="grid h-12 grid-cols-[80px_1fr_100px_130px] items-center gap-2 border-b border-white/5 text-[13px]"><span className="text-[var(--panel-muted)]">{r[0]}</span><span>{r[1]}</span><span className={`text-right text-[19px] tabular ${r[5] ? "text-[var(--accent)]" : ""}`} style={{ fontFamily: "var(--font-display)" }}>{r[3]}</span><span className={`text-[11px] ${r[5] ? "text-[var(--accent)]" : "text-[#7BB58F]"}`}>{r[4]}</span></div>)}
      </motion.div>
      <motion.div style={{ scaleX: bar }} className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[var(--accent)]" />
    </div>
  );
}
