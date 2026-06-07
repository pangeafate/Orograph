<aside>
🎯

Build-ready specification for the **Orograph** investor deck (10 slides). Hand this entire document to the coding agent. It contains the visual system, the narrative arc, and a per-slide spec (graphics + exact text + layout). Audience: a **generalist seed fund** — keep jargon low, make the problem visceral, lean on the "governed orgchart" metaphor.

</aside>

## 0. Global build notes (read first)

**Company:** Orograph — *"The operating system for a governed AI workforce."*

**Category hook (throughline):** the **Governed Agentic Orgchart** — every agent has a job description, a manager, permissions, an authority tier, and a budget.

**One-line thesis:** Orograph defines every AI agent as **governed data, not code**, so an ungoverned agent is structurally impossible, behavior changes by editing a row (no redeploy), and every decision is traced to who approved it.

### Visual system (apply to every slide)

- **Reference:** match the look and feel of **lakestrom.com** — premium, restrained, near-monochrome base, a single cool accent, generous whitespace, big confident metrics, clean modern grotesque sans-serif.
- **Coding agent:** extract the **exact color tokens (hex) and `font-family`** from the live lakestrom.com CSS and reuse them as the deck's design tokens. Do not invent a palette.
- Avoid heavy gradients/glassmorphism. Calm, confident, data-driven. Lots of negative space. Numbers are large and bold.
- **Tech:** single standalone build, each slide self-contained; presentable full-screen and embeddable.

### Narrative arc (the spine)

Title → Problem → Insight → Product → Why Now → GTM & Wedge → Business Model → Moat → Vision → Status & Ask.

---

## Slide 1 — Title

**Graphics:** Clean, premium layout (lakestrom system). Centered wordmark **Orograph**; subtle, restrained background — no heavy gradients. Calm and confident. No founder credit.

**Text & location:**

- **Center (wordmark):** `Orograph`
- **Tagline (directly below):** "The operating system for a governed AI workforce."
- **Sub-paragraph (smaller, muted):** "Every AI agent in your business gets a job description, a manager, permissions, and a budget — enforced by construction. Change what an agent can do without a deploy; prove who approved every decision without a forensics project."

---

## Slide 2 — The Problem

**Graphics:** Three "lane" cards stacked vertically on the left. A clear pointer moves from the lane stack to the right-side proof panel. The right panel is the dominant object and contains the **4 missing pillars** as four icon tiles. Remove the bottom big-player/stat/consequence row.

**Top title:** "Existing approaches to building agents have fundamental governance gaps, leading to 88% of pilots not making it to production."

**Lane 1 — Autonomous, self-building agents** *(Open Claw, Hermes — prosumer/tech-savvy):* Self-mutating black boxes that can go rogue anytime. Observability means building heavy infra (what they do, what they call each tool, when the version changed). And they **token-max** — running inefficiently while building themselves.

**Lane 2 — SDK / framework-built agents** *(LangGraph, Mastra, OpenAI/Anthropic SDKs):* Powerful and controllable (skills, tools, grants) — but you must build all the foundational infra *before* value lands, and scalability + observability come right back. Slow and costly to run efficiently.

