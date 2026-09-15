"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { asset } from "@/lib/asset";

const NAV = [["Solutions", "/solutions/fleet-and-fuel"], ["Products", "/products/iiot-bridge"], ["Software", "/software/signal"], ["Services", "/services"], ["Company", "/company"]];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const path = usePathname();
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${solid ? "bg-background/90 shadow-[0_1px_0_var(--border)] backdrop-blur" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-card focus:px-3 focus:py-2">Skip to content</a>
      <div className="container-x flex h-[68px] items-center justify-between">
        <Link href="/" className="tap flex items-center gap-2.5 text-[20px] font-bold" style={{ fontFamily: "var(--font-display)" }}><img src={asset("/brand/aid-iot-mark.svg")} alt="" width={30} height={27} />AID-IoT</Link>
        <nav aria-label="Primary" className="hidden gap-7 lg:flex">
          {NAV.map(([n, h]) => { const on = path.startsWith(h.split("/").slice(0, 2).join("/")); return <Link key={n} href={h} aria-current={on ? "page" : undefined} className={`tap text-[15px] font-medium ${on ? "text-[var(--accent-ink)]" : "hover:text-[var(--accent-ink)]"}`}>{n}</Link>; })}
        </nav>
        <div className="hidden items-center gap-5 lg:flex"><Link href="#" className="tap px-2 text-sm text-muted-foreground hover:text-foreground">Store</Link><Link href="#" className="tap px-2 text-sm text-muted-foreground hover:text-foreground">Log in</Link><Link href="/contact" className="btn btn-primary !h-11 !px-4 !text-sm">Talk to an engineer</Link></div>
        <Sheet><SheetTrigger className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu"><Menu /></SheetTrigger>
          <SheetContent side="right" className="bg-background"><SheetTitle className="display text-[length:var(--t-3)]">Menu</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">{NAV.map(([n, h]) => <Link key={n} href={h} className="py-3 text-[19px] font-medium">{n}</Link>)}<Link href="#" className="py-3 text-muted-foreground">Store</Link><Link href="#" className="py-3 text-muted-foreground">Log in</Link><Link href="/contact" className="btn btn-primary mt-4">Talk to an engineer</Link></nav>
          </SheetContent></Sheet>
      </div>
    </header>
  );
}
