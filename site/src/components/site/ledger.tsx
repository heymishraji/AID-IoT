"use client";
/* Fleet & fuel: the paper register beside the Signal ledger — the before/after in one frame. */
import { Section, Heading } from "./section";
const rows = [["12 Jun 09:41", "HR 55 AB 1200", "210 L", "210.4 L", "signed", false], ["13 Jun 07:12", "HR 55 AB 1237", "180 L", "180.0 L", "signed", false], ["13 Jun 16:58", "HR 55 AB 1274", "?? L", "−38.0 L", "drain flagged", true], ["14 Jun 08:03", "HR 55 AB 1311", "195 L", "195.2 L", "signed", false]] as const;
export function Ledger() {
  return (
    <Section id="ledger" tone="card">
      <span className="eyebrow-dot">Before and after</span><Heading className="mt-3">The register, and the record.</Heading>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="tile p-5"><p className="text-[14px] font-semibold text-muted-foreground">Paper register · Depot 4</p>
          <table className="mt-3 w-full text-[15px]"><thead><tr className="text-left text-[12px] text-muted-foreground"><th className="py-2 font-medium">Date</th><th className="font-medium">Vehicle</th><th className="text-right font-medium">Litres</th><th className="pl-4 font-medium">Sign</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r[1]} className="border-t border-border"><td className="py-2.5 text-muted-foreground">{r[0].slice(0, 6)}</td><td>{r[1]}</td><td className="text-right">{r[2]}</td><td className="pl-4">{r[5] ? "—" : "✓"}</td></tr>)}</tbody></table>
          <p className="mt-3 text-[13px] text-muted-foreground">Found at month-end, if at all.</p></div>
        <div className="rounded-2xl bg-[var(--panel)] p-5 text-[var(--panel-foreground)]"><div className="flex items-center justify-between text-[14px]"><span className="font-semibold">Signal · fuel ledger</span><span className="live">NavIC time</span></div>
          <table className="mt-3 w-full text-[15px]"><tbody>{rows.map((r) => <tr key={r[1]} className="border-t border-white/10"><td className="py-2.5 text-[13px] text-[var(--panel-muted)]">{r[0]}</td><td>{r[1]}</td><td className={`text-right display text-[18px] tabular ${r[5] ? "text-[var(--accent)]" : ""}`}>{r[3]}</td><td className={`pl-4 text-[12px] ${r[5] ? "text-[var(--accent)]" : "text-[#7BD0A3]"}`}>{r[4]}</td></tr>)}</tbody></table>
          <p className="mt-3 text-[13px] text-[var(--panel-muted)]">Flagged at 16:58, the day it happened.</p></div>
      </div>
    </Section>
  );
}
