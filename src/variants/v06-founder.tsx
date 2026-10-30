import { ArrowRight, Bot, Flag, FlaskConical, Landmark, Rocket, Ship, Equal, Plus, Quote } from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v06-founder.css";

/* design variants for slide 06 / founder
   B — a career journey line: Maersk → BCG → Orograph, scale numbers as milestones
   C — quote-led: big pull-quote + arched portrait, the career as an equation */

const TITLE =
  "Orograph combines enterprise transformation experience with demonstrated ability to build and operate the platform.";
const ACCENTS = ["build and operate the platform"];

const PHOTO = "/team/photo4.png";

const QuoteText = () => (
  <>
    &ldquo;I worked in systems with thousands of applications, engineers and regulated
    decisions. <b>Agents create a control problem those systems weren&rsquo;t built for.</b>&rdquo;
  </>
);

const MAERSK = (
  <>
    A technology estate of <b>~3,000 applications</b>, 20,000 employees and 7,000 engineers
    &mdash; ownership, access and accountability at scale.
  </>
);
const BCG = (
  <>
    Data and technology programmes in banks, including a digital twin with{" "}
    <b>~$130M impact</b>.
  </>
);
const OROGRAPH = (
  <>
    Built the platform alone &mdash; <b>24 agents in production</b>, 144 skills, 333 tools
    &mdash; delivered the first paid deployment, runs it in <b>2&ndash;4 hours a week</b>.
  </>
);
const QuoteNew = () => (
  <>
    &ldquo;I worked in systems with thousands of applications, engineers and regulated
    decisions, and in small startups alike.{" "}
    <b>AI creates a scaling and control problem that only database-like agentic architecture fully answers.</b>&rdquo;
  </>
);

const LABS = (
  <>
    AI implementation and working with frontier labs &mdash; designing agentic evals,
    building ETL pipelines.
  </>
);
const STARTUPS = <>Startup CCO and COO &mdash; EdTech and Machine Vision.</>;

const CLOSE = "Enterprise discipline for running agents, at a cost an SME can carry.";

const STOPS = [
  { key: "maersk", step: "step 1", name: "Maersk", big: "~3,000", unit: "applications", icon: <Ship size={20} />, text: MAERSK },
  { key: "bcg", step: "step 2", name: "BCG", big: "~$130M", unit: "impact", icon: <Landmark size={20} />, text: BCG },
  { key: "oro", step: "now", name: "Orograph", big: "24", unit: "agents in production", icon: <Bot size={20} />, text: OROGRAPH }
];

const variants: DeckSlide[] = [
  /* ---------------- variant B: big portrait + a two-level career path ---------------- */
  {
    kicker: "06 / founder · variant B",
    title: TITLE,
    accentPhrases: ACCENTS,
    className: "slide--longTitle",
    content: (
      <div className="v06F">
        <figure className="v06F__who">
          <div className="v06F__avatar">
            <img src={PHOTO} alt="Sergey Podolskiy" />
          </div>
          <figcaption>
            <strong>Sergey Podolskiy</strong>
            <span>Founder &amp; CEO &middot; Tallinn</span>
          </figcaption>
        </figure>

        <div className="v06F__main">
          <blockquote className="v06F__quote">
            <Quote className="v06F__qmark" size={26} aria-hidden="true" />
            <p><QuoteNew /></p>
          </blockquote>

          <div className="v06F__track">
            <span className="v06F__path" aria-hidden="true" />
            <span className="v06F__arrow" aria-hidden="true" />
            {[
              { key: "maersk", n: "1", name: "Maersk", big: "~3,000", unit: "applications", icon: <Ship size={18} />, text: MAERSK },
              { key: "bcg", n: "2", name: "BCG", big: "~$130M", unit: "impact", icon: <Landmark size={18} />, text: BCG },
              { key: "labs", n: "3", name: "AI implementation & frontier labs", big: "2 years", unit: "", icon: <FlaskConical size={18} />, text: LABS },
              { key: "startups", n: "4", name: "Startups", big: "×2", unit: "CCO and COO", icon: <Rocket size={18} />, text: STARTUPS },
              { key: "oro", n: "now", name: "Orograph", big: "24", unit: "agents in production", icon: <Bot size={18} />, text: OROGRAPH }
            ].map((st) => (
              <div key={st.key} className={`v06F__stop v06F__stop--${st.key}`}>
                <div className="v06F__nodeRow">
                  <span className="v06F__node">{st.icon}</span>
                  <span className="v06F__n">{st.n}</span>
                </div>
                <div className="v06F__card">
                  <strong className="v06F__name">{st.name}</strong>
                  <div className="v06F__big"><b>{st.big}</b>{st.unit ? <span>{st.unit}</span> : null}</div>
                  <p>{st.text}</p>
                </div>
              </div>
            ))}
            <div className="v06F__stop v06F__stop--close">
              <div className="v06F__nodeRow">
                <span className="v06F__node"><Flag size={18} /></span>
              </div>
              <p className="v06F__close">{CLOSE}</p>
            </div>
          </div>
        </div>
      </div>
    )
  },

  /* ---------------- variant C: quote-led + equation ---------------- */
  {
    kicker: "06 / founder · variant C",
    title: TITLE,
    accentPhrases: ACCENTS,
    className: "slide--longTitle",
    content: (
      <div className="v06C">
        <div className="v06C__main">
          <blockquote className="v06C__quote">
            <span className="v06C__qmark" aria-hidden="true">&ldquo;</span>
            <p><QuoteText /></p>
          </blockquote>

          <div className="v06C__eq">
            <div className="v06C__term">
              <span className="v06C__icon"><Ship size={18} /></span>
              <strong>Maersk</strong>
              <p>{MAERSK}</p>
            </div>
            <span className="v06C__op" aria-hidden="true"><Plus size={20} /></span>
            <div className="v06C__term">
              <span className="v06C__icon"><Landmark size={18} /></span>
              <strong>BCG</strong>
              <p>{BCG}</p>
            </div>
            <span className="v06C__op" aria-hidden="true"><Plus size={20} /></span>
            <div className="v06C__term v06C__term--hi">
              <span className="v06C__icon"><Bot size={18} /></span>
              <strong>Orograph</strong>
              <p>{OROGRAPH}</p>
            </div>
          </div>

          <p className="v06C__close">
            <span className="v06C__eqSign" aria-hidden="true"><Equal size={22} /></span>
            <span>{CLOSE}</span>
          </p>
        </div>

        <figure className="v06C__portrait">
          <div className="v06C__arch">
            <img src={PHOTO} alt="Sergey Podolskiy" />
          </div>
          <figcaption>
            <strong>Sergey Podolskiy</strong>
            <span>Founder &amp; CEO &middot; Tallinn</span>
          </figcaption>
        </figure>
      </div>
    )
  }
];

export default variants;
