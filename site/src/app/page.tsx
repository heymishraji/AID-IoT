import { home } from "@/content/home";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/hero/hero";
import { ProofBar, Offers, Scenes, Outcomes, Mechanism, Sectors, Steps, Results, Platform, Faq, Cta, Footer } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero data={home.hero} />
        <ProofBar names={home.proof} />
        <Offers data={home.offers} />
        <Scenes data={home.scenes} />
        <Outcomes data={home.outcomes} />
        <Mechanism data={home.mechanism} />
        <Sectors data={home.sectors} />
        <Platform data={home.platform} />
        <Steps data={home.steps} />
        <Results data={home.results} />
        <Faq data={home.faq} />
        <Cta data={home.cta} />
      </main>
      <Footer cols={home.footer} />
    </>
  );
}
