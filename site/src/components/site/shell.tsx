import { SiteHeader } from "./header";
import { Footer } from "./sections";
import { home } from "@/content/home";
export function Shell({ children }: { children: React.ReactNode }) {
  return (<><SiteHeader /><main id="main">{children}</main><Footer cols={home.footer} /></>);
}
