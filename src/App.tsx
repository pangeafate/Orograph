import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Ban,
  Bot,
  GitCompare,
  History,
  Stamp,
  Table2,
  BrainCircuit,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  Eye,
  FileSearch,
  Fingerprint,
  Gauge,
  Handshake,
  KeyRound,
  Layers3,
  Maximize2,
  Milestone,
  Network,
  Rocket,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench
} from "lucide-react";
import GlitchHeading from "./components/GlitchHeading.jsx";
import { LakestromDotField } from "./components/LakestromDotField";
import { mainSlides } from "./speedrunSlides";

type Slide = {
  kicker: string;
  title: string;
  accentPhrases?: string[];
  className?: string;
  /** superseded slides kept at the end of the deck for reference, not for the pitch */
  retired?: boolean;
  content: ReactNode;
};

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

/* ---------------------------------------------------------------------------
   Versus — the side-by-side comparison used on slides 07, 08, 09.
   A "concede" row is one where the market genuinely wins. It is deliberate:
   giving the competitor a real win buys more credibility than any claim above.
--------------------------------------------------------------------------- */

type VersusRow = {
  label: string;
  market: string;
  oro: string;
  /** the market genuinely wins this row */
  concede?: boolean;
  /** neither side wins — say so rather than implying one does */
  tie?: boolean;
};

const Versus = ({
  rows,
  marketHead = "The market's way",
  oroHead = "Orograph"
}: {
  rows: VersusRow[];
  marketHead?: string;
  oroHead?: string;
}) => (
  <div className="versusTable">
    <div className="versusHead">
      <span />
      <span className="versusHead__market">{marketHead}</span>
      <span className="versusHead__oro">{oroHead}</span>
    </div>
    {rows.map((row) => (
      <div
        className={`versusRow${row.concede ? " versusRow--concede" : ""}${
          row.tie ? " versusRow--tie" : ""
        }`}
        key={row.label}
      >
        <span className="versusLabel">{row.label}</span>
        <span className="versusCell versusCell--market">{row.market}</span>
        <span className="versusCell versusCell--oro">{row.oro}</span>
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------------------------------
   Personnel file — slide 05. One agent record, one screen, four buyer concerns.
   NOTE: replace with a real product screenshot before this is shown live.
--------------------------------------------------------------------------- */

const PersonnelFile = () => (
  <div className="personnelFile">
    <div className="pfHeader">
      <div className="pfIdentity">
        <Bot size={20} />
        <div>
          <strong>claims.triage.completeness</strong>
          <span>Claims Operations &middot; active since 12 Mar</span>
        </div>
      </div>
      <span className="pfState">active</span>
    </div>

    <div className="pfGrid">
      <div className="pfBlock">
        <div className="pfBlockHead">
          <Users size={15} />
          <span>identity</span>
          <small>CAIO &middot; Ops</small>
        </div>
        <dl>
          <div><dt>job description</dt><dd>Check FNOL packs for completeness, draft the missing-information request, route.</dd></div>
          <div><dt>business owner</dt><dd>M. Larsen, Head of Claims Ops</dd></div>
          <div><dt>sponsor</dt><dd>R. Sandhu, Chief AI Officer</dd></div>
          <div><dt>manager / reports</dt><dd>claims.intake.pmo &middot; 3 subordinates</dd></div>
        </dl>
      </div>

      <div className="pfBlock">
        <div className="pfBlockHead">
          <KeyRound size={15} />
          <span>capability</span>
          <small>CISO &middot; GRC</small>
        </div>
        <ul className="pfGrants">
          <li><code>policy.read</code><em>approved 12 Mar &middot; M. Larsen</em></li>
          <li><code>fnol.read</code><em>approved 12 Mar &middot; M. Larsen</em></li>
          <li><code>letter.draft</code><em>approved 04 Apr &middot; R. Sandhu</em></li>
          <li className="pfGrants__denied">
            <code>payment.post</code><em>denied &mdash; tier 3, no sponsor</em>
          </li>
        </ul>
        <p className="pfScope">scope <b>claims.eu.*</b> &middot; read-write on 2 of 14 namespaces</p>
      </div>

      <div className="pfBlock">
        <div className="pfBlockHead">
          <CircleDollarSign size={15} />
          <span>budget</span>
          <small>CAIO &middot; Finance</small>
        </div>
        <div className="pfBudget">
          <div className="pfBudgetBar"><span style={{ width: "38%" }} /></div>
          <p><b>€412</b> of €1,100 this month &middot; €0.40 per decision ceiling</p>
        </div>
        <div className="pfBlockHead pfBlockHead--tight">
          <ShieldCheck size={15} />
          <span>assurance</span>
          <small>GRC</small>
        </div>
        <p className="pfEvals">
          evals <b>0.94</b> / threshold 0.90 &middot; access review 02 Aug &middot; expires 31 Dec
        </p>
      </div>
    </div>

    <div className="pfHistory">
      <div className="pfHistoryHead">
        <ScrollText size={15} />
        <span>decision history</span>
        <small>every entry replays to its objective, context, effects and approver</small>
      </div>
      <div className="pfHistoryRows">
        {[
          ["09:14", "FNOL-88214 incomplete → letter drafted", "tier 1 · auto", "€0.06"],
          ["08:57", "FNOL-88209 → escalated, policy ambiguous", "tier 2 · M. Larsen", "€0.09"],
          ["08:52", "payment.post attempted → refused, no grant", "denied", "€0.00"]
        ].map(([time, action, tier, cost]) => (
          <div className="pfHistoryRow" key={time}>
            <time>{time}</time>
            <span>{action}</span>
            <em>{tier}</em>
            <b>{cost}</b>
          </div>
        ))}
      </div>
    </div>

    <div className="pfFooter">
      <FileSearch size={15} />
      <span>1,284 decisions &middot; every one reconstructable</span>
      <em>export evidence bundle</em>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   Elbow connectors for the three integration bands on slide 05.
   "out" fans one node into three; "in" converges three back into one.
--------------------------------------------------------------------------- */

const ElbowFan = ({ dir }: { dir: "out" | "in" }) => {
  const id = `elbow-${dir}`;
  const paths =
    dir === "out"
      ? ["M0 46 H22 V11 H46", "M0 46 H46", "M0 46 H22 V81 H46"]
      : ["M0 11 H26 V46 H46", "M0 46 H46", "M0 81 H26 V46 H46"];
  return (
    <svg className="elbowFan" width="54" height="92" viewBox="0 0 54 92" aria-hidden="true">
      <defs>
        <marker id={id} markerWidth="6" markerHeight="6" refX="5.4" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--violet)" />
        </marker>
      </defs>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--violet)"
          strokeWidth="1.5"
          markerEnd={`url(#${id})`}
        />
      ))}
    </svg>
  );
};

