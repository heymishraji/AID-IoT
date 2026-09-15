// Homepage content, v2 — visual-first. Short lines; detail lives on inner pages. [CONFIRM] = needs sign-off.
export const home = {
  hero: {
    headline: "Find out now, not in tomorrow's shift report.",
    sub: "A small AID-IoT device on the machines, vehicles and tanks you already run — reporting every reading home and acting before anyone has to. Hardware, software and platform from one team, built in India.",
    cta: "Talk to an engineer", ctaNote: "30 minutes with the people who build it. Reply within one business day.", secondary: "See what we do", secondaryHref: "#offers",
  },
  proof: ["Indian Army", "Ministry of Defence", "IIT Delhi", "IIT Jammu", "BigBasket", "KHub"],
  offers: {
    heading: "Four ways we help.",
    items: [
      { key: "solutions", href: "/solutions/fleet-and-fuel", icon: "Compass", title: "Solutions", line: "Fix a specific operational blind spot, by sector.", img: "/img/rail-tankers.webp", links: ["Manufacturing & plants", "Fleet & fuel", "Defence & secure sites", "Cold-chain & retail", "Smart vending", "Campuses"] },
      { key: "products", href: "/products/iiot-bridge", icon: "Cpu", title: "Products", line: "Field-proven devices you can buy today.", img: "/img/iiot-bridge.webp", links: ["Gateways & edge", "Fleet & fuel devices", "Tracking & convoy", "Freshness & retail", "Defence systems"] },
      { key: "software", href: "/software/signal", icon: "Layers", title: "Software", line: "Signal — the platform behind every device.", img: "/img/tracknet-dashboard.webp", links: ["Signal platform", "Fleet & fuel apps", "AID-ERP", "TraceCraft"] },
      { key: "services", href: "/services", icon: "Wrench", title: "Services", line: "We design, build and manufacture yours.", img: "/img/soldering.webp", links: ["Product development", "PCB design", "Manufacturing in India", "Training"] },
    ],
  },
  scenes: {
    heading: "How you find out today.",
    items: [
      { icon: "PhoneCall", title: "The phone call", line: "The furnace drifted at 2 a.m. You hear at 7.", img: "/img/control-room.webp", alt: "Electrical control panels" },
      { icon: "ClipboardList", title: "The register", line: "38 litres left Depot 4. The paper says 195.", img: "/img/tanker-rear.webp", alt: "Fuel tanker" },
      { icon: "WifiOff", title: "The silence", line: "Five vehicles between towers. Nobody knows where.", img: "/img/trucks-fog.webp", alt: "Trucks on a foggy road" },
    ],
    close: "The data existed. It just never reached you.",
  },
  outcomes: {
    heading: "What changes when the signal gets through.",
    items: [
      { icon: "Eye", title: "See it as it happens", line: "Every machine, on one screen, live.", products: [["IIoT Bridge", "/img/iiot-bridge.webp"], ["IoT Edge Lite", "/img/edge-device.webp"]] },
      { icon: "RadioTower", title: "See it with no network", line: "Private mesh. No SIM. Record gets home.", products: [["VMS-O", "/img/convoy-india.webp"], ["NavIC CMS", "/img/navic.webp"], ["TrackNet", "/img/tracknet-tag.webp"]] },
      { icon: "Zap", title: "It acts before you do", line: "Drains flagged. Conveyors slowed. Engines locked.", products: [["AID-Fuel", "/img/aidfuel-hardware.webp"], ["AID-Auto", "/img/aid-fuel.webp"], ["AidFresh", "/img/forklift-pallets.webp"]] },
      { icon: "Factory", title: "Scale without a second vendor", line: "One device to a national rollout, made in India.", products: [["Signal", "/img/pcb-hero.webp"], ["Manufacturing", "/img/soldering.webp"]] },
    ],
  },
  mechanism: {
    heading: "Why most IoT projects stall, and ours don't.",
    line: "A typical deployment has four vendors and three hand-offs. Ours has one team.",
    typical: ["Device vendor", "Connectivity vendor", "Cloud vendor", "App vendor"],
    layers: [
      { icon: "Box", name: "Device", who: "we design" },
      { icon: "Code2", name: "Firmware", who: "we write" },
      { icon: "Radio", name: "Link", who: "we manage" },
      { icon: "Cloud", name: "Signal", who: "we run" },
      { icon: "Smartphone", name: "App", who: "we build" },
    ],
  },
  sectors: {
    heading: "Built for the sectors that can't afford blind spots.",
    items: [
      { icon: "Factory", title: "Manufacturing & plants", line: "Every machine live, no re-wiring.", img: "/img/sparks.webp" },
      { icon: "Fuel", title: "Fleet & fuel", line: "Every litre and vehicle accounted for.", img: "/img/rail-tankers.webp" },
      { icon: "Shield", title: "Defence & secure sites", line: "Indigenous. Offline. Inside your perimeter.", img: "/img/truck-mountain.webp" },
      { icon: "Snowflake", title: "Cold-chain & retail", line: "First to expire, first to leave.", img: "/img/forklift-warehouse.webp" },
      { icon: "ShoppingBag", title: "Smart vending", line: "Cashless, stock-aware, one screen.", img: "/img/vending-photo.webp" },
      { icon: "GraduationCap", title: "Campuses & education", line: "Drones, PCBs and IoT, hands-on.", img: "/img/edu-lab.webp" },
    ],
  },
  steps: {
    heading: "How it starts.",
    items: [
      { icon: "MessageSquare", title: "Tell us what you run", line: "A 30-minute call.", when: "Week 1" },
      { icon: "Plug", title: "We fit the devices, switch on Signal", line: "One site. No re-wiring.", when: "Weeks 2–4" },
      { icon: "Eye", title: "You see it, then it acts", line: "Roll out when you're ready.", when: "From week 4" },
    ],
  },
  results: {
    heading: "Numbers from the field.",
    items: [
      { value: 5000, suffix: "+", label: "SKUs at zero stock variance", tag: "AID-ERP · client to confirm" },
      { value: 12.4, prefix: "−", suffix: "%", decimals: 1, label: "fuel on an optimised voyage", tag: "AID-Fuel-Marine · vessel to confirm" },
      { value: 0, label: "SIM cards to track a whole fleet", tag: "VMS-O · Indian Army trials" },
    ],
  },
  platform: {
    heading: "Signal. The software behind every device we ship.",
    line: "Every reading stored, every rule run, every result on any screen — in our cloud or on your servers.",
    modules: [["Fleet & fuel apps", "FSMS · DEPOT · RAVEN · QUEST"], ["AID-ERP", "Inventory, attendance, operations"], ["TraceCraft", "Design file to milled board"]],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "Does it work with the machines I already have?", a: "Yes. Our gateways speak the industrial protocols your PLCs, drives, scales and meters already use. Nothing is re-wired." },
      { q: "What if there's no network?", a: "The device keeps its own record and sends it when a link returns — or over a private radio mesh that needs no carrier at all." },
      { q: "Where does my data live?", a: "With us in the cloud, or on your own servers. Defence customers run it fully inside their perimeter." },
      { q: "Who supports it after installation?", a: "The team that built it. One number, one company." },
      { q: "How long to a pilot?", a: "Typically the first site is live within a month of the first call." },
      { q: "Is it really Indian?", a: "Designed in Delhi, manufactured in India, positioned by NavIC — India's own satellite system — where it matters." },
    ],
  },
  cta: { heading: "Tell an engineer what you run.", body: "Thirty minutes with the people who build it. If we're not the right fit, you'll hear that too.", note: "Reply within one business day. No newsletter." },
  footer: {
    Solutions: ["Manufacturing & plants", "Fleet & fuel", "Defence & secure sites", "Cold-chain & retail", "Smart vending", "Campuses"],
    Products: ["Gateways & edge", "Fleet & fuel devices", "Tracking & convoy", "Freshness & retail", "Defence systems"],
    Software: ["Signal platform", "Fleet & fuel apps", "AID-ERP", "TraceCraft"],
    Services: ["Product development", "PCB design", "Manufacturing", "Training"],
    Company: ["About", "Why AID-IoT", "Case studies", "Careers", "Contact"],
  },
};
export type Home = typeof home;
