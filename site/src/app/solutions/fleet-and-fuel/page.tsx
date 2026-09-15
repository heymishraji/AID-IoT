import { fleet } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { IconGrid, PhotoGrid, Results, Faq, Cta } from "@/components/site/sections";
import { Ledger } from "@/components/site/ledger";
export const metadata = { title: "Fleet & fuel — AID-IoT", description: "Every litre accounted for and every vehicle located, even with no signal. AID-Fuel, VMS-O and VFMS-O with the Signal platform." };
export default function Page() {
  return (
    <Shell>
      <PageHero data={fleet.hero} crumb={["Home", "Solutions", "Fleet & fuel"]} />
      <IconGrid heading={fleet.problems.heading} items={fleet.problems.items} tone="card" />
      <PhotoGrid heading={fleet.deploy.heading} items={fleet.deploy.items} tone="default" />
      <Ledger />
      <IconGrid id="how" heading={fleet.steps.heading} items={fleet.steps.items} numbered variant="rows" lead="From the nozzle to the supervisor’s phone." />
      <Results heading={fleet.results.heading} items={fleet.results.items} />
      <Faq items={fleet.faq} />
      <Cta data={home.cta} />
    </Shell>
  );
}