const AppendixImage = ({
  src,
  alt,
  note
}: {
  src: string;
  alt: string;
  note?: ReactNode;
}) => (
  <div className={`appendixImageSlide${note ? " appendixImageSlide--note" : ""}`}>
    {note ? <p className="appendixNote">{note}</p> : null}
    <div
      className="appendixImageFrame"
      role="img"
      aria-label={alt}
      style={{ "--appendix-image": `url(${src})` } as CSSProperties}
    />
  </div>
);

const appendixSlides: Slide[] = [
  {
    kicker: "12 / product",
    title: "Product",
    className: "slide--appendixBreaker",
    content: (
      <div className="appendixBreaker">
        <p className="appendixBreakerTitle">Managed AI workforce for SMEs&rsquo; daily work</p>
      </div>
    )
  },
  {
    kicker: "13 / product",
    title: "All agents are visible, with their actions.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p01.png" alt="Agents page — every agent with what it is responsible for, grouped under its coordinator" />
  },
  {
    kicker: "13 / product",
    title: "Ask the System Engineer about anything on the platform — and ask it to fix things.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p02.png" alt="Ask-about-this-page panel — the System Engineer checks a failed run and explains it" />
  },
  {
    kicker: "13 / product",
    title: "See which agents are deployed and how they work with one another.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p03.png" alt="Graph view — deployed agents and the wiring between them" />
  },
  {
    kicker: "13 / product",
    title: "Talk to any agent, even before it gets a dedicated channel.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p04.png" alt="Chats — talk to every agent from the browser" />
  },
  {
    kicker: "13 / product",
    title: "Build an agent from a plain description of its responsibilities.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p05.png" alt="Agent Design — a design conversation that builds a new agent" />
  },
  {
    kicker: "13 / product",
    title: "Every detail of an agent can be modified — prompt segments, skills, crons, memories, rules, steps, reasoning and more.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p06.png" alt="Agent loadout card — models, limits, instructions, equipment, memory, schedule" />
  },
  {
    kicker: "13 / product",
    title: "Any version can be rolled back in seconds — and you see the changes each version made.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p07.png" alt="Versions & history — every change with a restore button" />
  },
  {
    kicker: "13 / product",
    title: "Several hundred tools and skills reliably assemble 90% of agents without extra work.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p08.png" alt="Tools catalogue — reusable read and write tools" />
  },
  {
    kicker: "13 / product",
    title: "In-depth price control at agent, model and function levels.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p09.png" alt="Cost — where the money goes, by agent" />
  },
  {
    kicker: "13 / product",
    title: "In-depth price control at agent, model and function levels.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p10.png" alt="Cost — spend by day and re-pricing on another model" />
  },
  {
    kicker: "13 / product",
    title: "Built-in tools monitor how much work shifts from people to agents.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p11.png" alt="Agent work — pieces of business work done by agents vs people" />
  },
  {
    kicker: "13 / product",
    title: "Incidents are visible and traceable to a specific conversation or action.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p12.png" alt="Incidents — events traced to the conversation behind them" />
  },
  {
    kicker: "13 / product",
    title: "Ready-to-use thin dashboards run on the out-of-the-box agents.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p13.png" alt="CRM dashboard — fields recorded by the agents" />
  },
  {
    kicker: "13 / product",
    title: "Pre-built dashboards for the main business cases — CRM, second brain, project management and more.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p14.png" alt="Pre-built dashboards — CRM, Datacore, clusters and PMO" />
  },
  {
    kicker: "13 / product",
    title: "Permissions: what agents can and cannot do autonomously — set in simple language.",
    className: "slide--appendixImage",
    content: <AppendixImage src="/product/p15.png" alt="Permissions — who decides, agent or person, set in plain language" />
  },
  {
    kicker: "13 / thank you",
    title: "Thank you for reading",
    className: "slide--appendixBreaker slide--closing",
    content: null
  }
];

