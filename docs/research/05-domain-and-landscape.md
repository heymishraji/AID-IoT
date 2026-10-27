# 05 · Domain and landscape — AID IoT and AID Defense

Researched 27 October 2026. British English. Purpose: give the brand/design-system work factual grounding.

**Evidence labels used throughout**
- **[Crawled]** read directly from aid-iot.com in this session (marketing claims, unverified).
- **[Web]** from a search result in this session (URL given); secondary sources flagged.
- **[Background]** from the researcher's general knowledge, not re-verified in this session. Treat as hypotheses to confirm. Several competitor homepages blocked or returned only titles to the fetch tool, so competitor "look" notes are mostly [Background].

---

## 1. What aid-iot.com says today

### 1.1 Company facts [Crawled: /contact, /]
| Item | Finding |
|---|---|
| Tagline(s) | "Connecting the Dots to Build a Smarter, More Connected World"; "End-to-end IoT solutions combining hardware, software, and cloud intelligence."; "We design, build, and scale intelligent IoT ecosystems"; "production-ready IoT systems that operate reliably at scale—not just prototypes." |
| HQ | BP-5, MLU Plots, DDA, Bindapur, Pocket-3, Dwarka, Delhi 110059 |
| Branch | 7880 22 Sideroad, Acton, ON L7J 2M1, Canada |
| Phones | India +91-9870183306; Canada +1-437-551-5139 |
| Team / registration / certifications | None named or listed anywhere crawled |
| Named collaborators on home | Precision, Jetone, BigBasket, Ministry of Defence, IIT Delhi, IIT Jammu, KHub |
| Case studies | None found (/industries lists none) |
| Nav | Home, What we do, Our Products, Industries, Store, Login, Contact Us. Footer industries: Defence, Industry 4.0, Healthcare, Education |
| Colours / fonts | Not recoverable via the text fetch. Already covered by the earlier crawl in the project (docs/research/current-site-crawl.json, now removed from the working tree; recover via git history if needed). |

Service pillars: Embedded Systems · IoT Hardware Design · Cloud & SaaS Platforms · Data, Analytics & Automation.
Manufacturing page (/industries): "One partner. Every stage of production."; 25+ processes (CNC, injection moulding, SMT/BGA, PCB 2–16+ layers, CAD/CAM/CAE); industries Automotive, Aerospace, Defence, Drone, Construction & Infrastructure; process Feasibility → Quotation → Design → QA → Delivery.

