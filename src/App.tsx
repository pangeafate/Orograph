import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  LockKeyhole,
  Maximize2,
  Network,
  PencilLine,
  Radar,
  ShieldCheck,
  SplitSquareHorizontal,
  Target,
  TimerReset,
  Workflow
} from "lucide-react";

type Slide = {
  kicker: string;
  title: string;
  className?: string;
  content: ReactNode;
};

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="pill">{children}</span>
);

const MiniMetric = ({
  value,
  label,
  tone = "violet"
}: {
  value: string;
  label: string;
  tone?: "violet" | "cyan" | "amber";
}) => (
  <div className={`miniMetric miniMetric--${tone}`}>
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const AgentCard = ({
  name,
  role,
  meta
}: {
  name: string;
  role: string;
  meta: string;
}) => (
  <div className="agentCard">
    <div className="agentCard__top">
      <Bot size={18} />
      <span>{name}</span>
    </div>
    <strong>{role}</strong>
    <small>{meta}</small>
  </div>
);

const OrgChart = () => (
  <div className="orgChart">
    <div className="orgNode orgNode--manager">
      <ShieldCheck size={22} />
      <div>
        <span>Manager agent</span>
        <strong>Approves tiered decisions</strong>
      </div>
    </div>
    <div className="orgRail" />
    <div className="orgLeaves">
      <AgentCard name="Analyst" role="scope: finance.ops" meta="budget: $8 / turn" />
      <AgentCard name="Reviewer" role="authority: tier 2" meta="model: small-reasoning" />
      <AgentCard name="Clerk" role="tools: ledger.read" meta="retention: 30 days" />
      <AgentCard name="Auditor" role="KPI: decision trace" meta="origin: template.fs" />
    </div>
  </div>
);

const SchemaPanel = () => (
  <div className="schemaPanel">
    <div className="panelHeader">
      <Database size={18} />
      <span>governed data model</span>
    </div>
    <div className="schemaBlock">
      <code>agents</code>
      <p>
        ~33 columns: identity, 10 prompt-fragment slots, grant pointers,
        runtime, lifecycle.
      </p>
    </div>
    <div className="schemaBlock">
      <code>satellite tables</code>
      <p>
        agent_spec_versions, tool_access, autonomy, job_description, KPIs,
        memory, exemplars, failure fingerprints, templates.
      </p>
    </div>
    <div className="axisGrid">
      <span>Scope</span>
      <span>Authority</span>
      <span>Budget</span>
    </div>
  </div>
);

const ProductScreen = () => (
  <div className="productScreen">
    <div className="screenBar">
      <span />
      <span />
      <span />
      <strong>Agent workforce</strong>
    </div>
    <div className="workspaceGrid">
      <div className="sidebar">
        <Pill>Finance Ops</Pill>
        <Pill>Claims</Pill>
        <Pill>Revenue Ops</Pill>
      </div>
      <div className="workspaceMain">
        <OrgChart />
      </div>
    </div>
  </div>
);

const RuntimeCard = () => (
  <div className="controlPanel">
    <div className="panelHeader">
      <PencilLine size={18} />
      <span>runtime edit</span>
    </div>
    <label>
      Scope
      <strong>finance.ops.invoices</strong>
    </label>
    <label>
      Authority tier
      <strong>tier 2 - manager signoff</strong>
    </label>
    <label>
      Budget
      <strong>$8 / turn, $1.2k / month</strong>
    </label>
    <div className="versionBadge">version bumped instantly</div>
  </div>
);

const AuditCard = () => (
  <div className="controlPanel">
    <div className="panelHeader">
      <FileSearch size={18} />
      <span>audit replay</span>
    </div>
    <div className="traceLine">
      <span>agent</span>
      <strong>Reviewer-04</strong>
    </div>
    <div className="traceLine">
      <span>touched</span>
      <strong>vendor.invoice</strong>
    </div>
    <div className="traceLine">
      <span>approved</span>
      <strong>tier 2 / Ravi S.</strong>
    </div>
    <div className="traceLine">
      <span>cost</span>
      <strong>$0.38</strong>
    </div>
  </div>
);

const slides: Slide[] = [
  {
    kicker: "01 / title",
    title: "Orograph",
    className: "slide--title",
    content: (
      <div className="titleSlide">
        <div className="constellation" aria-hidden="true">
          <span className="dot dot--a" />
          <span className="dot dot--b" />
          <span className="dot dot--c" />
          <span className="dot dot--d" />
        </div>
        <h1>Orograph</h1>
        <p className="tagline">The operating system for a governed AI workforce.</p>
        <p className="subcopy">
          Every AI agent in your business gets a job description, a manager,
          permissions, and a budget - enforced by construction. Change what an
          agent can do without a deploy; prove who approved every decision
          without a forensics project.
        </p>
      </div>
    )
  },
  {
    kicker: "02 / problem",
    title:
      "Existing approaches to building agents have fundamental governance gaps, leading to 88% of pilots not making it to production.",
    content: (
      <div className="problemSlide">
        <div className="approachStack" aria-label="Existing approaches">
          <div className="stackLabel">Existing approaches</div>
          <div className="laneStack">
            {[
              {
                icon: BrainCircuit,
                label: "Autonomous, self-building agents",
                names: "Open Claw, Hermes",
                copy:
                  "Self-mutating black boxes that can go rogue anytime. Observability means building heavy infra, and they token-max while building themselves."
              },
              {
                icon: Workflow,
                label: "SDK / framework-built agents",
                names: "LangGraph, Mastra, OpenAI / Anthropic SDKs",
                copy:
                  "Powerful and controllable, but foundational infra comes before value. Scalability and observability come right back."
              },
              {
                icon: Bot,
                label: "Plug-and-play AI employees",
                names: "Sales and marketing agents off a website",
                copy:
                  "Easy for non-technical users, but shallow to fine-tune and missing the control mechanisms companies require."
              }
            ].map(({ icon: Icon, label, names, copy }) => (
              <div className="laneCard" key={label}>
                <Icon size={24} />
                <div>
                  <strong>{label}</strong>
                  <span>{names}</span>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="gapPointer" aria-hidden="true">
          <span>governance gap</span>
          <ArrowRight size={42} />
        </div>
        <div className="pillarBand">
          <div className="pillarIntro">
            <strong>Every organization building agents today is missing the same infrastructure.</strong>
            <span>
              Without this layer, agents multiply faster than companies can
              control, tune, observe, or audit them.
            </span>
          </div>
          <div className="pillarGrid">
            <span><ShieldCheck size={21} />Governance</span>
            <span><Fingerprint size={21} />Provenance</span>
            <span><Target size={21} />Atomic fine-tuning</span>
            <span><Radar size={21} />Observability</span>
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "03 / insight",
    title: "Stop building black boxes. Build a Governed Agentic Orgchart.",
    content: (
      <div className="insightGrid">
        <div>
          <OrgChart />
          <div className="callout">
            <strong>Orograph defines every agent as governed data, not code.</strong>
            <p>
              Job description, manager, permissions, authority tier, and budget
              are the agent. An ungoverned agent is structurally impossible,
              behavior changes by editing a row, and every action is traced to
              who approved it.
            </p>
          </div>
        </div>
        <div className="stacked">
          <SchemaPanel />
          <div className="economicUnlock">
            <Gauge size={20} />
            <p>
              Each agent stays atomic - the smallest set of skills on the
              cheapest capable model. Departments of cheap atomic agents execute
              sophisticated tasks reliably at a fraction of the cost.
            </p>
          </div>
        </div>
        <div className="substrateLine">
          Governance, provenance, fine-tuning, and observability are not
          features on top - they are the substrate.
        </div>
      </div>
    )
  },
  {
    kicker: "04 / product",
    title: "Build your agent workforce the way you build a team.",
    content: (
      <div className="productSlide">
        <ProductScreen />
        <div className="productSide">
          <RuntimeCard />
          <AuditCard />
        </div>
        <p className="bottomCaption">
          Non-technical operators build and run the workforce. Multi-tenant by
          construction. Every agent versioned, every decision auditable.
        </p>
      </div>
    )
  },
  {
    kicker: "05 / why now",
    title: "Why now",
    content: (
      <div className="forcesSlide">
        <div className="forceGrid">
          <div className="forceCard forceCard--lead">
            <TimerReset size={24} />
            <strong>The frontier-model push is stalling on cost and control.</strong>
            <p>
              Companies are winding down the rush to push frontier models into
              daily use. Meta is shifting off Anthropic toward its own models.
              Uber caps tokens per employee per month. Many are freezing
              experimentation until governance is in place.
            </p>
            <MiniMetric value="40%+" label="agentic AI projects cancelled by end of 2027 (Gartner)" tone="amber" />
          </div>
          <div className="forceCard">
            <Network size={24} />
            <strong>Sprawl plus governance gap is now board-level.</strong>
            <p>
              Less than 15 agents per enterprise in 2025 becomes 150k+ by 2028.
              Most cannot govern what they already have.
            </p>
            <MiniMetric value="70%" label="say AI governance is not fit for purpose (IBM)" tone="violet" />
          </div>
          <div className="forceCard">
            <ClipboardCheck size={24} />
            <strong>Regulation plus analysts make it non-optional.</strong>
            <p>
              FINRA, NAIC, HIPAA, and EU AI Act obligations make decision traces
              mandatory. Gartner names Agent Development Life Cycle as a new
              nascent category.
            </p>
            <MiniMetric value="ADLC" label="nascent and unowned" tone="cyan" />
          </div>
        </div>
        <div className="windowBar">
          The hyperscalers shipped agent registries in 2026, so a catalog is now
          a checkbox. But a catalog is not governance. The governance-by-construction
          lane is open - for maybe 18-24 months.
        </div>
      </div>
    )
  },
  {
    kicker: "06 / GTM",
    title: "Land with design partners, prove governance, then go commercial.",
    content: (
      <div className="gtmSlide">
        <div className="timeline">
          {[
            {
              phase: "NOW",
              text:
                "Design-partner pilots in financial-services ops. Audit-mandatory, approval-heavy workflows.",
              buyer: "Head of GRC + CISO gate; Chief AI Officer sponsor."
            },
            {
              phase: "NEXT",
              text:
                "Commercial in FS, expand to adjacent regulated verticals: insurance claims, healthcare ops.",
              buyer: "CAIO economic owner; CISO + GRC co-sign."
            },
            {
              phase: "THEN",
              text:
                "Horizontal governed orgchart for any enterprise AI workforce.",
              buyer: "CAIO as platform owner; Ops leads as daily users."
            }
          ].map((item) => (
            <div className="timelineItem" key={item.phase}>
              <span>{item.phase}</span>
              <strong>{item.text}</strong>
              <p>{item.buyer}</p>
            </div>
          ))}
        </div>
        <div className="wedgePanel">
          <h3>Why they let us in</h3>
          <div className="wedgeGrid">
            <span><Radar size={18} />Every agent is immediately observable.</span>
            <span><Database size={18} />Every mutation is a database line.</span>
            <span><Gauge size={18} />Costs are precisely controlled.</span>
            <span><BrainCircuit size={18} />Instrument calls are AI-analyzed live.</span>
          </div>
        </div>
        <div className="operatorFlow">
          <span>job description</span>
          <ArrowUpRight size={16} />
          <span>KPIs</span>
          <ArrowUpRight size={16} />
          <span>autonomy level</span>
          <ArrowUpRight size={16} />
          <span>least-privilege access</span>
        </div>
        <p className="bottomCaption">
          Sell the consequences - observable, auditable, cost-controlled,
          least-privilege by construction. Architecture in the demo, not the pitch.
        </p>
      </div>
    )
  },
  {
    kicker: "07 / model",
    title: "A simple, consumption-aligned model.",
    content: (
      <div className="modelSlide">
        <div className="pricingHero">
          <CircleDollarSign size={34} />
          <strong>10-15%</strong>
          <p>
            premium on token-based API pricing, on top of OpenRouter or direct
            provider rates, scaled by model.
          </p>
        </div>
        <div className="modelExplanation">
          <h3>Why customers accept the premium</h3>
          <p>
            Cheap atomic agents, right-sized models, and capped budgets lower
            total spend versus self-built black boxes that token-max. The
            premium is a fraction of what governance and efficiency save.
          </p>
          <div className="conversion">
            <span>paid design-partner pilots</span>
            <ArrowUpRight size={18} />
            <span>subscription</span>
            <ArrowUpRight size={18} />
            <span>fleet-scaled throughput</span>
          </div>
        </div>
        <div className="acvStrip">
          <MiniMetric value="$25K-$75K" label="paid pilot" tone="cyan" />
          <MiniMetric value="$100K-$300K" label="early commercial ACV" tone="violet" />
          <MiniMetric value="dozens -> thousands" label="agent expansion" tone="amber" />
        </div>
        <p className="bottomCaption">
          We make money in proportion to the value we govern - and our
          architecture makes the customer's bill smaller, not bigger.
        </p>
      </div>
    )
  },
  {
    kicker: "08 / moat",
    title:
      "The moat is not a catalog. It is a replicating governance system that becomes a copy of the company.",
    content: (
      <div className="moatSlide">
        <div className="moatStack">
          <div className="moatLayer moatLayer--top">
            <Layers3 size={22} />
            <strong>Replicating governance system</strong>
            <p>
              Orograph progressively encodes authority, governance, and access
              into the agent orgchart - a living copy of how the company
              decides and who is allowed to do what.
            </p>
          </div>
          <div className="moatLayer">
            <ShieldCheck size={20} />
            <strong>Governance by construction</strong>
            <span>Authority, scope, and budget are the data model.</span>
          </div>
          <div className="moatLayer">
            <KeyRound size={20} />
            <strong>Coherence apparatus</strong>
            <span>The validator and authority engine are hard to copy.</span>
          </div>
          <div className="moatLayer">
            <Gauge size={20} />
            <strong>Architecture-driven efficiency</strong>
            <span>Cheap atomic agents fund the pricing.</span>
          </div>
        </div>
        <div className="differentiation">
          <h3>Differentiation</h3>
          <p>
            <strong>vs no-code builders:</strong> they build agents fast; they do not govern them.
          </p>
          <p>
            <strong>vs security overlays:</strong> they watch after the fact; we make ungoverned agents impossible.
          </p>
          <p>
            <strong>vs Salesforce Agentforce:</strong> same metadata idea, but open, multi-channel, not locked to one CRM.
          </p>
          <div className="riskBar">
            AWS, Google, and Microsoft validated the catalog. A catalog tells
            you what exists. It does not govern it.
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "09 / vision",
    title: "Where this goes: the orgchart for the governed AI workforce.",
    content: (
      <div className="visionSlide">
        <div className="arc">
          <div className="arcStep">
            <GitBranch size={23} />
            <strong>governed agents today</strong>
          </div>
          <div className="arcStep">
            <Boxes size={23} />
            <strong>thousands of atomic agents</strong>
          </div>
          <div className="arcStep">
            <LockKeyhole size={23} />
            <strong>system of record for permission and decisions</strong>
          </div>
          <div className="arcStep">
            <BarChart3 size={23} />
            <strong>cross-company governance intelligence</strong>
          </div>
        </div>
        <div className="visionStatement">
          <p>
            Every company will run an AI workforce. The ones that win will run a
            governed one - and that workforce will live on Orograph's orgchart.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "10 / ask",
    title: "Status & ask.",
    content: (
      <div className="askSlide">
        <div className="statusPanel">
          <h3>Current status</h3>
          <ul>
            <li>Solo founder.</li>
            <li>Working prototype is live: governed orgchart, runtime edits, audit replay, cost control.</li>
            <li>Design partners interested in pilots: Lego, Maersk, and PE funds.</li>
          </ul>
        </div>
        <div className="askPanel">
          <div className="watermark">$1.5M</div>
          <h3>Pre-seed to</h3>
          <ol>
            <li>Harden the prototype into a deployable product.</li>
            <li>Run parallel FS design-partner pilots.</li>
            <li>Make the founding hires: engineering and GTM.</li>
            <li>Establish the governance-dataset moat before the 18-24 month window closes.</li>
          </ol>
        </div>
      </div>
    )
  }
];

const clampSlide = (index: number) => Math.max(0, Math.min(slides.length - 1, index));

const initialSlide = () => {
  const fromHash = Number.parseInt(window.location.hash.replace("#", ""), 10);
  return Number.isFinite(fromHash) ? clampSlide(fromHash - 1) : 0;
};

export function App() {
  const [index, setIndex] = useState(initialSlide);
  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  const goTo = useCallback((nextIndex: number) => {
    setIndex(clampSlide(nextIndex));
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(index + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  const enterFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  };

  return (
    <main className="deckShell">
      <div className="progress" style={{ "--progress": `${progress}%` } as CSSProperties} />
      <section className={`slide ${slide.className ?? ""}`} aria-label={`${index + 1}. ${slide.title}`}>
        <div className="slideFrame">
          <header className="slideHeader">
            <span className="kicker">{slide.kicker}</span>
            <span className="brand">Orograph</span>
          </header>
          {slide.className !== "slide--title" && <h2>{slide.title}</h2>}
          <div className="slideBody">{slide.content}</div>
        </div>
      </section>
      <nav className="deckControls" aria-label="Slide controls">
        <button
          type="button"
          className="iconButton"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="counter">{String(index + 1).padStart(2, "0")} / {slides.length}</span>
        <button
          type="button"
          className="iconButton"
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          className="iconButton"
          onClick={enterFullscreen}
          aria-label="Enter fullscreen"
          title="Enter fullscreen"
        >
          <Maximize2 size={18} />
        </button>
      </nav>
      <div className="dotNav" aria-label="Slide list">
        {slides.map((item, dotIndex) => (
          <button
            type="button"
            key={item.kicker}
            className={dotIndex === index ? "active" : ""}
            onClick={() => goTo(dotIndex)}
            aria-label={`Go to slide ${dotIndex + 1}`}
            title={item.title}
          />
        ))}
      </div>
    </main>
  );
}