// main deck → product divider → product screenshots;
// the leading number of every kicker follows the slide's actual position
const params = new URLSearchParams(window.location.search);
const onlyFilter = params.get("only")?.toLowerCase();

const allSlides: Slide[] = [
  ...mainSlides,
  ...appendixSlides
].map((slide, i) => ({
  ...slide,
  kicker: slide.kicker.replace(/^\d+/, String(i + 1).padStart(2, "0"))
}));

// dev aids: ?only=<kicker text> shows just the matching slides; ?measure reports overflow
const slides: Slide[] = onlyFilter
  ? allSlides.filter((slide) => slide.kicker.toLowerCase().includes(onlyFilter))
  : allSlides;

const clampSlide = (index: number) => Math.max(0, Math.min(slides.length - 1, index));

const initialSlide = () => {
  const fromHash = Number.parseInt(window.location.hash.replace("#", ""), 10);
  return Number.isFinite(fromHash) ? clampSlide(fromHash - 1) : 0;
};

const isCaptureMode = () => new URLSearchParams(window.location.search).has("capture");

const SlideSection = ({ item, index }: { item: Slide; index: number }) => (
  <section
    className={`slide ${item.className ?? ""} ${item.retired ? "slide--retired" : ""}`}
    aria-label={`${index + 1}. ${item.title}`}
  >
    <div className="slideFrame">
      <header className="slideHeader">
        <span className="kicker">
          {item.kicker}
          {item.retired && <b className="retiredBadge">retired</b>}
        </span>
        <span className="brand">Orograph</span>
      </header>
      {item.className !== "slide--title" && (
        <GlitchHeading as="h2" text={item.title} accentPhrases={item.accentPhrases} />
      )}
      <div className="slideBody">{item.content}</div>
    </div>
  </section>
);

export function App() {
  const [index, setIndex] = useState(initialSlide);
  const captureMode = useMemo(isCaptureMode, []);
  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  const goTo = useCallback((nextIndex: number) => {
    setIndex(clampSlide(nextIndex));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("captureMode", captureMode);
    const setCaptureScale = () => {
      document.documentElement.style.setProperty("--capture-scale", `${window.innerWidth / 1500}`);
    };

    if (captureMode) {
      setCaptureScale();
      window.addEventListener("resize", setCaptureScale);
    }

    return () => {
      document.body.classList.remove("captureMode");
      document.documentElement.style.removeProperty("--capture-scale");
      window.removeEventListener("resize", setCaptureScale);
    };
  }, [captureMode]);

  useEffect(() => {
    window.history.replaceState(null, "", `${window.location.search}#${index + 1}`);
  }, [index]);

  useEffect(() => {
    if (!params.has("measure")) return;
    const timer = window.setTimeout(() => {
      const frame = document.querySelector<HTMLElement>(".slideFrame");
      const body = document.querySelector<HTMLElement>(".slideBody");
      if (!frame || !body) return;
      const frameBottom = frame.getBoundingClientRect().bottom;
      const spill = Array.from(body.querySelectorAll<HTMLElement>("*")).reduce(
        (max, el) => Math.max(max, el.getBoundingClientRect().bottom - frameBottom),
        0
      );
      let out = document.getElementById("srMeasure");
      if (!out) {
        out = document.createElement("pre");
        out.id = "srMeasure";
        out.hidden = true;
        document.body.appendChild(out);
      }
      out.textContent = JSON.stringify({
        kicker: slides[index].kicker,
        viewport: [window.innerWidth, window.innerHeight],
        bodyOverflow: body.scrollHeight - body.clientHeight,
        frameOverflow: frame.scrollHeight - frame.clientHeight,
        spillPastFrame: Math.round(spill)
      });
    }, 1200);
    return () => window.clearTimeout(timer);
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
      <SlideSection item={slide} index={index} />
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
