// Homepage content — mirrors docs/copy/01-homepage.md. [CONFIRM] = needs sign-off before launch.
export const home = {
  hero: {
    headline: "Find out now, not in tomorrow's shift report.",
    sub: "AID-IoT puts a small device on the machines, vehicles and tanks you already run, carries every reading home — even where there is no network — and acts on it before anyone has to. We design the hardware, write the software and run the platform. One team, built in India.",
    cta: "Talk to an engineer",
    ctaNote: "A 30-minute call with the people who build it. No sales deck. Reply within one business day.",
    secondary: "See how it works",
  },
  proof: ["Indian Army", "Ministry of Defence", "IIT Delhi", "IIT Jammu", "BigBasket", "KHub"],
  scenes: {
    heading: "Three ways you find out today.",
    items: [
      { title: "The phone call", body: "The furnace drifted at 2 a.m. The operator noticed at 6. You heard at 7, from someone who heard from someone.", img: "/img/control-room.webp", alt: "Row of electrical control panels in a plant" },
      { title: "The register", body: "Thirty-eight litres of diesel left Depot 4 on a Tuesday. The paper says 195. You will find the gap at month-end, if you find it at all.", img: "/img/tanker-rear.webp", alt: "Rear of a fuel tanker with painted signage" },
      { title: "The silence", body: "The convoy left the last tower at 14:10. Until it reaches the next one, nobody knows where five vehicles are.", img: "/img/trucks-fog.webp", alt: "Trucks on a foggy mountain road" },
    ],
    close: "None of these are people problems. They are signal problems — the data existed; it just never reached you.",
  },
  outcomes: {
    heading: "What changes when the signal gets through.",
    items: [
      { title: "You see it as it happens.", body: "Furnaces, drives, scales, meters and tanks report every reading to one screen — including the ones that were never designed to share.", proof: "IIoT Bridge · IoT Edge Lite" },
      { title: "You see it even where there is no network.", body: "On highways, at border depots and inside secure sites, the record still gets home over a private radio mesh — no SIM, no carrier.", proof: "VMS-O · NavIC CMS · TrackNet" },
      { title: "It acts before you have to.", body: "A missing litre is flagged the moment it goes; a conveyor slows before the scale overloads; an engine will not start for a driver who fails the breath test.", proof: "AID-Fuel · AID-Auto · AidFresh" },
      { title: "It scales without a second vendor.", body: "From one device on one machine to a nationwide rollout, manufactured in India by the team that designed it.", proof: "Signal · manufacturing" },
    ],
  },
  mechanism: {
    heading: "The reason most IoT projects stall — and why ours don't.",
    p1: "A typical deployment has four vendors: one for the device, one for the connectivity, one for the cloud, one for the app. When the readings stop, each of them points at the other three. You end up with a box on the wall and a login nobody uses.",
    p2: "At AID-IoT the same team designs the board, writes the firmware, builds Signal and runs it. There is no hand-off for the problem to fall into. If something breaks, one phone number answers — and the person who answers helped build it.",
    layers: [
      { name: "The device", who: "we design it" },
      { name: "The code inside it", who: "we write it" },
      { name: "The link", who: "we manage it — 4G, Wi-Fi, satellite or a private mesh" },
      { name: "Signal", who: "we run it — in our cloud or on your servers" },
      { name: "The app your team reads", who: "we build it" },
    ],
  },
  steps: {
    heading: "How it starts.",
    items: [
      { title: "Tell us what you run.", body: "A 30-minute call. We ask about machines, vehicles, sites and what you wish you knew sooner.", when: "Week 1" },
      { title: "We fit the first devices and switch on Signal.", body: "One site, no re-wiring; your existing equipment keeps working exactly as before.", when: "Weeks 2–4" },
      { title: "You see it. Then it starts acting.", body: "Live readings first; rules and alerts once you trust the numbers. Roll out to the next site when you are ready.", when: "From week 4" },
    ],
  },
  results: {
    heading: "What it looks like in the field.",
    items: [
      { value: 5000, suffix: "+", label: "SKUs at zero stock variance", detail: "A multi-branch distributor running AID-ERP with per-item freshness labels.", tag: "AID-ERP · client to confirm" },
      { value: 12.4, prefix: "−", suffix: "%", decimals: 1, label: "less fuel on an optimised voyage", detail: "AID-Fuel-Marine advising speed, trim and route from the bridge.", tag: "AID-Fuel-Marine · vessel to confirm" },
      { value: 0, label: "SIM cards to track a whole fleet", detail: "VMS-O on a private mesh, trialled with the Indian Army.", tag: "VMS-O · wording to confirm" },
    ],
  },
  platform: {
    heading: "Signal: the software behind every device we ship.",
    body: "Every AID-IoT device runs on Signal — the platform we wrote to store every reading, run every rule and put the result on any screen. Host it with us, or install it on your own servers so nothing leaves your perimeter. It works with our hardware and, through standard interfaces, with the equipment you already own.",
    modules: [
      { name: "Fleet & fuel", body: "FSMS, DEPOT, RAVEN and QUEST — the applications behind AID-Fuel." },
      { name: "AID-ERP", body: "Inventory, attendance and operations for multi-branch businesses." },
      { name: "TraceCraft", body: "From a circuit-board design file to a milled board in one app." },
    ],
  },
  faq: {
    heading: "Questions executives ask us.",
    items: [
      { q: "Does it work with the machines I already have?", a: "Yes. Our gateways speak the industrial protocols your PLCs, drives, scales and meters already use. Nothing is re-wired." },
      { q: "What if there's no network?", a: "The device keeps its own record and sends it when a link returns — or over a private radio mesh that needs no carrier at all." },
      { q: "Where does my data live?", a: "With us in the cloud, or on your own servers. Defence customers run it fully inside their perimeter." },
      { q: "Who supports it after installation?", a: "The team that built it. One number, one company." },
      { q: "How long to a pilot?", a: "Typically the first site is live within a month of the first call." },
      { q: "Is it really Indian?", a: "Designed in Delhi, manufactured in India, positioned by NavIC — India's own satellite system — where it matters." },
      { q: "Is the software as serious as the hardware?", a: "It is the same team. Signal is written by the people who design the boards." },
    ],
  },
  cta: { heading: "Tell an engineer what you run.", body: "Thirty minutes with the people who build it. If we're not the right fit, you'll hear that too.", note: "Reply within one business day. No newsletter." },
  nav: ["Solutions", "Products", "Software", "Services", "Company"],
  footer: {
    Solutions: ["Manufacturing & plants", "Fleet & fuel", "Defence & secure sites", "Cold-chain & retail", "Smart vending", "Campuses"],
    Products: ["Gateways & edge", "Fleet & fuel", "Tracking & convoy", "Freshness & retail", "Defence systems"],
    Software: ["Signal platform", "Fleet & fuel apps", "AID-ERP", "TraceCraft"],
    Services: ["Product development", "PCB design", "Manufacturing", "Training"],
    Company: ["About", "Why AID-IoT", "Case studies", "Careers", "Contact"],
  },
};
export type Home = typeof home;
