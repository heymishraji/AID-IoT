import { iiot } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { SpecStrip, IconGrid, SpecTable, ChipList, Faq, Cta } from "@/components/site/sections";
export const metadata = { title: "IIoT Bridge — AID-IoT", description: "Connect the PLCs, drives, scales and meters you already have to one live screen. Works offline, sends to Signal or your own system." };
export default function Page() {
  return (
    <Shell>
      <PageHero data={iiot.hero} crumb={["Home", "Products", "Gateways & edge", "IIoT Bridge"]} />
      <SpecStrip items={iiot.strip} />
      <IconGrid heading={iiot.who.heading} items={iiot.who.items} variant="rows" lead="One device, three people who need it." />
      <IconGrid heading={iiot.gets.heading} items={iiot.gets.items} tone="card" />
      <SpecTable groups={iiot.specs} />
      <ChipList heading="Eight places the bridge is already working." items={iiot.uses} />
      <Faq items={iiot.faq} />
      <Cta data={home.cta} />
    </Shell>
  );
}