Sitemap (https://www.aid-iot.com/sitemap.xml) shows ~31 main pages plus ~170 electronics-component store SKUs (resistors, ESP32 kits, etc.). The store and education/training pages (drone design, drone pilot, IdeaLab FDP, PCB milling) belong to a very different, hobbyist/academic business. **The store dilutes any defence-grade positioning and should be separated from both new brands.**

### 1.2 Product inventory
**Industrial / commercial (AID IoT candidates)** — URLs under https://www.aid-iot.com/products/…
| Product | What it is [Crawled] |
|---|---|
| IIoT Bridge | Rugged industrial gateway: 4G/2G, Wi-Fi, BLE, Ethernet; RS-232, 2×RS-485, Modbus RTU; CAN/OBD2, GPS optional; 12–24 V DC; edge logging; OTA; MQTT/HTTPS/REST/webhooks. "Hardware controlled 100% in-house — both silicon and firmware." |
| IoT Edge Lite, Ethernet Bridge | Edge compute / Ethernet variants (pages not read in depth) |
| AID-Auto, AidFresh | Industrial vertical products (not read in depth) |
| AID-ERP | ERP with a mobile app (privacy page /privacy/erp-mobile) |
| Dashboard / "Signal" platform | Cloud dashboard referenced by IIoT Bridge; "Signal" name is from the project brief, not seen on the live site |
| Vending machine, PCB design service | Peripheral lines |

**Defence page (AID Defense candidates)** — https://www.aid-iot.com/defence. Headline: "Built in India, for the next battlefield." A sovereign, India-built stack. Claims "Seven systems fielded, with 100% indigenous IP"; "fielded with" the Ministry of Defence and the Indian Army (unverified; no customers named on product pages); built to MIL-STD-810G, AIS-140, IP67, EMI/EMC; "Every command stack runs on the customer's own server, never in the cloud."
| Product | Claim [Crawled] |
|---|---|
| HEAID-K1 | Fixed-wing loitering munition, EO/IR seeker, 40 min, 15 km |
| Tactical quadcopter | ISR, 35 min, 1.5 kg payload, AES-256 comms |
| AID-AD7 Anti-Drone System | Layered counter-UAS: RF detection, GNSS jamming, protocol takeover, kinetic interceptor; 5 km detect / 3 km engage / <2 s reaction |
| AID-RF Drone Detector (D3) | Passive RF, 8 km, 450+ signatures |
| NavIC CMS | Convoy handheld + self-hosted management system |
| VMS-O / VFMS-O | SIM-less offline vehicle tracker / offline fuel monitoring |
| AID-G2 Autonomous Grenade Assist | 40 mm under-barrel smart-fuse module, 400 m |
| X-Band Surveillance Radar | 12 km, 128 targets, open API |
| AID-R5 RCWS-LMG | Remote weapon station with ballistic computer |
| TrackNet | Offline LoRa-mesh person/asset tracking for secure zones, on-prem dashboard, no internet/cloud; 50+ tags per locality |
| AID-Fuel / AID-Fuel-Marine | Defence fuel automation: signed records, edge device, NavIC-timed 1-PPS, 5-year immutable logs; apps FSMS, DEPOT, RAVEN, QUEST |
| Launcher Positioner | Defence-grade dual-axis pedestal (seen on /industries) |

Tech named: AES-256-GCM, TLS 1.3, YubiKey FIDO2, air-gapped, self-hosted; SDR, NavIC/GNSS, LoRaWAN, NB-IoT, mesh, SatCom; YOLO/TensorRT/Jetson; STM32, RTOS, Yocto, FreeRTOS, Spring Boot, MongoDB, Electron.

Caution: the weapons claims (loitering munition, grenade module, RCWS) are a very large leap from a "Dwarka IoT company" with no named defence customers or certifications. These need substantiation before any brand voice claims them, and may carry export-control and licensing implications (see open questions).

### 1.3 What NAVIC and Lighthouse appear to be
**NAVIC** [Crawled: /defence/navic-cms, /defence, /products/defence/aidfuel, /industries]
- It is **not** a standalone product name that AID invented around a concept; on the site it is a **technology prefix** meaning "uses NavIC, India's satellite positioning system". Footer lists "NAVIC" among products; the sitemap holds /defence/navic-cms. Instances: **NavIC CMS** (Convoy Management System), **NavIC VTS** (vehicle tracking with geofencing), "NAVICOBD" (footer, spelling unverified), and NavIC L5 + S-band timing inside AID-Fuel.
- NavIC CMS = "a credit-card sized handheld and self-hosted CMS for secure convoy ops": 5-second tracking, route fencing, formation planning, messaging, SOS, offline maps; NavIC + GPS with a 3-band antenna (L5, S); radios 2G/4G, LoRaWAN, NB-IoT, BLE, SatCom with hot-failover; TLS 1.3 / AES-256-GCM; YubiKey officer login; variants VTS (vehicle mount), Pager (belt clip), Walkie-Talkie (PTT handheld), SatCom. Illustrative claim ±0.6 m.
- Plain reading: **NAVIC is a family of NavIC-based tracking/positioning/timing devices and a convoy management system.** It is "navigation/tracking/GNSS", not maritime per se (a marine fuel product exists separately).

**Lighthouse** — **no mention** on any crawled page (home, /defence, /defence/navic-cms, /industries, product pages), and no external web source linking AID to a "Lighthouse" product was found. The name is therefore **a brief-side/planned name, unverified**. Only inference possible: given NAVIC is positioning/convoy tracking, "Lighthouse" as a solution under it plausibly means a command-and-visibility layer (a fixed beacon/overview that shows where every moving asset is). That is a guess; confirm with the AID team.

---

## 2. Naming context

### 2.1 NavIC [Web unless stated]
- NavIC (Navigation with Indian Constellation; formerly IRNSS) is ISRO's regional satellite navigation system, renamed in 2016; covers India and roughly 1,500 km beyond. Sources: https://www.planetary.org/blogs/guest-blogs/how-india-built-navic.html ; https://www.gktoday.in/navic-system-irnss/ . Expansion of the acronym varies between sources.
- Signals: L5 and S band (first generation); second-generation NVS satellites add L1, compatible with mass-market phone chipsets (https://www.isro.gov.in/pressRelease_NavIC_L1.html — ISRO/Qualcomm L1 chipset platforms).
- Mandates: AIS-140 (MoRTH vehicle location tracking spec; GPS and NavIC; ARAI/ICAT certification; panic button; certified backend). Gazette 28 Nov 2016; fleets-compliance deadlines vary by source (a vendor blog says 31 Mar 2026 for older commercial vehicles — verify with MoRTH). ISRO training deck says ARAI/ICAT certified NavIC AIS-140 products from 100+ companies (https://www.unoosa.org/documents/pdf/icg/2022/Tokyo2022/NavIC_GNSS_Training2022.pdf ; https://blog.fleetx.io/blog-ais140-guide/ ).
- Smartphones: reported government plan to require NavIC support in 5G phones from 1 Jan 2025 and others from Dec 2025; enforcement **unconfirmed** (https://www.outlookbusiness.com/news/navic-vs-gps-what-is-navic-why-india-wants-apple-samsung-others-to-make-changes-in-their-smartphones-gps-navigation-news-226154 ).
- Fishing vessels: NavIC messaging receivers trialled on Kerala boats; NewSpace India MSS-terminal programme for ~1 lakh boats reported (https://www.maritimegateway.com/isro-to-set-up-satellite-terminals-on-fishing-boats-in-13-coastal-states/ ; secondary press).
- **Constellation health (secondary sources, conflicting; verify with ISRO):** a March 2026 summary claims IRNSS-1F's last clock failed and only 3 satellites provide navigation versus 4 needed; NVS-02 reportedly stuck in transfer orbit since Jan 2025 (https://www.legacyias.com/navic-irnssindia-gps-satellite-navigation-upsc-notes/ , https://anantamias.com/navic-vs-gps-vs-galileo-vs-beidou/). **If true, a brand built on "sovereign NavIC accuracy" carries reputational and factual risk; claims like "T-fix in 4 s" and "±0.6 m" need qualification (multi-GNSS fallback).**

### 2.2 Trademark and confusion risk with "NAVIC"
- No trademark registration for "NavIC" was found by search; status must be checked on the Indian Trade Marks Registry (IP India) and WIPO. [Web: no result]
- Risk factors [Background/inference]: (a) NavIC is a government/ISRO system name, and use as a product name suggests endorsement or official status; (b) Section 9/11-type objections ("devoid of distinctive character" / descriptive for navigation devices) make a registrable mark unlikely; (c) existing vendors already use "NavIC" descriptively (Accord's "ACC-GPS-NavIC-NANO", ISRO-certified AIS-140 devices), so search results and SEO collide; (d) the system's reputation (clock failures, delays) attaches to the product name.
- Recommendation: use NavIC as a **capability descriptor** ("NavIC-enabled") not the brand. Give the product line its own coined name and say "multi-constellation, NavIC-ready". If "NAVIC" stays, seek written clarity from ISRO/NSIL on naming and obtain trademark counsel's opinion.

### 2.3 "Lighthouse" collisions
- **Directorate General of Lighthouses and Lightships (DGLL), Government of India** — a real regulator of aids to navigation (https://www.dgll.nic.in/sites/default/files/2023-09/EOI.pdf; a DGLL tender sought a NavIC-based monitoring system for deep-sea buoys). Directly relevant: a maritime customer already lives in this vocabulary, which helps and confuses.
- **Google Lighthouse** — open-source web performance/accessibility audit tool; dominates search results [Background]. Also Lighthouse (Lighthouse Labs bootcamp, Lighthouse Reports, various SaaS/hospitality products using "Lighthouse") [Background].
- No defence product named "Lighthouse" turned up from Anduril, Saab, Thales, Leonardo in this search [Web] — but that was a thin search; run a proper TM search in Class 9, 42, 45 and a DPIIT/IP India check. The metaphor is also widely used in maritime/ISR marketing, so differentiation will be weak.
- Positive: lighthouse = fixed, trusted, visible-from-afar, guides safe passage; works as a metaphor for a command layer. Risk: cliché imagery (beam of light on dark sea).

---

## 3. Competitive and aspirational landscape

Method note: homepage fetches were largely text-only or blocked (Anduril returned only a title; Helsing returned HTTP 429). Visual descriptions below are [Background] unless noted. Verify with live screenshots before relying on them.

### 3.1 IoT
| Company | Positioning (verified where marked) | Look and tone | Site structure |
|---|---|---|---|
| Samsara | "Operator grade. Proven in the field." / "The platform built with operators…" [Crawled-today] | Field photography of workers; dark-mode map product shots with orange route line; uppercase micro-labels; short imperative copy; heavy metrics | Products by category (cameras, telematics, equipment, workforce, platform); Solutions by outcome and industry; Resources, Pricing, Customer stories, App Marketplace [Crawled-today] |
| Particle | "IoT platform / Device OS" developer-led [Background] | Light, friendly, developer docs-forward, bright blue/teal | Platform, hardware (modules), pricing, docs |
| Siemens Xcelerator / MindSphere | Industrial digital ecosystem [Background] | Teal/petrol corporate, large stock imagery, enterprise voice | Portfolio-heavy, industry mega-nav |
| Bosch IoT | Connected-tech from a manufacturer [Background] | Engineering sober, red/blue Bosch palette | Solutions + developer sections |
| Tata Communications IoT / Tata Elxsi | Telco-grade IoT connectivity / design engineering [Background] | Corporate Tata blue, people-and-city photography | Solutions by industry, case studies |
| Hitachi Vantara | Data/industrial AI [Background] | Corporate, red-black | Solutions, resources |
| Losant | Enterprise IoT application platform [Background] | Clean SaaS, product UI forward | Platform, solutions, docs |
| Blues, Hologram | Developer-first cellular IoT (Notecard; connectivity) [Background] | Hardware-hacker tone, tidy diagrams, docs-led | Product, docs, pricing |
| Telit Cinterion, u-blox, Quectel | Modules/chipsets for OEMs [Background] | Datasheet culture; blue/teal; spec tables; product-selector | Product finder by technology, downloads |
| Indian: Zenatix (energy/HVAC), Tagbox (tagging/locks), iTriangle (telematics), Minda (auto electronics), Mappls/MapmyIndia (maps, tracking, NavIC-compatible devices), Lumel (instrumentation), Ambee (environmental data) [Background] | Mostly vertical solutions with conventional corporate sites | Blue/white, stock imagery, long feature lists | Product + industry + contact |

**Pattern:** global IoT leaders sell outcomes with real operator photography and live-product UI; component vendors sell spec tables. Indian players rarely show product craft or a coherent design system.

### 3.2 Global new-generation defence [mostly Background]
| Company | Positioning | Look and tone |
|---|---|---|
| Anduril | "Transforming U.S. Defense Capabilities with Advanced Technology" [Crawled-today title only]; Lattice software + autonomous systems | Hard-edged, monochrome, hero product renders and film, bold sans, mission names; stylised "garage-to-fielded" swagger |
| Palantir (defence) | Software that connects data to decisions | Minimal black/white, sober, large type, product-in-context screenshots |
| Shield AI | "Hivemind" AI pilot | Dark, aviation photography, technical but accessible |
| Helsing | European AI defence, "defend democracy" framing | Muted dark, serif/editorial touches, ethical-values language (page blocked in this session) |
| Saronic | Autonomous maritime vessels | Dark naval imagery, big declarative lines |
| Skydio | Autonomous drones (also enterprise/public safety) | White/clean, product-led, more commercial than martial |
| Epirus, Hadrian, Chaos Industries | High-power microwave counter-UAS; factory-automation for defence manufacturing; radar | Dark, industrial, "arsenal of democracy" scale rhetoric, hiring-led pages |

### 3.3 Legacy primes [Background]
Lockheed Martin, BAE Systems, Thales, Saab, Rafael, Elbit: corporate navy/blue/grey, helmet-and-hardware photography, capability taxonomy by domain (air/land/sea/space/cyber), long portfolio pages, press and investor sections, heavy compliance footers. Tone is institutional, third-person, "trusted partner".

### 3.4 Indian defence
| Company | Notes |
|---|---|
| BEL, HAL | PSUs: dense portals, tricolour/navy, formal; credibility from decades, ISO/CEMILAC/DGAQA mentions |
| Tata Advanced Systems, L&T Defence, Adani Defence & Aerospace, Mahindra Defence | Conglomerate branding; project-led case pages |
| ideaForge | UAV maker; text-only fetch showed nav: Careers, Partner, Resources (Blogs, Case Studies, Whitepapers), plain corporate tone, no certifications visible [Crawled-today]. Listed company with defence/homeland UAV |
| Tonbo Imaging | EO/IR imaging, global export; dark, product-led [Background] |
| Zen Technologies, Paras Defence | Training simulators / optics; conventional corporate [Background] |
| NewSpace Research, Data Patterns, Alpha Design | UAS / radar & electronics / defence electronics [Background] |
| Accord Software & Systems | Positioning/timing business area: GNSS modules (Navika series), NavIC receiver "ACC-GPS-NavIC-NANO", ICs; "Inspired to be Innovative"; "trusted brand", 30+ years; nav: Company, Business Areas, Products, Quality, News, Careers, Downloads, Contact; cards for Defence, Space, Industrial, Semiconductors, Test Instruments [Crawled-today: https://www.accord-soft.com]. **Closest direct comparator for NAVIC hardware.** |

**Pattern:** Indian defence sites skew institutional (tricolour and navy, formal) or startup-ish text pages. Very few show polished product storytelling or a modern design system. This is a gap.

---

## 4. Audience and buying context

### 4.1 IoT buyers
| Segment | Who decides | What they need to see |
|---|---|---|
| Enterprise ops / manufacturing | Plant head, operations/IT, procurement | Integration with PLC/SCADA, uptime, ROI, pilots; protocol list (Modbus, MQTT, OPC-UA); security model; reference sites |
| Utilities / smart cities | Utility/state agency via tenders (GeM, state e-procurement) | BIS/TEC/STQC certificates, local support, SLAs, data residency |
| Fleet/transport | Fleet owners, state transport | **AIS-140 / ARAI-ICAT certification** is table stakes |
| OEMs | Engineering leads | Datasheets, SDKs, sample kits, lead times, NDA/IP terms |

### 4.2 Defence buyers [Web/Background]
- Procurement: Defence Acquisition Procedure 2020 currently governs; a **draft DAP 2026** was released for comment in Feb 2026 and is intended to replace it (https://www.jsalaw.com/?p=57306 ; https://www.outlookbusiness.com/deeptech/decoding-the-draft-defence-acquisition-policy-whats-hot-whats-not). DAP 2020 introduced the import-embargo list, 50% Indian-ownership "Indian Vendor" test and Buy (Global-Manufacture in India); the draft emphasises Buy (Indian-IDDM) and IP ownership ("Owned by India"). **Confirm whether DAP 2026 has since been notified** and its category rules.
- Channels: iDEX/ADITI (MoD innovation scheme with its own iDEX pavilion at Aero India, per https://static.pib.gov.in/… 2025 release), DRDO TDF, Make-II, emergency procurement, service-specific trials. Buyers: Indian Army/Navy/Air Force, Coast Guard, CAPFs/state police, DRDO labs, DPSUs, MoD.
- Credibility signals: indigenous content (IDDM) declarations; DRDO/CEMILAC/DGAQA/DGQA approvals; ISO 9001, AS9100 (aerospace), CMMI for software, ISO 27001; MIL-STD-810 and MIL-STD-461 test reports; IP ratings; STQC/CERT-In audits; BIS; ARAI for AIS-140; defence licence under Industrial (Development and Regulation) Act and export-control (SCOMET) compliance; named field trials; iDEX winner status; founder/engineer track record. The current site states MIL-STD-810G etc. without certificates — a credibility gap.
- Buying behaviour: slow, trial-driven, relationship and compliance-heavy; specification-sheet and demonstration led; buyers are cautious about "AI-startup swagger" but respond to indigenous capability, self-hosted/air-gapped control, and field proof.

### 4.3 Trade shows and collateral
- Aero India: biennial, Yelahanka Air Force Station, Bengaluru; 2025 edition 10–14 Feb with 900+ exhibitors incl. an iDEX pavilion; next edition expected ~2027, dates unconfirmed (https://www.tribuneindia.com/news/defence/asias-largest-air-show-aero-india-2025-set-to-take-off-on-february-10-in-bengaluru/amp ; https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/feb/doc202528497401.pdf). DefExpo: land/naval show, irregular schedule — **dates unverified**. IoT India Expo, Elecrama: **not verified in this session**.
- Standard formats [Background — confirm with AID's print vendor]: A4 tri-fold or 4–8 page brochure per product; single-sheet A4 spec sheet (landscape or portrait, table-heavy); corporate capability statement; 3×6 ft or 6×2.5 ft roll-up/standee; shell-scheme stall back-wall (e.g. 3 m × 3 m or 3 m × 2.4 m); visiting card; pamphlet/leaflet (A5/DL); 16:9 deck for meetings; demo videos on loop; QR to datasheets; USB kit for tender submissions. The brand system should include a spec-sheet template, a capability statement, a standee and a deck template.

---

## 5. Synthesis

### 5.1 Whitespace
**AID IoT**
- Between spec-sheet component vendors and glossy global platforms there is room for a **"engineered and manufactured in India" end-to-end** story: hardware + firmware + software + cloud + manufacturing, with real craft evidence (silicon-to-firmware control claim, IIoT Bridge). Show real product and process; avoid generic network-node art.
- Credible, plain-language outcomes for non-IT executives, with the engineering detail one level down (project rule).
- Visible proof system: protocols supported, test results, deployments with numbers.

**AID Defense**
- A *sovereign, self-hosted, jam-resistant* proposition (air-gapped, own server, offline-first, NavIC-aware multi-constellation) is distinctive and fits Atmanirbhar Bharat and DAP's IP-ownership direction. Global peers shout "autonomy" and "AI"; the Indian market lacks a calm, technically exacting, design-led challenger.
- Tone: composed, evidence-led, operator-respecting. Closer to Palantir's restraint plus Samsara's operator language than to Anduril's swagger, adapted for Indian institutions.

### 5.2 How the two brands relate
Options: (a) one parent with two sub-brands, (b) fully separate brands.
- Shared: engineering platform (edge hardware, firmware, secure telemetry, NavIC/GNSS, LoRa), factory, legal entity, typographic and component foundations.
- Separate: market, trust model (commercial SaaS vs. self-hosted classified-adjacent), tone, imagery, domain, and risk (weapons categories vs. enterprise reputation; export control; some enterprise customers may avoid a defence-linked brand and vice versa).
- Recommendation: **endorsed-brand architecture** — shared logo family and design tokens/foundations (type scale, grid, components, motion principles), distinct colour/tone/imagery systems, and a quiet "an AID company" endorsement line. Keep the defence domain and collateral separate (e.g. defence subdomain or separate site), and move the electronics store off both brands.

### 5.3 Clichés to avoid
| Sector | Avoid |
|---|---|
| IoT | Navy + orange glow + device-on-gradient; glowing network meshes and floating hexagons; hands touching holographic cities; "smart" light-bulb/WiFi icons; generic bento; stock "engineer with tablet" |
| Defence | Camouflage, crosshairs/reticles, black-and-red "threat" aesthetic, jet silhouettes, tricolour wash, "Rambo" rhetoric, fake-cinematic HUD overlays and green night-vision glows, beams-of-light-over-sea for Lighthouse, weapon hero shots that read as gun-catalogue |
| Both | Claims without proof; AI buzzwords; fake map dots; unlabelled numbers |

---

## Implications for AID
1. **Treat NAVIC as a capability descriptor, not a trademark.** The live site already uses it that way. Pick a coined product-family name; run trademark clearance; and phrase positioning as "multi-constellation, NavIC-ready" to avoid exposure if NavIC's constellation is degraded (to be checked with ISRO).
2. **Lighthouse is unproven in AID's material.** Confirm what it is before designing for it; search collisions (Google Lighthouse, DGLL) argue for a distinguishing descriptor, e.g. "Lighthouse Command".
3. **Credibility is the binding constraint in defence.** The site's claims (seven fielded systems, MIL-STD, MoD/Army) have no named customers or certificates. The design system needs components for proof: certification badges, test-report excerpts, trial logs, "fielded since" data, only when each is true.
4. **Separate the store/education business** from both brands; it currently confuses the proposition.
5. **Build a collateral-first brand system**: spec sheet, brochure, capability statement, standee, deck, plus web.
6. **Design stance:** IoT = warm-engineered, craft and outcome; Defense = composed, offline-first, evidence-led. Share foundations, diverge in colour and imagery.
7. **Differentiator hooks to design around:** "100% in-house silicon-to-firmware" (IoT); "your command stack runs on your own server" (Defense).

## Open questions for the AID team
1. What exactly are **NAVIC** and **Lighthouse** in your intended architecture? Is Lighthouse a software/command layer under NAVIC? Is NAVIC meant to be a brand or a product line?
2. Is any trademark filed for AID, AID IoT, AID Defense, NAVIC, Lighthouse (Classes 9, 12, 42, 45)? Who owns the IP (Indian entity vs. Canadian branch)?
3. Which defence claims are real today: "seven systems fielded", MoD/Army deployments, iDEX status, MIL-STD-810G reports, AIS-140 certification (ARAI/ICAT certificate numbers)? Which customers can be named?
4. Which certifications are held or in progress: ISO 9001, AS9100, CMMI, ISO 27001, CEMILAC/DGAQA, defence manufacturing licence, SCOMET/export approvals?
5. Weapon-category products (HEAID-K1, AID-G2, RCWS): are these real programmes, prototypes, or aspirational? This affects tone, legal exposure and whether they appear at all.
6. Legal/corporate structure: one entity or two? Is the Canada branch operational, and does it serve the IoT or defence line?
7. NavIC constellation status and your fallback (multi-GNSS) — what do your devices use when NavIC geometry is insufficient?
8. Which trade shows are in the 2027 plan (Aero India, DefExpo, IoT India Expo, Elecrama), and what are the stall sizes and print vendors' standards?
9. What is "Signal" exactly in the IoT line today (live dashboard name?), and who are the paying IoT customers (Precision, Jetone, BigBasket)?
10. Verify current DAP status (2020 vs 2026) and any change to indigenous-content thresholds with your defence consultant.
11. Competitor looks in section 3 are largely from background knowledge; capture live screenshots/benchmarks before final directions (earlier benchmark JSON in git history may help).

## Next steps (and why)
1. Answer open questions 1–5 — they decide naming and what the brand may truthfully claim.
2. Commission trademark clearance for NAVIC/Lighthouse — cheap now, expensive after design is built.
3. Capture visual benchmarks (live screenshots) of 8–10 listed competitors — replaces [Background] notes with evidence before choosing directions.
