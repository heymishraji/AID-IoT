"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const NAV = ["Solutions", "Products", "Software", "Services", "Company"];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${solid ? "solid bg-background/90 shadow-[0_1px_0_var(--border)] backdrop-blur" : ""}`}>
      <div className="container-x flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[20px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
          <img src="/brand/aid-iot-mark.svg" alt="" width={30} height={27} />AID-IoT
        </Link>
        <nav aria-label="Primary" className="hidden gap-7 lg:flex">
          {NAV.map((n) => <Link key={n} href={`#${({Solutions:"sectors-list",Products:"solutions",Software:"software",Services:"services",Company:"company"} as Record<string,string>)[n]}`} className="text-[15px] font-medium hover:text-[var(--accent-ink)]">{n}</Link>)}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="#" className="text-sm text-muted-foreground">Store</Link>
          <Link href="#" className="text-sm text-muted-foreground">Log in</Link>
          <a href="#contact" className="btn btn-primary !h-11 !px-4 !text-sm">Talk to an engineer</a>
        </div>
        <Sheet>
          <SheetTrigger className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu"><Menu /></SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="display text-[length:var(--t-3)]">Menu</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map((n) => <Link key={n} href={`#${({Solutions:"sectors-list",Products:"solutions",Software:"software",Services:"services",Company:"company"} as Record<string,string>)[n]}`} className="py-3 text-[19px] font-medium">{n}</Link>)}
              <Link href="#" className="py-3 text-muted-foreground">Store</Link>
              <Link href="#" className="py-3 text-muted-foreground">Log in</Link>
              <a href="#contact" className="btn btn-primary mt-4">Talk to an engineer</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
