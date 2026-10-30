import type { ReactNode } from "react";
import { Boxes, CheckCircle2, Mountain, Network, Rocket, ShieldCheck, Users, Wrench, XCircle } from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v12-competition.css";

/* "12 / competition" as a 3×3 positioning matrix: how bespoke the agents are (across)
   against who builds and runs them (up). Every word of the original table is kept. */

const TITLE =
  "Orograph competes on governed customization and managed outcomes—not agent creation alone.";
const ACCENT = ["governed customization and managed outcomes"];

const Source = ({ children }: { children: ReactNode }) => (
  <p className="srSource">{children}</p>
);

type Player = { camp: string; names?: string; sell: string; left: string; icon: ReactNode; og?: boolean };

const SUITES: Player = {
  camp: "Suites",
  names: "Microsoft Copilot Studio, HubSpot, Odoo",
  sell: "Agents inside their tool, with platform governance",
  left: "One vendor’s models and data; the company adapts to the tool",
  icon: <Boxes size={18} />
};
const PLATFORMS: Player = {
  camp: "Agent platforms",
  names: "Relevance AI",
  sell: "Self-serve agent creation, approvals, routing, monitoring",
  left: "The company still designs, builds and runs its agents",
  icon: <Network size={18} />
};
const DIY: Player = {
  camp: "Gateways and DIY",
  names: "OpenRouter, LiteLLM, Lovable, n8n",
  sell: "Routing and building tools",
  left: "Needs builders and governance the company doesn’t have",
  icon: <Wrench size={18} />
};
const LABS: Player = {
  camp: "Labs’ services arms and consultancies",
  names: "Ode with Anthropic, OpenAI Deployment Co.",
  sell: "Embedded engineers",
  left: "Enterprise cost base, tied to one model",
  icon: <Users size={18} />
};
const DEPLOYED: Player = {
  camp: "Agent platforms with deployment teams",
  names: "Wonderful",
  sell: "Enterprise agent platform; local teams build it with you, then hand it over",
  left: "Built for large regulated enterprises; after handover, the company runs it",
  icon: <Rocket size={18} />
};
const OROGRAPH: Player = {
  camp: "Orograph",
  sell: "Builds, runs and improves bespoke agents on one governed runtime",
  left: "A managed outcome at SME cost, sold to the owner",
  icon: <Mountain size={18} />,
  og: true
};

const COLS = ["Tool-shaped", "Configurable", "Bespoke"];
/* top row first */
const ROWS = ["Managed outcome", "Engineers embedded", "The company builds and runs"];
const GRID: (Player | null)[][] = [
  [null, null, OROGRAPH],
  [null, DEPLOYED, LABS],
  [SUITES, PLATFORMS, DIY]
];

const Cell = ({ p }: { p: Player | null }) =>
  p ? (
    <div className={`v12M__cell${p.og ? " v12M__cell--og" : ""}`}>
      <div className="v12M__who">
        <span className="v12M__icon">{p.icon}</span>
        <span>
          <b>{p.camp}</b>
          {p.names ? <em>{p.names}</em> : null}
        </span>
      </div>
      <p className="v12M__sell">{p.sell}</p>
      <p className="v12M__left">
        {p.og ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
        <span>{p.left}</span>
      </p>
    </div>
  ) : (
    <div className="v12M__cell v12M__cell--empty" aria-hidden="true" />
  );

const matrix: DeckSlide = {
  kicker: "12 / competition",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v12M">
      <p className="v12M__legend">
        <span className="srLabel">Each cell</span>
        <b>Who</b>
        <i aria-hidden="true">&middot;</i>
        <span>What they sell</span>
        <i aria-hidden="true">&middot;</i>
        <span className="v12M__legendLeft"><XCircle size={13} />What is left for a 150&ndash;500-person company</span>
      </p>
      <div className="v12M__board">
        <div className="v12M__yAxis">
          <span className="srLabel">Who builds and runs the agents</span>
        </div>
        {GRID.map((row, r) => [
          <span className="v12M__rowLabel" key={`l${r}`}>{ROWS[r]}</span>,
          ...row.map((p, c) => <Cell p={p} key={`${r}${c}`} />)
        ])}
        <span className="v12M__corner" aria-hidden="true" />
        {COLS.map((c) => (
          <span className="v12M__colLabel" key={c}>{c}</span>
        ))}
        <div className="v12M__xAxis">
          <span className="srLabel">How bespoke the agents are</span>
        </div>
      </div>

      <aside className="v12M__side">
        <div className="v12M__moat">
          <ShieldCheck size={24} />
          <p>
            <b>Every governed action makes Orograph harder to replace.</b> Inside each
            tenant&rsquo;s boundary we accumulate tested capabilities, agent
            configurations, operating knowledge, evaluation cases and governance
            history.
          </p>
        </div>
        <Source>Sacra, Fortune, TNW, Business Wire, TechCrunch, vendor documentation</Source>
      </aside>
    </div>
  )
};

const variants: DeckSlide[] = [matrix];

export default variants;
