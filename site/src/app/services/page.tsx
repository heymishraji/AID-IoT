import { services } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Faq, Cta } from "@/components/site/sections";
export const metadata = { title: "Services — AID-IoT", description: "Product development, PCB design, manufacturing in India and training — by the team that also writes the software." };
export default function Page() {
  return (
    <Shell>
      <PageHero data={services.hero} crumb={["Home", "Services"]} />
      <IconGrid heading={services.offer.heading} items={services.offer.items} tone="card" />
      <IconGrid id="how" heading={services.steps.heading} items={services.steps.items} numbered variant="rows" lead="Four stages, each with a typical duration. Fixed price per stage." />
      <PhotoGrid heading={services.work.heading} items={services.work.items} />
      <Faq items={services.faq} />
      <Cta data={{ heading: "Send us a brief.", body: "Tell us what it must do, by when, and roughly how many. An engineer replies within one business day.", note: "No sales deck." }} />
    </Shell>
  );
}
