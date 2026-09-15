import { company } from "@/content/pages";
import { home } from "@/content/home";
import { Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Section, Heading } from "@/components/site/section";
import { IconGrid, ProofBar, Results, Cta } from "@/components/site/sections";
export const metadata = { title: "Company — AID-IoT" };
export default function Page() {
  return (
    <Shell>
      <PageHero data={company.hero} crumb={["Home", "Company"]} />
      <ProofBar names={home.proof} />
      <IconGrid id="why" eyebrow="Why AID-IoT" heading={company.why.heading} items={company.why.items} tone="card" />
      <Results heading={home.results.heading} items={home.results.items} />
      <Section tone="card"><span className="eyebrow-dot">Offices</span><Heading className="mt-3">Delhi and Acton.</Heading>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{company.offices.map(([n, a, t]) => <div key={n} className="tile p-5"><h3 className="display text-[19px]">{n}</h3><p className="mt-2 text-[15px] text-muted-foreground">{a}</p><p className="mt-1 text-[15px] font-medium">{t}</p></div>)}</div></Section>
      <Cta data={home.cta} />
    </Shell>
  );
}
