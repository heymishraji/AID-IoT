import { home } from "@/content/home";
import { company } from "@/content/pages";
import { Shell } from "@/components/site/shell";
import { Section, Heading } from "@/components/site/section";
import { Cta } from "@/components/site/sections";
export const metadata = { title: "Contact — AID-IoT", description: "Talk to an engineer. Reply within one business day." };
export default function Page() {
  return (
    <Shell>
      <div className="pt-[68px]" />
      <Cta level={1} data={{ heading: "Talk to an engineer.", body: "Tell us what you operate and what is going wrong. You'll hear from an engineer — not a sales desk — within one business day.", note: home.cta.note }} />
      <Section><Heading>Or reach us directly.</Heading><div className="mt-8 grid gap-4 md:grid-cols-3">{company.offices.map(([n, a, t]) => <div key={n} className="tile p-5"><h3 className="display text-[19px]">{n}</h3><p className="mt-2 text-[15px] text-muted-foreground">{a}</p><p className="mt-1 font-medium">{t}</p></div>)}<div className="tile p-5"><h3 className="display text-[19px]">Email</h3><p className="mt-2 font-medium">hi@aid-iot.com</p></div></div></Section>
    </Shell>
  );
}
