import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript, ThemeSwitch } from "@/components/site/theme";
import { SmoothScroll } from "@/components/site/smooth-scroll";

export const metadata: Metadata = {
  title: "AID-IoT — Connected operations, designed and built in India",
  description: "Devices, software and the Signal platform for plants, fleets, depots and secure sites. One team designs the hardware, writes the software and runs it — even where there is no network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="a" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=switzer@400,500,600&f[]=khand@600,700&f[]=ranade@400,500,600&f[]=zodiak@400,700,900&f[]=author@400,500,600&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500&display=swap" />
        <ThemeScript />
      </head>
      <body className="bg-background text-foreground">
        <SmoothScroll />
        {children}
        <ThemeSwitch />
      </body>
    </html>
  );
}
