"use client";
import { useEffect, useState } from "react";

export type World = "a" | "b" | "c";
const KEY = "aid-world";

/** Applies the saved world before paint so there is no flash. */
export function ThemeScript() {
  const js = `try{var w=localStorage.getItem('${KEY}');if(w==='a'||w==='b'||w==='c')document.documentElement.dataset.theme=w}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

export function useWorld(): [World, (w: World) => void] {
  const [w, setW] = useState<World>("a");
  useEffect(() => {
    const cur = (document.documentElement.dataset.theme as World) || "a";
    setW(cur);
  }, []);
  const set = (n: World) => {
    document.documentElement.dataset.theme = n;
    try { localStorage.setItem(KEY, n); } catch {}
    setW(n);
    window.dispatchEvent(new CustomEvent("aid-world", { detail: n }));
  };
  return [w, set];
}

/** Review-only control: the same page structure in world A, B or C. Remove before launch. */
export function ThemeSwitch() {
  const [w, set] = useWorld();
  const names: Record<World, string> = { a: "A · Open the device", b: "B · Panel room", c: "C · Field log" };
  return (
    <div style={{ position: "fixed", left: 16, bottom: 16, zIndex: 100 }} className="flex items-center gap-1 rounded-full bg-[var(--panel)] p-1 text-[var(--panel-foreground)] shadow-lg">
      {(["a", "b", "c"] as World[]).map((k) => (
        <button key={k} onClick={() => set(k)} aria-pressed={w === k} title={names[k]}
          className="h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition-colors aria-pressed:bg-[var(--accent)] aria-pressed:text-[var(--accent-foreground)]">
          {k.toUpperCase()}
        </button>
      ))}
      <span className="hidden pr-3 pl-1 text-xs opacity-80 sm:inline">{names[w]}</span>
    </div>
  );
}
