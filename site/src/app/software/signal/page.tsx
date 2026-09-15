import { signal } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Platform, Faq, Cta } from "@/components/site/sections";
export const metadata = { title: "Signal — AID-IoT", description: "The software platform behind every AID-IoT device: every reading stored, every rule run, any screen — in our cloud or on your servers." };
export default function Page() {
  return (
    <Shell>
      <PageHero data={signal.hero} crumb={["Home", "Software", "Signal"]} />
      <IconGrid heading={signal.pillars.heading} items={signal.pillars.items} tone="card" />
      <Platform data={home.platform} />
      <PhotoGrid id="modules" heading={signal.modules.heading} items={signal.modules.items} tone="default" />
      <Faq items={signal.faq} />
      <Cta data={home.cta} />
    </Shell>
  );
}