**Lane 3 — Plug-and-play "AI employees"** *(buy a sales/marketing agent off a website):* Easy for non-technical users — but no control mechanisms (companies won't allow uncontrolled use) and too shallow to fine-tune.

**Right proof panel — the 4 missing pillars:** "Every organization building agents today is missing the same infrastructure." → **Governance · Provenance · Atomic fine-tuning · Observability** (four icon tiles).

---

## Slide 3 — The Insight: Governed Agentic Orgchart

**Graphics:** Hero = a **Governed Agentic Orgchart** — a department of small "atomic" agent cards reporting up to a manager agent, each card showing its data fields. To the side, a real schema panel (the actual data model).

**Top title:** "Stop building black boxes. Build a Governed Agentic Orgchart."

**Core insight (bold):** "Orograph defines every agent as **governed data, not code** — its job description, manager, permissions, authority tier, and budget *are* the agent. So an **ungoverned agent is structurally impossible**, behavior changes by **editing a row (no redeploy)**, and every action is **traced to who approved it**."

**The atomic-agents economic unlock (highlighted):** "Each agent stays **atomic** — the smallest set of skills on the cheapest capable model. Organized into **departments**, these cheap atomic agents together execute sophisticated tasks **reliably and at a fraction of the cost** — the opposite of self-building black boxes that token-max."

**The real data model (schema panel — show the real thing):**

- **`agents` table (~33 columns):** identity (`agent_name`, `namespace_prefix`, `tenant_id`, `agent_kind`) · 10 prompt-fragment slots (`base_prompt`, `soul_fragment`, `operating_rules_fragment`, …) · grant pointers (`required_tools`, `required_skills`, `authority_node_refs`, `budget_line_refs`, `trigger_refs`) · runtime (`model_ref`, `retention_days`) · lifecycle (`current_version_id`, `state_hash`, `origin`)
- **~11 satellite tables (the "soul"):** `agent_spec_versions`, `agent_tool_access`, `agent_autonomy`, `agent_job_description`, `agent_kpis`, `agent_curated_memory`, `agent_exemplars`, `agent_failure_fingerprints`, `agent_templates`…
- **Three-axis authority:** **Scope** (ring-fenced namespaces) · **Authority** (approval graph: who signs off which decision at which tier) · **Budget** (per-decision / per-turn / monthly ceilings)

**Closing line:** "Governance, provenance, fine-tuning, and observability aren't features on top — they're the substrate."

---

## Slide 4 — Product Snapshot

**Graphics:** Real product screens, multi-panel, no stage disclaimers. **Hero = a leaf orgchart of agent departments** where a professional-but-non-technical user creates and manages agents using familiar workplace conventions.

**Top title:** "Build your agent workforce the way you build a team."

**Hero panel — Orgchart builder:** Departments of atomic agents shown as a leaf/tree orgchart. A non-technical user adds an agent by filling familiar fields — **job description, KPIs, authority/approval tier, who it reports to** — no code. New agent slots into its department and works within its lane.

**Supporting panel — Runtime edit:** Change an agent's powers (scope/authority/budget) by editing its card — takes effect instantly, no redeploy, version bumped.

**Supporting panel — Audit replay:** Replay any past decision: which agent, what it touched, who approved which tier, what it cost.

**Bottom caption:** "Non-technical operators build and run the workforce. Multi-tenant by construction. Every agent versioned, every decision auditable."

---

## Slide 5 — Why Now

**Graphics:** Three "converging forces" columns, one hero stat each. Bottom bar = the open-window conclusion.

**Top title:** "Why now"

**Column 1 (LEAD) — The frontier-model push is stalling on cost & control:** "Companies are *winding down* the rush to push frontier models into daily use — it's expensive and out of control, and no one knows how to do it right. Meta is shifting off Anthropic toward its own models. Uber caps tokens per employee per month. Many are **freezing agentic experimentation until governance is in place.**"

→ **Hero stat: 40%+ of agentic AI projects will be cancelled by end of 2027 (Gartner).**

**Column 2 — Sprawl + governance gap is now board-level:** "<15 agents per enterprise in 2025 → 150k+ by 2028. Most can't govern what they already have."

→ **Hero stat: 70% say their AI governance is "not fit for purpose" (IBM).**

**Column 3 — Regulation + analysts make it non-optional:** "FINRA (missing decision traces = books-and-records violations), NAIC, HIPAA, EU AI Act high-risk obligations (enforce Aug 2026). Gartner's 2026 Hype Cycle names a new **Agent Development Life Cycle (ADLC)** category."

→ **Hero stat: ADLC — nascent and unowned.**

**Bottom bar (conclusion):** "The hyperscalers shipped agent *registries* in 2026 — so a catalog is now a checkbox. **But a catalog isn't governance.** The governance-by-construction lane is open — for maybe 18–24 months."

---

## Slide 6 — Go-to-Market & Wedge

**Graphics:** Phased timeline with the buyer for each phase merged into it. A wedge-capability panel anchors "why they let us in."

**Top title:** "Land with design partners, prove governance, then go commercial."

**Timeline (buyers merged into phases):**

- **NOW — Design-partner pilots in financial-services ops.** Audit-mandatory, approval-heavy workflows. *Champion: Head of GRC + CISO (risk gate); sponsor: Chief AI Officer (owns AI budget, ~76% of orgs).*
- **NEXT — Commercial in FS, expand to adjacent regulated verticals** (insurance claims, healthcare ops). *Buyer: CAIO economic owner; CISO + GRC co-sign.*
- **THEN — Horizontal governed orgchart** for any enterprise's AI workforce. *Buyer: CAIO as platform owner; Ops leads as daily users.*

**Wedge panel — "Why they let us in" (the capability):**

- **Every agent is immediately observable.**
- **Every agent mutation is recorded as a line in the database.**
- **Costs are precisely controlled** (per-agent ceilings).
- **Instrument calls & traces are visible and AI-analyzed in real time.**

**Non-technical operator workflow (how a workforce gets built):**

1. Share a **job description** with the agent builder
2. Share the **KPIs**
3. Decide the agent's **level of autonomy**
4. All bound by **least-privilege access**

**Bottom line:** "Sell the consequences — observable, auditable, cost-controlled, least-privilege by construction. Architecture in the demo, not the pitch."

---

## Slide 7 — Business Model

**Graphics:** Simple, confident layout. One dominant pricing mechanic, a pilot→subscription conversion arrow, and an ACV strip.

**Top title:** "A simple, consumption-aligned model."

**Core mechanic (hero):** "Orograph charges a **10–15% premium on token-based API pricing** — on top of OpenRouter or direct-provider rates, scaled by model. Customers pay it happily because the **atomic-agent architecture makes their token use dramatically more efficient** — better architecture, lower net cost, even with the premium."

**Why customers accept the premium:** Cheap atomic agents + right-sized models + capped budgets → lower total spend than self-built black boxes that token-max. The premium is a fraction of what governance + efficiency saves them.

**Motion:** **Paid design-partner pilots → convert to subscription.** Revenue grows automatically as the customer's governed fleet (and its token throughput) scales.

**ACV strip (directional, preliminary — replace with real targets):**

- **Paid pilot:** ~$25K–$75K
- **Early commercial ACV:** ~$100K–$300K, rising with managed token spend
- **Expansion:** ACV compounds as the AI workforce scales from dozens to thousands of agents

**Framing line:** "We make money in proportion to the value we govern — and our architecture makes the customer's bill *smaller*, not bigger."

---

## Slide 8 — Moat

**Graphics:** Stacked deepening "moat" visual with the replicating-governance layer as the headline. Side panel = named-competitor differentiation. Bottom = hyperscaler risk reframed as strength.

**Top title:** "The moat isn't a catalog. It's a replicating governance system that becomes a copy of the company."

**Headline moat — the replicating governance system:** "As a company adopts Orograph, it progressively encodes its **authority, governance, and access** into the agent orgchart — effectively building a **living copy of how the company actually decides and who's allowed to do what.** Ripping that out for a comparable product becomes extremely hard. The governance insight comes from **explicit rules + implicit feedback** given to agents over time — and we use it to build a **governance dataset that makes deployment faster for the next comparable company.** Governance, the knowledge behind it, and the ability to render it as a governed agent orgchart — that's the moat."

**Supporting layers:**

- **Governance by construction** — authority/scope/budget *are* the data model; can't be retrofitted. Copycats under-build it and ship sprawl-in-a-database.
- **The coherence apparatus** — the hard-to-copy validator/authority engine (the "coherence tax" is the barrier).
- **Architecture-driven efficiency** — cheap atomic agents in departments; the efficiency that funds the pricing.

**Differentiation triangle (named):**

- **vs no-code builders (Relevance AI, Lindy, Gumloop, n8n):** they let you *build* agents fast; they don't *govern* them.
- **vs security overlays (Zenity, Straiker):** they watch agents from the outside *after* the fact; we make ungoverned agents impossible.
- **vs Salesforce Agentforce:** same governed-metadata idea, but open, multi-channel, not locked to one CRM.

**Hyperscaler risk → strength (bottom):** "AWS, Google, and Microsoft shipped agent *registries* in 2026. Good — they validated the catalog and commoditized it for us. **A catalog tells you what agents exist. It doesn't govern them.** The replicating governance layer is the part they're not building."

---

## Slide 9 — Vision

**Graphics:** A horizon/arc visual — from "governed agents today" to "the orgchart for the AI workforce."

**Top title:** "Where this goes: the orgchart for the governed AI workforce."

**The arc:** Governed agent orgchart (today) → every enterprise runs thousands of atomic agents in governed departments → Orograph becomes the **system of record for who (human or agent) is allowed to do what, and what they decided** → cross-company governance intelligence makes every new deployment faster and safer.

**Closing vision line:** "Every company will run an AI workforce. The ones that win will run a *governed* one — and that workforce will live on Orograph's orgchart."

---

## Slide 10 — Status & Ask

**Graphics:** Two-panel layout. Left = current status; right = the ask with a large watermark number (**$1.5M**).

**Top title:** "Status & ask."

**Current status (left):**

- Solo founder.
- **Working prototype is live** — governed agent orgchart, runtime edits, audit replay, cost control.
- **Design partners interested in pilots: Lego, Maersk, and PE funds (for their portfolio companies).**

**The ask (right): $1.5M pre-seed** to:

1. Harden the prototype into a deployable product
2. Run parallel FS design-partner pilots
3. Make the founding hires (engineering + GTM)
4. Establish the governance-dataset moat before the 18–24 month window closes

---

## Appendix (optional, for Q&A — not in main flow)

- TAM detail (IDC: agentic AI >26% of IT spend / $1.3T by 2029).
- Architecture deep-dive (full schema, three-axis authority enforcement, multi-tenant isolation).
- Competitive teardown (per-competitor why-they-lose notes).
- Regulatory driver detail (FINRA 2026, NAIC, HIPAA, EU AI Act timelines).
