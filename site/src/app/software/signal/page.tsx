import { signal } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Platform, Faq, Cta } from "@/components/site/sections";
export const metadata = { title: "Signal — AID-IoT" };
export default function Page() {
  return (
    <Shell>
      <PageHero data={signal.hero} crumb={["Home", "Software", "Signal"]} />
      <IconGrid eyebrow="The platform" heading={signal.pillars.heading} items={signal.pillars.items} tone="card" />
      <Platform data={home.platform} />
      <PhotoGrid id="modules" eyebrow="Modules" heading={signal.modules.heading} items={signal.modules.items} tone="default" />
      <Faq items={signal.faq} />
      <Cta data={home.cta} />
    </Shell>
  );
}
