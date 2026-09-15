import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { Hero } from "@/components/hero/hero";
import { ProofBar, Offers, Scenes, Outcomes, Mechanism, Sectors, IconGrid, Results, Platform, Faq, Cta } from "@/components/site/sections";

export default function Page() {
  return (
    <Shell>
      <Hero data={home.hero} />
      <ProofBar names={home.proof} />
      <Offers data={home.offers} />
      <Scenes data={home.scenes} />
      <Outcomes data={home.outcomes} />
      <Mechanism data={home.mechanism} />
      <Sectors data={home.sectors} />
      <Platform data={home.platform} />
      <IconGrid eyebrow="Getting started" heading={home.steps.heading} items={home.steps.items} cols={3} tone="card" numbered />
      <Results heading={home.results.heading} items={home.results.items} />
      <Faq items={home.faq.items} />
      <Cta data={home.cta} />
    </Shell>
  );
}
