import { services } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Faq, Cta } from "@/components/site/sections";
export const metadata = { title: "Services — AID-IoT" };
export default function Page() {
  return (
    <Shell>
      <PageHero data={services.hero} crumb={["Home", "Services"]} />
      <IconGrid eyebrow="Services" heading={services.offer.heading} items={services.offer.items} tone="card" />
      <IconGrid id="how" eyebrow="How we work" heading={services.steps.heading} items={services.steps.items} numbered />
      <PhotoGrid eyebrow="Shipped" heading={services.work.heading} items={services.work.items} />
      <Faq items={services.faq} />
      <Cta data={{ heading: "Send us a brief.", body: "Tell us what it must do, by when, and roughly how many. An engineer replies within one business day.", note: "No sales deck." }} />
    </Shell>
  );
}
