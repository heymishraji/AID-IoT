# 09 · Multi-product clarity and multi-brand systems: exemplars for AID

Research for Inordinate Industrial Innovation Pvt Ltd (legal parent) and its two brands, **AID IoT** and
**AID Defence**. Written 27 October 2026. British English.

**Question.** How do companies with many products, or several brands under one parent, stay clear? Which of
their devices should AID adapt (not copy) to organise a large, mixed IoT portfolio, present a few sensitive
defence systems, and decide what the legal parent shows?

**Evidence labels.**
- **[Fetched]**: the page was fetched during this session (WebFetch, or curl text and JSON extraction for
  JavaScript-rendered sites). Quotes are verbatim from that fetch.
- **[Search]**: confirmed through search results or secondary sources found in this session. The primary page
  was not fetched.
- **[Background]**: prior knowledge, not checked this session. Re-check before relying on it.

Several sites blocked or emptied automated fetches. Vercel and Notion returned 403. Palantir and Anduril render
in JavaScript only, so for them I read the sitemaps and the page JSON instead. The Atlassian rebrand post URL
returned 404.

Related reading: `03-token-architecture-multibrand.md` (how to build the shared engine) and
`05-domain-and-landscape.md` (the current AID product inventory and the naming collisions for NAVIC and
Lighthouse).

---

## 0. Summary

1. **Everyone who is clear uses two or three axes, never one.** One axis is *what it is* (product families). The
   others are *who it is for* (industries or company size) and *what it achieves* (outcomes). Stripe, Samsara,
   Twilio, Ramp and Datadog all keep these axes apart in the navigation. AID's current list mixes all three in a
   single flat list.
2. **A named spine ties many products together.** Anduril's spine is Lattice ("tasked, connected and controlled by
   Lattice"). The others are Samsara Platform, Rippling's shared data foundation, Palantir's Ontology and Siemens
   Xcelerator. AID IoT needs one named platform that every device reports into. AID Defence already has a
   candidate in Lighthouse.
3. **Name a product with a short job description before its name.** Examples: Cloudflare "Workers: Global
   serverless functions", Samsara "Fleet Telematics: Real-time GPS, routing, fuel, compliance", Google Workspace
   "Gmail: Custom business email". Senior non-technical readers understand the job, and the name follows.
4. **Coin names sparingly and systematically.** Coined names go to the spine and to a few hero systems (Lattice,
   Gripen, Orbis). Everything else gets a descriptive name, and the model codes stay at datasheet level (Samsara
   heads the page "Vehicle Gateway" and shows "VG55" only on the datasheet link).
5. **House-of-brands parents stay quiet.** Alphabet, Booking Holdings and Hyundai Motor Group publish a lean
   corporate site for investors, governance and careers, with plain links out to the brands. Brands reach the
   parent through a legal line, not shared visuals.
