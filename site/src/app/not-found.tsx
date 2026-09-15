import Link from "next/link";
import { Shell } from "@/components/site/shell";
export default function NotFound() {
  return (<Shell><div className="container-x pt-[140px] pb-24"><h1 className="display text-[length:var(--t-6)]">That page isn&apos;t here.</h1><p className="prose-lead mt-4">Try one of the five branches.</p><div className="mt-8 flex flex-wrap gap-2">{[["Solutions", "/solutions/fleet-and-fuel"], ["Products", "/products/iiot-bridge"], ["Software", "/software/signal"], ["Services", "/services"], ["Company", "/company"]].map(([n, h]) => <Link key={n} href={h} className="btn btn-outline">{n}</Link>)}</div></div></Shell>);
}
