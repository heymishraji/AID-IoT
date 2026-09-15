import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { BASE } from "@/lib/asset";

const FONT_CSS = `
@font-face{font-family:"Cabinet Grotesk";font-weight:700;font-style:normal;font-display:swap;src:url("${BASE}/fonts/cabinet-grotesk-700.woff2") format("woff2")}
@font-face{font-family:"Switzer";font-weight:400;font-style:normal;font-display:fallback;src:url("${BASE}/fonts/switzer-400.woff2") format("woff2")}
@font-face{font-family:"Switzer";font-weight:500;font-style:normal;font-display:fallback;src:url("${BASE}/fonts/switzer-500.woff2") format("woff2")}
@font-face{font-family:"Switzer";font-weight:600;font-style:normal;font-display:fallback;src:url("${BASE}/fonts/switzer-600.woff2") format("woff2")}
@font-face{font-family:"Switzer Fallback";src:local("Arial");size-adjust:98%;ascent-override:92%;descent-override:22%;line-gap-override:0%}
@font-face{font-family:"Cabinet Fallback";src:local("Arial Black"),local("Arial Bold");size-adjust:96%;ascent-override:90%;descent-override:22%;line-gap-override:0%}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://heymishraji.github.io/aid-iot-website/"),
  title: "AID-IoT — Connected operations, designed and built in India",
  description: "Devices, software and the Signal platform for plants, fleets, depots and secure sites. One team designs the hardware, writes the software and runs it — even where there is no network.",
  openGraph: { type: "website", siteName: "AID-IoT", images: [{ url: "/img/control-room-960.webp", width: 960, height: 640 }] },
  icons: { icon: "/brand/aid-iot-mark.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="a" suppressHydrationWarning>
      <head>
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={`${BASE}/fonts/cabinet-grotesk-700.woff2`} />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={`${BASE}/fonts/switzer-400.woff2`} />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={`${BASE}/fonts/switzer-600.woff2`} />
        <meta name="theme-color" content="#F5F5F3" />
        <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      </head>
      <body className="bg-background text-foreground">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
