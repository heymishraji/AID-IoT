# AID IoT — voice guide v0 (draft, agent-ready)

_Status: draft v0, 2026-10-27. Based on the owner's description in `docs/brand/DISCOVERY.md` and
`STRATEGY.md` in this folder. Vocabulary lists await leadership (Q22 "always/never words": later)._

**For agents:** read this whole file before writing AID IoT copy. Never invent customers, numbers,
certifications or claims. If a fact is missing, write `[LEADERSHIP: …]` and move on.

## 1. Voice in one line
**A capable engineer who listens first, then explains the fix in plain words.**

## 2. Traits — do and don't

| Trait | Do | Don't |
|---|---|---|
| **Empathetic** | Name the reader's problem in their words before naming our product. Acknowledge effort and constraints. | Open with "we" or with the product. Assume the reader's problem. Blame the user. |
| **Clear** | One idea per sentence. Concrete nouns and verbs. Say what it does, then why it matters. | Stack adjectives. Use jargon without explaining it. Hide limits in fine print. |
| **Inventive** | Show the clever part as a mechanism: "it does X, so you get Y". | Say "innovative", "cutting-edge", "revolutionary", "next-gen". Lean on "AI" as a selling word. |
| **Adaptable** | Offer to change things: "If that doesn't fit, we'll adapt it." Admit what we're still learning. | Promise everything. Say "we do it all". Sound rigid or scripted. |

## 3. Tone sliders
Scale 1–5. The voice stays the same; the tone moves a little by context (see section 4).

| Slider | 1 | 2 | 3 | 4 | 5 | Position | In practice |
|---|---|---|---|---|---|---|---|
| Formal ↔ Casual | formal | | ● | | casual | **3** | Professional and conversational. Contractions are fine. No slang, no emoji in business copy. |
| Technical ↔ Plain | technical | | | ● | plain | **4** | Plain first. Technical detail one level down, never missing. |
| Reserved ↔ Bold | reserved | | ● | | bold | **3** | Confident about what we've done; modest about what we haven't. |
| Serious ↔ Warm | serious | | | ● | warm | **4** | Warm and kind, never cute. |
| Established ↔ Challenger | established | | | ● | challenger | **3.5–4** | A capable newcomer that earns trust by being useful. Never knocks competitors. [LEADERSHIP: confirm] |

## 4. Tone by context
- **Website hero, ads:** plainest, warmest. Problem → outcome in under 20 words.
- **Datasheets, technical docs:** plain summary first (2–3 sentences), then precise specs. Slider 2 on technical.
- **Errors and system messages:** calm, specific, helpful. Say what happened, why (if known), what to do next.
- **Sales emails:** short, personal, one question or one ask.
- **Social:** a real problem or a real build moment. No hype, no stock "excited to announce".

## 5. Writing rules
1. **British English** (colour, organise, programme, licence as a noun). Dates: 27 October 2026.
2. **Sentence length:** aim for 12–18 words; hard limit 25. One idea per sentence. Paragraphs of 1–3 sentences.
3. **Outcome first.** Lead with what changes for the reader. Then how. Then the specs.
4. **Jargon policy:** explain in plain words first; put the technical term after, or one level down.
   Example: "It keeps working when the network drops (offline buffering)." Define an acronym on first use,
   or don't use it on executive-facing pages.
5. **Active voice.** "The gateway sends an alert", not "an alert is sent".
6. **Numbers:** only verified ones, always with a unit and context. "[LEADERSHIP: x] hours saved per week per
   site", never a bare "50%". Indian numbering (lakh, crore) vs international: [LEADERSHIP: decide per market].
7. **"We" and "you":** more "you" than "we". Count them; "you" should win on customer-facing pages.
8. **Headlines:** sentence case. Say something specific. No puns that need explaining.
9. **No filler:** cut "in today's fast-paced world", "seamless", "leverage", "solutions" as a noun on its own.
10. **Honest limits:** if something has a condition, say it near the claim, not in a footnote.
11. **Never mention the parent company's other brand**, defence customers or defence products in AID IoT content.

## 6. Vocabulary (draft — flagged for leadership)
[LEADERSHIP: approve, add the "always/never" words from discovery Q22.]

