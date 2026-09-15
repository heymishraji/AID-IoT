import { fleet } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Results, Faq, Cta } from "@/components/site/sections";
import { Ledger } from "@/components/site/ledger";
export const metadata = { title: "Fleet & fuel — AID-IoT" };
export default function Page() {
  return (
    <Shell>
      <PageHero data={fleet.hero} crumb={["Home", "Solutions", "Fleet & fuel"]} />
      <IconGrid eyebrow="The problem" heading={fleet.problems.heading} items={fleet.problems.items} tone="card" />
      <PhotoGrid eyebrow="What we deploy" heading={fleet.deploy.heading} items={fleet.deploy.items} tone="default" />
      <Ledger />
      <IconGrid id="how" eyebrow="How it works" heading={fleet.steps.heading} items={fleet.steps.items} numbered />
      <Results heading={fleet.results.heading} items={fleet.results.items} />
      <Faq items={fleet.faq} />
      <Cta data={home.cta} />
    </Shell>
  );
}
