import type { ReactNode } from "react";
import {
  Building2,
  Cloud,
  Database,
  Equal,
  Handshake,
  KeyRound,
  Plus,
  ServerCog,
  Share2,
  Target,
  Users,
  Zap
} from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v04-solution.css";

const TITLE =
  "Orograph is designed to fill this gap: a platform for managed AI agents + a consulting service that helps customers implement meaningful AI for business.";
const ACCENT = ["managed AI agents + a consulting service"];

type Item = { icon: ReactNode; lead: string; text: string };

const consulting: Item[] = [
  {
    icon: <KeyRound size={18} />,
    lead: "IP and tech belong to the Client.",
    text: "They own and compound what makes their business uniquely competitive: bespoke skills, prompts and data."
  },
  {
    icon: <Users size={18} />,
    lead: "No engineers needed.",
    text: "Independent business consultants and Orograph’s own people create and manage bespoke AI agents for the Client — without engineers or engineering knowledge."
  },
  {
    icon: <Share2 size={18} />,
    lead: "Network effect working for the Client.",
    text: "90% of the functionality is already assembled; new cases compound and are shared across all Clients. One click updates the skills for hundreds of tenants and thousands of their agents, while ensuring resilience."
  }
];

const platform: Item[] = [
  {
    icon: <Zap size={18} />,
    lead: "Lightning-fast creation",
    text: "of any number of infinitely customisable AI agents — time to value under 1 week."
  },
  {
    icon: <Database size={18} />,
    lead: "Agents-as-data,",
    text: "created in bulk and run securely across thousands of tenants."
  },
  {
    icon: <Cloud size={18} />,
    lead: "Runs anywhere:",
    text: "on premise, hybrid or in the cloud — on any LLM, open-source or not."
  }
];

/* ---------- B: the equation — consulting + platform = meaningful AI ---------- */
const Term = ({ name, icon, items, mod }: { name: string; icon: ReactNode; items: Item[]; mod: string }) => (
  <section className={`v04B__term v04B__term--${mod}`}>
    <div className="v04B__head">
      <span className="v04B__icon">{icon}</span>
      <h3>{name}</h3>
    </div>
    <ul>
      {items.map((it) => (
        <li key={it.lead}>
          <span className="v04B__bullet">{it.icon}</span>
          <p>
            <b>{it.lead}</b> {it.text}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

const variantB: DeckSlide = {
  kicker: "04 / the solution · variant B",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v04B">
      <Term name="Consulting service" icon={<Handshake size={24} />} items={consulting} mod="consult" />
      <span className="v04B__op" aria-hidden="true">
        <Plus size={30} strokeWidth={2.6} />
      </span>
      <Term name="Technology platform" icon={<ServerCog size={24} />} items={platform} mod="tech" />
      <span className="v04B__op v04B__op--eq" aria-hidden="true">
        <Equal size={30} strokeWidth={2.6} />
      </span>
      <section className="v04B__result">
        <span className="srLabel">the gap, filled</span>
        <span className="v04B__target">
          <Target size={46} strokeWidth={1.6} />
        </span>
        <strong>meaningful AI for business</strong>
        <span className="v04B__forClient">
          <Building2 size={16} /> for the Client
        </span>
      </section>
    </div>
  )
};

/* ---------- C: hub and spoke — the Client in the middle ---------- */
const Spoke = ({ it, n, side }: { it: Item; n: number; side: "l" | "r" }) => (
  <div className={`v04C__node v04C__node--${side}`}>
    <span className="v04C__nIcon">{it.icon}</span>
    <div>
      <span className="v04C__num">0{n}</span>
      <p>
        <b>{it.lead}</b> {it.text}
      </p>
    </div>
  </div>
);

const variantC: DeckSlide = {
  kicker: "04 / the solution · variant C",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v04C">
      <div className="v04C__side v04C__side--l">
        <div className="v04C__sideHead">
          <span className="v04C__sIcon"><Handshake size={22} /></span>
          <h3>Consulting service</h3>
        </div>
        <div className="v04C__nodes">
          {consulting.map((it, i) => (
            <Spoke key={it.lead} it={it} n={i + 1} side="l" />
          ))}
        </div>
      </div>

      <div className="v04C__mid">
        <svg className="v04C__wires" viewBox="0 0 300 600" preserveAspectRatio="none" aria-hidden="true">
          {[100, 300, 500].map((y) => (
            <path key={`l${y}`} className="v04C__wire v04C__wire--l" d={`M0 ${y} C 80 ${y}, 70 300, 150 300`} />
          ))}
          {[100, 300, 500].map((y) => (
            <path key={`r${y}`} className="v04C__wire v04C__wire--r" d={`M300 ${y} C 220 ${y}, 230 300, 150 300`} />
          ))}
        </svg>
        <div className="v04C__hub">
          <span className="v04C__hubRing" aria-hidden="true" />
          <Building2 size={34} strokeWidth={1.7} />
          <strong>the Client</strong>
          <span>meaningful AI for business</span>
        </div>
      </div>

      <div className="v04C__side v04C__side--r">
        <div className="v04C__sideHead">
          <span className="v04C__sIcon v04C__sIcon--tech"><ServerCog size={22} /></span>
          <h3>Technology platform</h3>
        </div>
        <div className="v04C__nodes">
          {platform.map((it, i) => (
            <Spoke key={it.lead} it={it} n={i + 1} side="r" />
          ))}
        </div>
      </div>
    </div>
  )
};

const variants: DeckSlide[] = [variantB, variantC];

export default variants;