| Prefer | Avoid | Why |
|---|---|---|
| understand, ask, listen, agree | disrupt, revolutionise | We solve, we don't perform |
| build, design, make, adapt, fit | leverage, synergise, empower | Plain verbs |
| connected system, device, sensor, dashboard | ecosystem, smart solution, digital transformation | Concrete beats abstract |
| "works when the network drops" | "robust", "seamless", "best-in-class" | Show the mechanism |
| your team, your site, your machines | stakeholders, end users (in customer copy) | Speak to people |
| customised, made to fit | bespoke (fine, but rarer), one-size-fits-all | Adaptable trait |
| "uses machine learning to …" (with a job) | AI-powered, AI-driven (as a label) | AI is a means, not a claim |
| pilot, trial, first site | game-changer, cutting-edge, next-gen | No hype |

## 7. Before and after
All proof in "after" versions is a placeholder until verified.

**1. Product description (IIoT Bridge)**
- Before: "A robust, cutting-edge industrial IoT gateway offering seamless multi-protocol connectivity and
  powerful edge intelligence for Industry 4.0."
- After: "Connect the machines you already have. IIoT Bridge reads data from your existing equipment, keeps
  it safe when the network drops, and sends it to one dashboard. Under the hood: Modbus, RS-485, CAN and
  more — full list on the datasheet. [LEADERSHIP: verify protocol list before publishing.]"

**2. Error message (dashboard)**
- Before: "Error 504: Device communication failure. Contact administrator."
- After: "We haven't heard from Gate Sensor 3 since 10:42. It may be offline or out of signal. Data is stored
  on the device and will sync when it reconnects. Check power and signal, or contact support."

**3. LinkedIn post**
- Before: "🚀 Excited to announce our revolutionary AI-powered IoT solution that will transform the industry!"
- After: "A customer told us their cold room alarms came too late to save stock. So we asked: late by how much,
  and why? The answer changed what we built." _(Illustrative only. [LEADERSHIP: a real, verified story,
  its outcome and permission to share.])_

**4. Datasheet intro**
- Before: "The AID GPS Tracker is a next-generation, feature-rich telematics device leveraging advanced GNSS
  technology for best-in-class tracking performance."
- After: "Know where every vehicle is, and where it has been. The AID GPS Tracker reports location and trips
  to your dashboard and alerts you to [LEADERSHIP: confirmed alert types]. Specifications below."

**5. Call to action**
- Before: "Submit enquiry" / "Learn more"
- After: "Tell us the problem" (primary) · "See how it works" (secondary)

**6. Sales follow-up email**
- Before: "Dear Sir/Madam, Further to our discussion, please find attached our company profile showcasing our
  comprehensive range of end-to-end IoT solutions. Kindly revert at the earliest."
- After: "Hello Priya, thank you for walking us through the packing line today. If I've understood right, the
  real cost is the 20 minutes it takes to find which machine stopped. Before we suggest anything, could we
  spend half a day on the floor during a shift? I'll send two times that work. — Arjun"
  _(Names and details here are illustrative only.)_

## 8. Self-check for agents (answer yes to all)
1. Does the first sentence name the reader's problem or outcome, not our product or "we"?
2. Could a non-IT executive understand the first paragraph without help?
3. Is every technical term explained in plain words first, or moved one level down?
4. Is every sentence 25 words or fewer? Most under 18?
5. Are all customers, numbers and certifications verified — or marked `[LEADERSHIP: …]`?
6. Is it free of the "avoid" words in section 6 and of hype?
7. Does it say what changes for the reader, not just what the product has?
8. Is any condition or limit stated next to the claim?
9. British English spelling throughout?
10. No mention of the parent company's other brand or defence work?
11. Does it end with one clear next step for the reader?

## Open questions for leadership
1. Approve the tone slider positions, especially established ↔ challenger.
2. Always/never words (discovery Q22): which words are ours, which are banned?
3. Indian or international number formats on the website? Per market?
4. Who may sign customer-facing content (named person vs "the AID IoT team")?
5. Are product names written in capitals (VMS-O) or title case? Final names after the rebrand?

## Next steps
1. **Leadership approves sliders and vocabulary** — agents will copy whatever this file says, so it must be
   right before content production starts.
2. **Rewrite one real page (home hero + one product) with this guide** — the fastest test of whether the
   voice works on real material.
3. **Add benchmark findings (reports 07–10) to the avoid list** — removes category clichés we haven't yet seen.
4. **Turn section 8 into a reusable agent skill/prompt** — so every agent checks itself the same way.
