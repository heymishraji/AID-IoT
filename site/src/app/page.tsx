import { home } from "@/content/home";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/hero/hero";
import { ProofBar, Scenes, Outcomes, Mechanism, Steps, Results, Platform, Faq, Cta, Footer } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero data={home.hero} />
        <ProofBar names={home.proof} />
        <Scenes data={home.scenes} />
        <Outcomes data={home.outcomes} />
        <Mechanism data={home.mechanism} />
        <Steps data={home.steps} />
        <Results data={home.results} />
        <Platform data={home.platform} />
        <Faq data={home.faq} />
        <Cta data={home.cta} />
      </main>
      <Footer cols={home.footer} />
    </>
  );
}
