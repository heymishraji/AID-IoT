import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ id, children, className, tone = "default" }: { id?: string; children: ReactNode; className?: string; tone?: "default" | "card" | "panel" }) {
  const tones = { default: "", card: "bg-card border-y border-border", panel: "panel" } as const;
  return (
    <section id={id} className={cn("section", tones[tone], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Heading({ children, level = 2, className }: { children: ReactNode; level?: 1 | 2 | 3; className?: string }) {
  const Tag = (`h${level}`) as "h1" | "h2" | "h3";
  const size = level === 1 ? "text-[length:var(--t-6)] md:text-[length:var(--t-7)]" : level === 2 ? "text-[length:var(--t-5)] md:text-[length:var(--t-6)]" : "text-[length:var(--t-3)]";
  return <Tag className={cn("display max-w-[22ch]", size, className)}>{children}</Tag>;
}