6. **Defence sites disclose in layers.** They group by domain, then mission, then system (Anduril, Saab, GE
   Aerospace Defense). They publish shape, purpose and headline facts, and keep performance for the briefing room
   (Saab's Gripen page gives the dimensions and thrust but no range or radar figures).
7. **The shared engine is a token tier, not a look.** Adevinta's Spark keeps brand folders over a three-tier token
   model and selects one brand per build, which matches AID's "export each brand to its own repo" requirement.

---

## 1. Group 1: one brand, many products

### 1.1 Exemplar table

| # | Company · URL | Structural device | What makes it clear | Distinctive | Relevance for AID |
|---|---|---|---|---|---|
| 1 | **Stripe**: https://stripe.com, https://docs.stripe.com, https://stripe.com/payments [Fetched] | Two-axis navigation: **Products** (31 products, plain names such as Payments, Billing, Radar, Terminal) and **Solutions** (by stage: Enterprises, Startups, Platforms; by use case: E-commerce, Marketplaces, SaaS; by industry: Retail, Public sector…). In the docs, products are grouped into **Payments · Revenue · Risk · Data · Embedded finance · Money management · Prebuilt components**, and **task-first entry points** come first ("Accept payments online", "Sell subscriptions"). | The homepage sells **six jobs** ("Accept and optimise payments globally", "Enable any billing model"…), not 31 products. Product pages follow a fixed spine: hero, value props, logos, anchor nav, capability sections with live UI mockups, proof numbers, developer section, "How it works", pricing, and cross-sell to sibling products (Billing, Connect). | The homepage proof is a **stats band**: "135+ currencies", "99.999% historical uptime". Every product page states **sibling relationships** (Checkout, Elements and Payment Links are "ways to accept online payments"). | Group many products into **6–8 jobs** on the homepage. Give every product page the same spine and a "works with" row. Docs and knowledge pages should route by task first, product second. |
| 2 | **Stripe Press**: https://press.stripe.com [Fetched] | An **editorial imprint** with its own look ("Ideas for progress"), endorsed by the Stripe legal line and people (the footer reads "© 2026 Stripe, LLC"). | The imprint is kept apart from the product site, so it builds authority without selling. | A brand within the brand that has a different visual register. | Later, AID IoT could run a small "Field notes" imprint (problem write-ups and engineering stories). It earns trust with Indian industrial buyers without inflating product claims. Low priority. |
| 3 | **Samsara**: https://www.samsara.com, https://www.samsara.com/products/models/vehicle-gateway [Fetched] | **Five product families, each with a three-part descriptor**: Cameras and Video ("AI dash cams, site security, in-cab alerts"), Fleet Telematics ("Real-time GPS, routing, fuel, compliance"), Equipment Management, Workforce Management, and Samsara Platform ("Open platform, workflows & reporting, AI that acts"). **Solutions by outcome**: Safety & Risk, Security, Compliance, Efficiency, Sustainability. **Industries**: Public Sector, Construction, Transportation & Logistics, Field Services, Food & Beverage, Passenger Transit. | The H1 on a hardware page is the **descriptive name** ("Vehicle Gateway"). The **model code (VG55, VG55-FN) appears only on the datasheet links**. The breadcrumb reads "Products / All Hardware / Vehicle Gateway". The page order is overview, how it works, specs (grouped: Data Inputs, Wireless Connectivity, Power, Enclosure), installation, accessories, platform cards, then "Talk to sales". | Positioning line: "Operator grade. Proven in the field." | **The closest analogue to AID IoT** (trackers, gateways, cameras, cold chain, platform). Copy the three axes and the descriptor pattern. Use the "descriptive H1, model code on the datasheet" rule. |
| 4 | **Datadog**: https://www.datadoghq.com/product/ [Fetched] | Seven categories, each with a one-line promise: Observability, Security, Digital Experience, Software Delivery, Service Management, AI, and **Platform Capabilities** ("Built-in features & integrations that power the Datadog platform"). Some products appear under **more than one category**. | Each category explains itself in one line. Listing products in several places tells the reader there is one shared platform. | It splits "AI for Datadog" from "Datadog for AI" (AI inside the product versus monitoring AI). | Allow **one product in several families** where the buyer would look for it (for example, OBD under both Fleet and Cold chain). It makes the shared platform credible. |
| 5 | **Rippling**: https://www.rippling.com [Fetched] | Modules grouped by function (HCM, IT, Payroll, Finance, Global), with a separate **Platform** menu (Workflow Studio, Analytics, Policies, Permissions, Integrations, App Studio). The homepage reads "Start with the apps you need, or run them all together." | The shared data foundation is explained in three plain subsections: "Your business data with people at the center", "Shared permissions and access controls", and reporting. | Rippling argues **against bundled "all-in-one" suites**: the value is one data model, not many apps. The menu says "HCM" while the tile says "HR", an inconsistency to avoid. | AID's platform story: "start with one device, run them all on one platform". Explain the platform in **three plain benefits**, not an architecture diagram on first view. |
| 6 | **Siemens Xcelerator**: https://www.siemens.com/global/en/products/xcelerator.html [Fetched] | An **umbrella platform brand** over 1,700+ solutions, built from three parts (Portfolio, Marketplace, Ecosystem). Five domains (industry, buildings, electrification, grids, transportation). Browse by **industry, business problem or company size**. A naming suffix: **Building X, Electrification X, Gridscale X, Signaling X**. | The suffix tells you an offering belongs to the platform. The user's own admired reference (Siemens) for structured clarity. | Inconsistent figures on one page (400+ versus 700+ partners), a caution. | A suffix or prefix that marks platform membership can work for AID IoT, but **only with a small portfolio**. With 6–10 products, a descriptor works better than a cryptic suffix. |
| 7 | **Linear**: https://linear.app [Fetched] | A narrative homepage with **numbered "figures"** (Fig 0.1 "Purpose-built", Fig 0.2 "Powered by agents", Fig 0.3 "Designed for speed"). Then **four workflow stages** (Intake and integrations; Planning and monitoring; AI and automations; Build, review, and ship), each with real UI and a feature list. | Products are grouped by **stage of work**, not by feature name. | The editorial "Fig." device makes the page read like a technical paper. | Group AID IoT's story by **stage of the data journey**: sense, connect, see, act. Each stage shows real device or dashboard output. That is motion that explains a mechanism, in line with the project's design rule. |
| 8 | **Apple**: https://www.apple.com/iphone/, https://www.apple.com/iphone/compare/ [Fetched] | **Line-up strip** (one card per model, each with a one-line positioning tagline), then a separate **Compare** page. The naming ladder is **generation number + tier** (iPhone 18 Pro, 17, 17e, Air). | Differences are cut to one tagline each ("Incredibly light and thin with pro performance"). The compare page puts price first, then **plain-language rows** ("Peace of mind: Emergency SOS"), and leaves the technical figures lower down. | A **disciplined tier vocabulary** (Pro, Air, e), the same across product lines. | The user named Apple for clarity. Use **one tier vocabulary across every AID IoT family** (for example Lite / standard / Pro, or Edge / Core). Build a **compare page per family** with plain-language rows first and specs second. |
| 9 | **Shopify Editions**: https://www.shopify.com/editions [Fetched] | A **twice-yearly release container**. Each edition has a season, a year and a one-word name (Summer '25 "Horizons", Winter '25 "Boring", Spring '26 "Everywhere"). | Hundreds of updates become one story twice a year. | Editions become events and press moments. | Later, an **AID IoT release rhythm** (for example a twice-yearly "Release" note) shows momentum without constant product launches. Not urgent. |
| 10 | **Google Workspace**: https://workspace.google.com [Fetched] | A flat list of about 20 apps, **each with a two- or three-word job** ("Gmail: Custom business email", "Drive: Cloud storage"). App names drop the "Google" prefix. Plans are by audience (Individuals, Business, Enterprise, Frontline). | The descriptor does the explaining, and the icon family does the grouping. **[Background]**: the 2020 icons share one four-colour palette and a common shape grammar. That gives family resemblance, but critics said the icons became hard to tell apart. | A cautionary case: identical colour palettes across many icons hurt distinguishability. | If AID uses product icons, **vary the shape, not only the colour**, and keep the descriptor next to the icon. |
| 11 | **Twilio**: https://www.twilio.com/en-us [Fetched] | Product groups **Conversations · Communications · Authentication · Customer Data**. The homepage shows six "building blocks". Names are **short functional nouns** (Messaging, Voice, Verify, Lookup), and acquired brands are **endorsed** ("Twilio Segment"). | "Building blocks for every conversation" frames the products as composable parts. | Inherited brands are named "Parent + acquired name". | If AID absorbs or partners for a product line, use **"AID IoT + name"** endorsement rather than a new standalone brand. |
| 12 | **Ramp**: https://ramp.com [Fetched] | Product headlines follow **"[category] + [outcome]"**: "Cards & Expenses that handle themselves", "Procure to pay without chasing approvals". The navigation offers three lenses: Products, Solutions (by size) and Platform. A **"five separate systems" diagram** shows the problem, and there is a **workflow diagram** (approval thresholds). | The product name stays plain and the **headline carries the outcome**. The problem is drawn before the solution. | A live counter of share of US corporate payments processed. | Headline pattern for AID IoT product cards: **"Cold-chain monitoring that flags a breach before stock is lost"**. Draw the "before" (separate spreadsheets, phone calls) as a diagram. |
| 13 | **Figma**: https://www.figma.com [Fetched] | Products in **two use-case groups** ("Design and explore", "Build and ship products"), most named **"Figma + noun"** (Design, Slides, Sites, Make, Buzz), with two exceptions (FigJam, Dev Mode). **Status tags** (New, Beta). | The noun says what the tool makes. | **[Background]**: Config 2025 gave each product its own colour and icon within one family shape. | The **"brand + plain noun"** system is the default to aim for. The exceptions (FigJam) show the cost of a coined name: it is memorable but needs explaining. |
| 14 | **Cloudflare**: https://www.cloudflare.com, https://www.cloudflare.com/connectivity-cloud/ [Fetched] | The umbrella category is **"connectivity cloud"**, and the footer groups solutions as Application services, SASE and workspace security, Network services and Developer platform. The developer homepage served to the fetcher was a **Markdown version for AI agents**, with products as "Name: descriptor" (e.g. "Workers: Global serverless functions", "R2: Egress-free object storage"). | **Coining a category** gives a long tail of products one sentence of meaning. | It **serves a Markdown page to AI agents**, which matters for AID's LLM-readable library goal. | Consider an **llms.txt / Markdown product catalogue** per brand, with "Name: descriptor" lines. It is cheap and keeps AI answers about AID correct. |
| 15 | **Atlassian**: https://www.atlassian.com/collections [Fetched] | Apps are bundled into **five Collections**, each with a one-line outcome: Teamwork ("Supercharge teamwork seamlessly": Jira, Confluence, Loom), Strategy, Service, Software, Product. The 2017 identity made product marks "individually unique but also part of a family" and "legible at any size" ([2017 post](https://www.atlassian.com/blog/announcements/our-bold-new-brand), [Fetched]). The 2024–25 refresh by Pentagram added yellow, green, purple and orange as product highlight colours [Search: [jimiwikman.se](https://jimiwikman.se/blogs/entry/32-changing-the-website-a-bit-after-atlassian-team-25-updates/), [LogoLounge](https://www.logolounge.com/news/atlassian-builds-on-strengths)]. | Collections turn a sprawling list into **five purchasable outcomes**. | **[Background]**: the new product icons share one rounded-square tile and one stroke weight, with collection colour as the differentiator. | AID IoT bundles: **"Fleet kit", "Cold-chain kit", "Factory kit"**, each made of devices and the platform. **Colour-code at most 4–5 families**, and only on small surfaces (icons and tags), to respect "no colour noise". |
| 16 | **Palantir**: sitemap https://www.palantir.com/sitemap.xml [Fetched]. Descriptions from the [FY2025 annual report](https://www.sec.gov/Archives/edgar/data/0001321655/000132165526000021/fy2025palantirars.pdf) and [docs](https://palantir.com/docs/foundry/architecture-center/platforms/) [Search] | Four **coined platforms** (Gotham, Foundry, AIP, Apollo) on a shared **Ontology** ("the heart of our platforms"). More than 35 **"Offerings"** are URL-level industry or use-case pages (/offerings/defense, /offerings/utilities, /offerings/supply-chain…). | A small number of platforms on one layer, and many offerings that are combinations rather than new products. | Gotham (government) and Foundry (commercial) separate defence from commercial **within one brand**. | AID splits brands instead, but the idea that **offerings are configurations of a few platforms** applies to both AID brands: an "offering" page per industry should not need a new product. |
| 17 | **Anduril**: https://www.anduril.com (sitemap and page JSON) [Fetched] | **Domain, then mission, then system**: Air (Air Dominance & Strike, Tactical Reconnaissance & Strike, Air Defense), Land (Counter Intrusion), Sea, Space, Subterranean. **Lattice is the spine**: "Autonomous air systems that are tasked, connected and controlled by Lattice". Lattice sub-pages: Command & Control, Lattice Mesh, Lattice SDK, Mission Autonomy, Partner Program. | Each mission page names its **family**: "Counter Intrusion systems—Sentry, Pulsar, Wisp, and Ghost—are a family of autonomous ground and maritime security solutions powered by Lattice". Product pages use short claim tiles ("Can be built and online in less than three hours", "Infrastructure Independent", "Onboard compute fuses radar, EO, and infrared sensor data…"). | **Coined single words** (Roadrunner, Fury, Ghost, Sentry), with **suffix variants** for form factor (Menace-I, Menace-T, Menace-X; Dive-LD, Dive-XL). Configurations are listed in prose ("standard, long-range, extended, maritime, cold weather, and mobile configurations"). Imperative mission slogans: "Own the Edge", "Refit the Fleet", "Launch, Loiter, Recover, Reuse". | **The strongest model for AID Defence**: missions first, then systems, all "powered by Lighthouse". Variant suffixes for configurations of the convoy kit. Plain claim tiles that describe *how it works*, not *how well*. |

**[Background] only (not fetched this session):**
- **Vercel** (vercel.com returned 403). The product menu groups AI Cloud, Core Platform, Security and Tools. Products
  have plain names, while open-source projects (Next.js, AI SDK) and v0 carry their own names. Lesson: open
  projects may have identities of their own, but commercial products stay plainly named.
- **Notion** (403). Product extensions are named "Notion + noun" (Notion Mail, Notion Calendar, Notion Sites),
  and a hand-drawn illustration system unifies them.
- **Adobe**. A periodic-table-style product icon system (two-letter codes in coloured tiles, e.g. Ps, Ai), later
  simplified. Good for experts, opaque for newcomers. Not recommended for AID's non-technical audiences.

### 1.2 What the strongest product pages share

Across Stripe Payments, Samsara Vehicle Gateway, Anduril Sentry and Saab Gripen (all [Fetched]), the order is
consistent:

1. **H1 = what it is**, in descriptive words ("Vehicle Gateway", "Gripen E-series") plus one-line purpose.
2. **3–4 benefit tiles**, each a short title and one sentence.
3. **How it works**: a diagram, live UI or video.
4. **Specs grouped by category**, in plain text (Samsara: Data Inputs, Wireless Connectivity, Power,
   Enclosure).
5. **Proof**: numbers, named customers, certifications.
6. **Siblings**: accessories and the platform it reports into.
7. **One primary action**: "Talk to sales", "Contact", a datasheet download.

---

## 2. Group 2: several identities under one parent

### 2.1 Exemplar table

| # | Parent · URL | Architecture device | How distinct the brands are | What is shared | Relevance for AID |
|---|---|---|---|---|---|
| 18 | **Alphabet**: https://abc.xyz [Fetched] | **Silent holding parent.** The site is investor relations: Investors, Results & Financials, Governance, Founders' Letters. The 2015 letter says Alphabet is "mostly a collection of companies" and is not meant to be a consumer brand. | Fully distinct: Google, Waymo, Verily, Wing each have their own identity. No company logos sit on the parent page. | The legal and financial layer. **[Background]**: individual companies share little visual DNA. | **The model for Inordinate.** One lean page for governance and legal, with plain links to the brands. |
| 19 | **Booking Holdings**: https://www.bookingholdings.com [Fetched] | Parent site, with brands as **plain text links** (13 of them: Booking.com, Priceline, agoda, KAYAK, OpenTable…). The only logos are the parent's. **Endorsement on one brand**: "Rentalcars.com by Booking.com". | Fully distinct consumer brands. | The legal and corporate layer. **[Background]**: the brands share some engineering platforms internally. | Confirms the silent-parent pattern. The "X by Y" endorsement is used **only where it helps trust**. |
| 20 | **Hyundai Motor Group**: https://www.hyundaimotorgroup.com [Fetched] | Group-level masthead and mission ("Meet the future, driven by Hyundai Motor Group."), with brands as **small labels on model tiles** and an affiliates directory by sector. | Hyundai, Kia and Genesis keep separate identities. **[Background]**: Genesis is a deliberate premium spin-off with its own design language, after a period as a Hyundai model name. | Platforms and engineering. | A **warning on labelling**: the page mixes "Hyundai Motor Company" with "Hyundai", and "Kia" with "KIA", and leaves Genesis out of the directory. AID needs **one canonical name list** (AID IoT, AID Defence) used everywhere. |
| 21 | **Meta**: "from Meta" endorsement [Search: [Marketing Week](https://www.marketingweek.com/facebooks-rebrand-future-beyond/), [Meta brand resources](https://www.meta.com/it-it/brand/resources/meta/partnering-with-meta/)] | **An endorsement line inside the product**: the "from Facebook" footer became "from Meta" (2021). Partnerships are allowed only with Meta, Facebook, Instagram, WhatsApp, "or a sub-brand with a custom logo lockup that includes the main brand logo". | Apps keep their own identities. The parent appears as a small, quiet line. | The endorsement line and the legal and policy layer. | AID's brands should **not** carry "from Inordinate" as a visible line, because Inordinate means nothing to buyers. Use a legal footer only. |
| 22 | **GE Aerospace / GE Vernova** (2024 split): https://www.geaerospace.com, https://www.gevernova.com [Fetched] | Two successor companies with **their own names and taglines**. Vernova's is "The Energy of Change". Aerospace's is "Advancing flight for future generations". The heritage shows only as a **licensed-trademark footer** at Vernova ("GE is a trademark of General Electric Company used under license"). | Distinct sites, tones, navigation and segments. Vernova: Power, Wind, Electrification, Accelerators. Aerospace: Commercial, Defense, Systems. | The GE monogram heritage. **[Background]**: both keep a form of the GE monogram. | A **shared prefix ("AID") with separate descriptors** works. Two brands can share a name root and still not share a look. GE Aerospace organises defence engines **by mission** (Combat/Trainer, Rotorcraft, Tanker/Transport, Marine) and uses **model codes as names** (F414, T901, LM2500). |
| 23 | **Siemens / Siemens Healthineers**: https://www.siemens-healthineers.com [Fetched]. Brand facts [Search: [brand page](https://www.siemens-healthineers.com/company/brand), [AuntMinnie](https://www.auntminnie.com/industry-news/article/15614926/siemens-healthcare-now-known-as-siemens-healthineers)] | **Parent name + coined descriptor.** "Siemens" signals heritage and "Healthineers" blends healthcare, engineers and pioneers. Its own **Healthy Orange**, with **Siemens Petrol as an accent**. | A distinct colour, tagline ("We pioneer breakthroughs in healthcare. For everyone. Everywhere. Sustainably.") and product naming (MAGNETOM…). | The parent name and a heritage accent colour. | Shows **how much distinctness one colour change and a voice can carry**. AID IoT and AID Defence can share the type family and grid and still look clearly separate through colour, imagery and voice. Healthineers' capitalised coined product lines (MAGNETOM, SOMATOM) are a **[Background]** naming reference. |
| 24 | **Airbus**: https://www.airbus.com/en [Fetched] | **One group site with divisions as peers** under "Products and services" (Commercial aircraft, Helicopters, Defence, Space, Security). Full division names in running copy ("Airbus Defence and Space"). Products use **letter-prefix model codes** (A350F, A330 MRTT, H140, H145). | Divisions share one brand. This is a **branded house**, not a house of brands. | Everything. | The **counter-model**: AID has chosen *not* to do this, because defence must not sit beside consumer-facing IoT. Still useful: Airbus's **letter-per-family code** (A for aircraft, H for helicopters) is a clean model-code device. |
| 25 | **Saab**: https://www.saab.com/products, https://www.saab.com/products/gripen-e-series [Fetched] | Products by **domain: Air, Land, Naval, Security**, each with a slogan ("Forecasting the future – from above"). Hero systems have **coined names** (Gripen, GlobalEye, Giraffe), with **letter or model suffixes** (Gripen E/F, Sea Giraffe AMB D). | — | — | The Gripen page shows a **disclosure line**. It **shares** dimensions, take-off weight, thrust, hardpoints, capability themes and customers ("117 Gripen E-series ordered"). It **withholds** price, range, combat radius, ceiling, and radar and EW performance. Its CTA is a sales email, a phone number and two PDFs. AID Defence can follow this. |
| 26 | **Tata Group / Tata Advanced Systems**: https://www.tataadvancedsystems.com [Fetched] | **Endorsed brand**: the Tata logo in header and footer, heritage section ("For over 100 years, the Tata group has been led by visionaries"). Four divisions: Aerostructures & Aero-Engines; Airborne Platforms & Systems; Defence & Security; Land Mobility. | Defence content is separate from Tata Consumer and others, but it **borrows group trust**. | The Tata monogram and group values. **[Background]**: Tata companies pay a brand-equity fee under the Tata brand agreement. | The Indian defence norm is to **lean on group heritage**. AID cannot borrow trust from Inordinate, so AID Defence must earn it with **proof**: certifications, trials and indigenous IP. Tone note: TASL's site mixes "Programs" with "Programmes" and leans on hashtags, which AID should avoid. |
| 27 | **Mahindra Group**: https://www.mahindra.com [Fetched]. Defence facts [Search: [Mahindra press release](https://www.mahindra.com/news-room/press-release/mahindra-defence-to-manufacture-integrated-asw-defence-suite-for-indian-navy)] | Group site by industry (Automotive, Farm, Financial Services, Technology Services…). **Defence is not in the main menu**, and aerospace appears under "Other Emerging Businesses". The group line is "Together We Rise". (mahindradefence.com did not resolve.) | Mahindra Defence Systems runs as a business with press releases (the IADS anti-submarine suite contract for 14 ships, Rs 1,349.95 crore). | The group name and the Rise line. | Supports the user's rule that **people outside defence should not need to meet AID Defence**. The consumer-facing group gives defence almost no prominence. |
| 28 | **Nothing / CMF by Nothing**: https://nothing.tech (cmf.tech redirects there) [Fetched] | A **sub-brand with an endorsement in its name** ("CMF by Nothing"). Product names carry a "CMF" prefix ("CMF Speaker M"), while Nothing uses **bracketed generation codes** ("Headphone (1) Pro", "Phone (4a) Pro", "Ear (3a)"). | A **voice shift**. Nothing: "Studio-level precision for our most advanced headphone ever." CMF: "Take the party everywhere." | The site, shop and engineering. | A **distinctive naming system can be a brand asset in itself** (the bracketed numbers). AID could own a code format, provided it stays readable. |
| 29 | **Arm** (2025 naming architecture): [Arm blog](https://developer.arm.com/community/arm-community-blogs/b/announcements/posts/the-evolution-of-arms-product-naming-architecture) [Fetched] | **Platform-first names per market**: Orbis (IoT; "orbit or circle… motion, connection, signal, and reach"), Lumex (mobile), Niva (PC), Zena (automotive), Neoverse (infrastructure). IP gets a simple identifier, a generation number that **resets to 1**, and a tier where relevant. Coverage reports tiers **Ultra, Premium, Pro, Nano, Pico** [Search: [CNX Software](https://www.cnx-software.com/2025/05/16/arm-introduces-new-product-naming-architecture-for-infrastructure-pc-mobile-automotive-and-iot/)]. Mali stays as the GPU brand, and the scheme applies only to new products. | — | — | The cleanest **naming grammar**: family name, then component, then generation, then tier. **Trademark flag**: AID IoT's product "Cortex" collides with Arm's Cortex CPU trademark, which is still on millions of shipped chips. Rename it. |

### 2.2 Design systems that publicly show multi-brand theming

| System | Evidence | Device | AID use |
|---|---|---|---|
| **Adevinta Spark** (leboncoin and others) | [spark-tokens](https://github.com/adevinta/spark-tokens) [Fetched]. [spark-android](https://github.com/leboncoin/spark-android/) [Search] | Tokens in **brand folders**, with the brand selected by one property (`"brand": "spark"` in package.json). A **three-tier** model: core palette (`color-core-paleadevinta-50`), then semantic brand (`color-brand-main-main`), then component (`component-badge-background-color`). Android supplies only the tokens that change, and the rest fall back to defaults. | Matches "one engine, export each brand to its own repo" exactly: **one brand per build**, with components that know only tiers 2 and 3. |
| **Volkswagen Group GroupUI** | [Search: [BrightTALK webcast](https://brighttalk.com/webcast/18446/526076), [Red Dot](https://www.red-dot.org/project/groupui-41315), [Frontify](https://frontify.com/customer-stories/frontify-for-volkswagen-group)] | One Stencil web-component library and token system serving 15+ brands (VW, Škoda, Audi, Porsche, MAN, Scania adopters reported in 2022). | Proof that one component engine can serve brands as different as Porsche and MAN. Brand difference lives in tokens, imagery and voice. |
| **eBay Evo** | https://playbook.ebay.com [Fetched] | "One system for everyone to love". It is built to "scale globally and flex locally". Foundations span brand (logo, colour, type, photography, motion, writing) and product (composition, interaction, object styles). | It is single-brand, but its **brand and product foundations in one playbook** is the shape for each AID brand's DESIGN.md. |
| **Atlassian** (product highlight colours) | See row 15 | One UI system with per-product highlight colour. | A per-family accent *inside* a brand, used sparingly. |

---

## 3. Product naming: how the exemplars systematise it

| Approach | Examples | Strength | Risk | Use at AID |
|---|---|---|---|---|
| **Plain functional noun** | Stripe Payments, Billing, Terminal. Twilio Messaging, Voice. Samsara Vehicle Gateway. Rippling Payroll. | Self-explanatory, easy to search, good for non-technical buyers. | Hard to trademark, so the brand name does the owning. | **Default for AID IoT devices and modules.** |
| **Brand + noun** | Figma Slides, Notion Mail, Twilio Segment, Stripe Sigma. | Ownership and meaning in one go. | Long names in tight UI. | AID IoT umbrella usage: "AID IoT Fleet", "AID IoT Cold Chain". |
| **Coined name for the spine** | Lattice, Foundry, Ontology, Xcelerator, Orbis. | Memorable and protectable. It is the thing every other product connects to. | Needs a descriptor on every first mention. | **One coined name per brand for the platform**: AID IoT's platform (working name "Signal", which needs a trademark search) and AID Defence's Lighthouse. |
| **Coined name for hero systems** | Gripen, Roadrunner, Sentry, Ghost, MAGNETOM. | Builds fame for a few big systems. | Does not scale to 20 small products: readers cannot place them. | **AID Defence only** (2–4 systems). |
| **Model codes** | VG55 (Samsara), F414 / LM2500 (GE), A350F / H145 (Airbus), Gripen E/F. | Precise for procurement, spares and datasheets. | Opaque as marketing names. | At the **datasheet and SKU layer** only. Shown under the descriptive name. |
| **Variant suffix** | Menace-I/T/X, Dive-LD/XL (Anduril). VG55-FN (Samsara). iPhone 17e (Apple). | Shows configurations of one family. | Suffix soup if undefined. | Publish a **suffix glossary** (e.g. -M marine, -R rugged, -O offline). |
| **Tier ladder** | Pro / Air / e (Apple). Ultra / Premium / Pro / Nano / Pico (Arm). | Readers learn the ladder once and apply it everywhere. | Inflation ("Pro Max Ultra"). | **One three-step ladder across all AID IoT families.** |
| **Generation numbering** | iPhone 18, Arm's reset to 1, Nothing's "(4a)". | Shows progress. | Inconsistent if used ad hoc. | Integer generations on hardware only. |

**The current AID inventory breaks most of these rules.** `05-domain-and-landscape.md §1.2` lists names such as
AID-AD7, HEAID-K1, AID-R5, D3, AID-G2, VMS-O, VFMS-O, AID Fresh, AidFresh, AID-Auto, Cortex, IIoT Bridge, TrackNet
and AID-Fuel-Marine. That is four or five unrelated schemes, inconsistent casing and hyphenation, and at least two
collisions: **Cortex** (Arm) and **NAVIC** (ISRO's NavIC). Lighthouse also collides weakly (Google Lighthouse,
India's Directorate General of Lighthouses and Lightships).

---

## 4. Pattern library (15 named patterns)

Each pattern lists its exemplars and how AID could adapt it. The tag **[IoT]** / **[Def]** / **[Parent]** marks
where it applies.

| # | Pattern | What it is | Exemplars | AID adaptation |
|---|---|---|---|---|
| P1 | **One engine, separate skins** | Shared type, grid, components and token tiers. Brands differ in tier-2 tokens, imagery, motion temperament and voice. | Spark, GroupUI, Siemens / Healthineers, Atlassian | One Google Fonts family and one component set. AID IoT and AID Defence differ in colour, imagery style, density and voice. Build one brand per run, so each exports to its own repo (see `03-…`). **[IoT][Def]** |
| P2 | **Silent parent** | The legal or holding entity has a minimal, governance-led presence and no product marketing. | Alphabet, Booking Holdings, Hyundai Motor Group | Inordinate gets one sober page (see §7). **[Parent]** |
| P3 | **Legal-line endorsement (not visual endorsement)** | The parent appears only in the footer and legal text, not as "from X" in the identity. | GE Vernova licence footer, Stripe Press "© Stripe, LLC" | Footer: "AID IoT is a brand of Inordinate Industrial Innovation Pvt Ltd · CIN …". No Inordinate logo. **[IoT][Def]** |
| P4 | **Shared root, separate descriptor** | Brands share a name root and are told apart by a plain descriptor. | GE Aerospace / GE Vernova, Siemens / Siemens Healthineers | "AID" is the root, and "IoT" and "Defence" are the descriptors. The lock-up typography is identical and colour differs. Never abbreviate a brand to plain "AID" in public copy. **[IoT][Def]** |
| P5 | **Named spine** | One coined platform that every product connects to, with the dependency stated in every product's copy. | "Powered by Lattice", Samsara Platform, Palantir Ontology, Siemens Xcelerator, Rippling shared data | AID IoT: every device page ends with "Reports into [platform]". AID Defence: "Commanded through Lighthouse". **[IoT][Def]** |
| P6 | **Three-axis navigation** | Products (what) × Solutions (outcome) × Industries (who), kept as separate menus. | Stripe, Samsara, Twilio, Ramp | AID IoT top nav: **Products · Outcomes · Industries · Platform · Company**. **[IoT]** |
| P7 | **Name plus job descriptor** | Every product name is followed by a 2–5-word job, everywhere it is listed. | Cloudflare, Google Workspace, Samsara families, Figma menu | "AID Fleet Tracker: live position and fuel for every vehicle". It is mandatory in menus, cards, the llms.txt and datasheets. **[IoT][Def]** |
| P8 | **Outcome headline, plain name** | The product name stays descriptive while the headline carries the result. | Ramp ("Cards & Expenses that handle themselves"), Stripe homepage jobs | "Cold-chain monitoring that flags a breach before stock is lost". The voice suits AID IoT as "a solver". **[IoT]** |
| P9 | **Families with a shared descriptor line** | 4–6 families, each with a three-part descriptor. | Samsara ("Real-time GPS, routing, fuel, compliance"), Datadog category taglines | See §5 for AID IoT's families. **[IoT]** |
| P10 | **Collections or kits** | Ready-made bundles of products plus the platform, sold as an outcome. | Atlassian Collections, Google Workspace plans | "Fleet kit", "Cold-chain kit", "Plant kit" pages that make buying simple for SMEs. **[IoT]** |
| P11 | **Domain → mission → system** | Group sensitive systems by the operational problem, not by technology. | Anduril, Saab, GE Aerospace Defense, Tata Advanced Systems | AID Defence: **Mobility & convoy** and **Airspace protection** as missions, with systems under each. **[Def]** |
| P12 | **Layered disclosure** | Public page = purpose, shape, headline facts. Briefing = specs and UI. Contract = performance. | Saab Gripen (shares dimensions, withholds range and sensor performance), Apple compare (plain rows first, specs lower) | See §6 for AID Defence's disclosure ladder. Apply to AID IoT as "summary, then specs, then datasheet". **[Def][IoT]** |
| P13 | **Mechanism figure** | Each section explains *how it works* with a numbered figure, live UI or a "before" diagram, not a decorative visual. | Linear "Fig 0.1–0.3", Ramp "five separate systems", Stripe product UI, Samsara "How it works" | Fig-numbered diagrams of the data path (sense, connect, see, act). This is the project's "motion explains a mechanism" rule. **[IoT][Def]** |
| P14 | **Consistent product-page spine** | Every product page has the same section order, so readers learn it once. | Stripe, Samsara, Anduril, Saab | One template per brand (see §1.2). The family-level compare page follows Apple. **[IoT][Def]** |
| P15 | **Machine-readable catalogue** | A Markdown or llms.txt catalogue with "Name: descriptor" lines for AI agents and search. | Cloudflare's Markdown homepage, Stripe docs `.md` links and agent skills | /llms.txt per brand, generated from the same product registry as the site. **[IoT]**. For **[Def]**, public-tier facts only. |

Also seen, lower priority: **release containers** (Shopify Editions, Linear changelog) and **editorial imprints**
(Stripe Press).

---

## 5. Recommendation: organising AID IoT's large, mixed portfolio

### 5.1 Principle

**Organise by what the buyer is trying to keep under control, connect everything to one named platform, and keep
services apart from products.** The current list mixes several kinds of thing:
- connected devices (GPS tracker, OBD, IIoT Bridge, VMS-O, VFMS-O);
- equipment that happens to be connected (ultrasonic cleaner, vending machine);
- a vertical solution (AID Fresh);
- software (AID ERP, the platform);
- an engineering service (PCB milling and design).

### 5.2 Proposed architecture (for discussion with leadership)

```
AID IoT
├── Platform (one coined name, e.g. working name "Signal", which needs a TM search): dashboards, alerts, API, OTA, on-prem option
├── Products: 5 families, each "Family: three-part descriptor"
│   ├── Fleet & Mobility: live location, fuel, driver behaviour
│   │     GPS tracker · OBD device · offline tracker (VMS-O) · offline fuel monitor (VFMS-O)
│   ├── Cold Chain: temperature, door, compliance records
│   │     AID Fresh sensors and gateway
│   ├── Industrial Connectivity: machines, meters, PLCs to the cloud or on-prem
│   │     IIoT Bridge · Edge Lite · Ethernet Bridge · (Cortex, renamed)
│   ├── Connected Machines: smart equipment we build and monitor
│   │     ultrasonic cleaner · vending machine
│   └── Business Software: operations on top of the data
│         AID ERP (+ mobile app)
├── Outcomes (Solutions menu): Cut fuel and idle loss · Prove cold-chain compliance · Prevent machine downtime
│      · Track assets without internet · Run operations on one system
├── Industries: Logistics & transport · Food & pharma cold chain · Manufacturing · Retail & vending · Public sector
└── Build with AID (services, not products): PCB design and milling · custom hardware and firmware · integration
```

**Why this shape:**
- **Five families is the ceiling that people can hold in mind.** Samsara uses five, Atlassian five
  collections, Datadog seven. Each family gets a Samsara-style three-part descriptor.
- **Outcomes carry the "solver" voice** that AID IoT has chosen. A non-IT executive enters by problem (P6,
  P8).
- **Services are split out** so that PCB milling does not dilute the product story. Even so, "we build the
  silicon, firmware and enclosure in-house" (the IIoT Bridge claim) becomes proof for the product families. That
  credibility mirrors Stripe's "Professional services" placement.
- **Cross-listing is allowed** (Datadog, row 4). OBD can appear under Fleet and under Cold Chain (reefer trucks).
- **Kits** (P10) come later, once two or three families have real customers: "Fleet kit" = tracker + OBD +
  platform.

### 5.3 Naming system (proposal)

| Layer | Rule | Example (illustrative only) |
|---|---|---|
| Brand | "AID IoT", always written exactly so | AID IoT |
| Platform | One coined name, after a trademark search (Class 9 and 42) | [Platform] |
| Family | A plain noun phrase from the buyer's world | Fleet & Mobility |
| Product | A descriptive noun, with "AID" only where it helps ownership | Fleet Tracker, OBD Tracker, Fuel Monitor, Cold-Chain Sensor, Industrial Bridge |
| Tier | One ladder for every family, e.g. **Lite · (standard) · Pro** | Industrial Bridge Pro |
| Model code | **Family letter + generation digit + class digits**, shown on datasheets and labels only | F2-OBD, C1-T, B3-P (F = Fleet, C = Cold chain, B = Bridge) |
| Variant suffix | Defined glossary: **-O offline (SIM-less), -M marine, -R rugged, -S satellite** | Fleet Tracker-O (replaces "VMS-O") |

Rules: one casing and one hyphen style everywhere. No product called "Cortex", and no product reusing the
national "NavIC" name as a brand. Every list shows "Name: descriptor". Publish the glossary in DESIGN.md and
`llms.txt`.

---

## 6. Recommendation: presenting AID Defence's few, sensitive products

### 6.1 Structure (adapted from Anduril, Saab and GE Aerospace Defense)

```
AID Defence
├── Missions (2, maybe 3), each named as an outcome
│   ├── Convoy & mobility command: "Know where every vehicle and soldier is, without depending on foreign GNSS"
│   │     Systems: convoy tracker kit (vehicle tracker, belt pager, PTT handheld, SatCom unit), offline fuel records
│   └── Airspace protection: "Detect, decide and defeat hostile drones"
│         Systems: anti-drone system (ADS), RF detector
├── Lighthouse: the command software spine ("Commanded through Lighthouse"); its own page,
│     as Lattice is for Anduril, and the coined name AID Defence invests in (with a distinguishing descriptor, e.g. "Lighthouse Command")
├── Indigenous engineering: in-house silicon, firmware, self-hosted and air-gapped (proof, not product)
├── Briefings: request a private briefing (the only primary CTA)
└── Company & compliance
```

- **Missions first (P11).** Senior, non-technical officers read the problem in their own terms. The system name
  follows.
- **Few products allow coined names (P5 and the hero pattern).** Two to four coined system names, each with a
  variant-suffix glossary (Anduril's Menace-I/T/X). The present codes (AID-AD7, D3, HEAID-K1, AID-R5) should be
  replaced by one scheme. Note: the weapons-adjacent items listed in `05 §1.2` need substantiation and an
  export-control and legal review before any public mention.
- **Shared products (AI IoT Bridge, OBD) appear under defence names and pages.** They are not linked to the AID
  IoT site, so neither audience has to meet the other brand (P1, and the user's rule from discovery).

### 6.2 Disclosure ladder (P12)

| Tier | Where | What goes here | Precedent |
|---|---|---|---|
| **Public** | Website, brochure | The mission problem in one paragraph. The approach in one mechanism figure. Form factor shown as an AI-generated or silhouette image (no real deployments). Indigenous IP and in-house build. Standards (MIL-STD-810G, IP67, EMI/EMC) once certificates exist. Interoperability with NavIC. "Self-hosted, never in the cloud". | Saab Gripen: dimensions, capability themes and customer count. Anduril Sentry: "Can be built and online in less than three hours". |
| **Briefing** | Private meeting or controlled PDF after request | Detailed specs, Lighthouse UI with symbology and night mode, deployment patterns. | Saab's two downloadable brochures and sales email. |
| **Contract** | Under NDA or classification | Performance envelopes, ranges, detection probabilities, customer units. | Withheld by Saab (range, radar and EW performance) and Anduril. |

Copy rule: claim tiles say **how it works** ("Runs on your own server; no internet needed"), not **how well**
("best in class"). That matches the "mature, no-nonsense, discreet" voice. It also avoids the Gripen page's
inconsistency (turnaround given as both "15–25 minutes" and "around 15 minutes").

---

## 7. Recommendation: what the legal parent (Inordinate) should and should not show

**Model: silent parent (P2), with legal-line endorsement (P3).** Alphabet, Booking Holdings and the GE
successors, not Tata or Airbus.

**Should show (one lean site or a single page):**
- The legal name, CIN, registered office and contact. **[Background]**: Indian company rules expect these on a
  company's website. Confirm with counsel.
- One paragraph on what the company does, then **two plain text doors** ("AID IoT: connected devices and
  software for industry" / "AID Defence: systems for India's armed forces"). No logos needed, as on Booking
  Holdings.
- Governance and compliance documents that defence procurement may ask for: certifications, registrations,
  quality policy, an ethics and export-control statement. These are a natural home for the boring proof both
  brands need.
- Careers (shared hiring) and press contact.

**Should not show:**
- Product pages, product imagery, customer logos or case studies. They belong to the brands.
- Defence content of any kind on a page that also links to IoT. Keep the two doors visually equal and neutral.
- A third visual identity that competes with the brands. Use the shared core only: the font family, neutral
  colours and the grid.
- "From Inordinate" endorsement lines inside the brand identities (P3). Inordinate carries no buyer recognition,
  so it would add noise.
- Cross-selling between the brands.

**On each brand site:** a footer line "AID IoT is a brand of Inordinate Industrial Innovation Pvt Ltd", with the
CIN and a link to the parent page. The same applies to AID Defence. This keeps both brands portable: they can
move to their own repositories, or be divested, without changing the visible identity.

---

## 8. Figma board list: the 12 best references to capture

| # | URL | What to capture and look at |
|---|---|---|
| 1 | https://stripe.com | The six "jobs" product grid. The stats band. The Products and Solutions mega-menus side by side (two axes). |
| 2 | https://stripe.com/payments | The product-page spine end to end: anchor nav, capability sections with live UI, the proof numbers, the "works with" cross-sell. |
| 3 | https://docs.stripe.com | Task-first entry ("Accept payments online") above "Browse by product" groups. The model for an AID knowledge hub. |
| 4 | https://www.samsara.com (open the Products menu) | Five families with three-part descriptors. Outcomes and Industries menus. Closest analogue to AID IoT. |
| 5 | https://www.samsara.com/products/models/vehicle-gateway | Descriptive H1, the model code only on the datasheet links, spec grouping, accessories and platform cards. |
| 6 | https://www.anduril.com/land/counter-intrusion | Mission page that names a family "powered by Lattice". Claim tiles. Imagery restraint. |
| 7 | https://www.anduril.com/sentry | Sensitive-product page: configurations in prose, "how it works" claims, no performance tables. |
| 8 | https://www.saab.com/products/gripen-e-series | The disclosure line: key-facts table, thematic capability sections, sales contact and brochures as CTAs. |
| 9 | https://www.apple.com/iphone/ and /iphone/compare/ | Line-up strip with one-line taglines. Compare rows in plain language, price first. The tier vocabulary. |
| 10 | https://www.atlassian.com/collections | Collections as outcome bundles. Look at product-icon colour coding across collections. |
| 11 | https://linear.app | "Fig 0.1" numbered figures and the workflow-stage grouping. The model for mechanism-led storytelling. |
| 12 | https://abc.xyz and https://www.bookingholdings.com | Silent-parent pattern: governance-first navigation, brands as plain links. The template for Inordinate. |

Optional extras: https://ramp.com ("[category] that [outcome]" headlines, the "five separate systems" diagram),
the [Arm naming post](https://developer.arm.com/community/arm-community-blogs/b/announcements/posts/the-evolution-of-arms-product-naming-architecture)
(naming grammar), and https://www.siemens-healthineers.com (one colour change carrying a distinct brand).

---

## 9. Limits of this research

- Visual details (icon shapes, colours, motion) could not be verified from text fetches. Capture them by
  screenshot into Figma (§8) before deciding on icon or colour-coding rules.
- Palantir and Anduril content came from sitemaps, page JSON and filings, not from the rendered pages.
- No Indian IoT multi-product exemplar was strong enough to include. Revisit when the competitor research (Q17–18)
  runs.

## Next steps (and why each is next)

1. **Run a portfolio workshop with leadership on §5.2 and §6.1.** Confirm what each current product actually is,
   which ones are live, and which are retired. The families and missions cannot be fixed until the inventory is
   true, and the naming depends on the families.
2. **Run trademark searches for the platform name, Lighthouse, and replacements for Cortex and NAVIC.** Search IP
   India in Classes 9, 42 and 45. Naming is the riskiest dependency: a collision found after design work forces
   the identity to be redone.
3. **Capture the §8 board in Figma**, then sketch the two navigation skeletons (AID IoT: three-axis; AID
   Defence: missions). The navigation and the product-page spine shape the component inventory, so they must
   come before the design system's component list is frozen.
4. **Add a product registry** (one JSON per brand: name, descriptor, family, tier, code, disclosure tier). It
   will generate menus, cards, datasheets and `llms.txt` (P7, P15). It is cheap to start and keeps naming
   consistent from the first page built.
