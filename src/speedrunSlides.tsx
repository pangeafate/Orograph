import type { ReactNode } from "react";
import {
  ArrowRight,
  Blocks,
  Bot,
  Boxes,
  Briefcase,
  Building2,
  CircleDollarSign,
  Cloud,
  Cpu,
  Database,
  FileText,
  Gauge,
  Handshake,
  History,
  KeyRound,
  Lightbulb,
  Lock,
  Megaphone,
  Milestone,
  Network,
  Percent,
  Puzzle,
  Repeat,
  Rocket,
  ServerCog,
  Share2,
  ShieldCheck,
  Stamp,
  Target,
  Timer,
  Unplug,
  Users,
  Wrench,
  XCircle,
  Zap
} from "lucide-react";
import { LakestromDotField } from "./components/LakestromDotField";
import "./speedrun.css";
import v04 from "./variants/v04-solution";
import v05 from "./variants/v05-sauce";
import v06 from "./variants/v06-founder";
import v09 from "./variants/v09-market";
import v10 from "./variants/v10-model";
import v12 from "./variants/v12-competition";

/* ---------------------------------------------------------------------------
   Investor deck — 14 slides. Storyline: (1) SMEs need AI operating capability
   they cannot build, (2) Orograph's architecture + operating model makes bespoke
   AI affordable, (3) ST3 proves feasibility; the round proves repeatability.
   Facts come from "Orograph managed AI agents" (SR008, Oct 2026) and the earlier
   Orograph deck. Anything not yet measured is shown as <Need>, never invented.
   Product screenshots in /public/proof are cropped from that PDF.
--------------------------------------------------------------------------- */

export type DeckSlide = {
  kicker: string;
  title: string;
  accentPhrases?: string[];
  className?: string;
  retired?: boolean;
  content: ReactNode;
};

const Source = ({ children }: { children: ReactNode }) => (
  <p className="srSource">{children}</p>
);

/** an input the pitch still needs — shown, not faked */
const Need = ({ children }: { children: ReactNode }) => (
  <span className="srNeed">data needed &middot; {children}</span>
);

const Shot = ({
  src,
  alt,
  caption,
  live
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  /** a screenshot from the running Orograph software */
  live?: boolean;
}) => (
  <figure className={`srShot${live ? " srShot--live" : ""}`}>
    {live ? <span className="srLiveBadge">Screenshot &middot; live Orograph software</span> : null}
    <div className="srShot__frame">
      <img src={src} alt={alt} />
    </div>
    {caption ? <figcaption>{caption}</figcaption> : null}
  </figure>
);

const agentGroups: { label: string; count: number; agents: string[]; unique?: boolean }[] = [
  { label: "Relationships", count: 3, agents: ["CRM Steward", "Intake", "Deal Steward"] },
  {
    label: "Work and resources",
    count: 5,
    agents: ["PMO", "Planner", "Critical Path", "Cadence", "Structure Scout"]
  },
  {
    label: "Decisions and knowledge",
    count: 5,
    agents: ["Meeting Analyst", "Meeting Reader", "Meeting Triage", "Datacore", "Strategy Custodian"]
  },
  { label: "Running the workforce", count: 3, agents: ["Kaizen", "Web Agent", "Datacore Files"] },
  { label: "Unique to ST3", count: 2, agents: ["Deal Desk", "Financial Modeler"], unique: true }
];

const ReuseRows = () => (
  <>
    <div className="srReuseRows">
      <div className="srReuseRow">
        <span>Company 1 &middot; ST3</span>
        <div className="srDots" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <i key={i} className={i >= 16 ? "is-unique" : "is-reused"} />
          ))}
        </div>
        <em>18 deployed, only 2 built from scratch</em>
      </div>
      <div className="srReuseRow">
        <span>Company 2 &middot; day one</span>
        <div className="srDots" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <i key={i} className={i >= 16 ? "is-todo" : "is-reused"} />
          ))}
        </div>
        <em>16 could arrive ready</em>
      </div>
    </div>
    <div className="srCase__legend">
      <span><i className="is-reused" />potentially reusable role</span>
      <span><i className="is-unique" />company specific</span>
    </div>
  </>
);

const PROBLEM_TITLE =
  "After a number of AI implementations across companies of 100–500 people, we saw a fundamental gap.";

const CHOICES = [
  {
    name: "“Assemble it yourself”",
    icon: <Puzzle size={22} />,
    text: "…from scattered building blocks and OSS frameworks.",
    verdict: "seldom works"
  },
  {
    name: "An alternative: adopt an existing end-to-end solution",
    icon: <Lock size={22} />,
    text: "Either doesn’t fit the business or gives away control over the IP and destiny to the 3rd-party provider (frontier labs or proprietary frameworks).",
    verdict: "poor fit or lost control"
  }
];

const baseSlides: DeckSlide[] = [
  /* 01 ------------------------------------------------------------------ */
  {
    kicker: "01 / Orograph",
    title: "Orograph",
    className: "slide--title",
    content: (
      <div className="titleSlide srTitle">
        <LakestromDotField className="lakestromDotField" />
        <h1>Orograph</h1>
        <p className="srTitle__sub">Backend for managed AI agents for SMEs</p>
        <p className="tagline srTitle__tagline">
          Orograph enables SMEs to operate bespoke AI workforces without
          building dedicated AI engineering teams.
        </p>
        <div className="srTitle__proof">
          <span className="srTitle__live">In production &middot; average per customer</span>
          <div className="srTitle__metrics">
            <div>
              <strong>18</strong>
              <span>agents in production</span>
            </div>
            <div>
              <strong>669</strong>
              <span>work items in 30 days</span>
            </div>
            <div>
              <strong>85%</strong>
              <span>with no human intervention</span>
            </div>
          </div>
        </div>
        <p className="srTitle__byline">
          Sergey Podolskiy &middot; founder &middot; ex-BCG, ex-Maersk &middot;
          Tallinn &nbsp;|&nbsp; speedrun SR008 &middot; October 2026
        </p>
      </div>
    )
  },

  /* 02 ------------------------------------------------------------------ */
  {
    kicker: "02 / the opportunity",
    className: "slide--longTitle",
    title: "AI capabilities are outpacing SMEs’ ability to convert them into measurable business value.",
    accentPhrases: ["outpacing SMEs’ ability"],
    content: (
      <div className="srWithSub">
        <p className="srSubtitle">50+ interviews with the business stakeholders tell the same story</p>
      <div className="srSplit srSplit--even">
        <figure className="srChart">
          <svg viewBox="0 0 600 340" role="img" aria-label="Illustrative: what agents can do rises faster than the value SMEs realise">
            <defs>
              <linearGradient id="srGap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <line x1="40" y1="300" x2="580" y2="300" stroke="var(--border-strong)" />
            <line x1="40" y1="20" x2="40" y2="300" stroke="var(--border-strong)" />
            <path d="M40 280 C 220 260, 380 150, 570 40 L 570 228 C 400 250, 240 268, 40 284 Z" fill="url(#srGap)" />
            <path d="M40 280 C 220 260, 380 150, 570 40" fill="none" stroke="var(--violet-bright)" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 284 C 240 268, 400 250, 570 228" fill="none" stroke="var(--text-2)" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
            <text x="560" y="30" textAnchor="end" className="srChart__lbl srChart__lbl--hi">What AI agents can do</text>
            <text x="560" y="218" textAnchor="end" className="srChart__lbl">Value SMEs actually realise</text>
            <text x="430" y="170" textAnchor="middle" className="srChart__gap">the gap</text>
            <text x="40" y="324" className="srChart__axis">time &rarr;</text>
          </svg>
          <figcaption>Illustrative</figcaption>
        </figure>
        <div className="srFacts">
          <div className="srFact">
            <span className="srLabel"><Gauge size={15} />cost</span>
            <p>
              Gartner expects the cost per agentic workflow to rise <b>more than
              fivefold through 2028</b>, even as tokens get cheaper.
            </p>
            <Source>Gartner, via VentureBeat, October 2026</Source>
          </div>
          <div className="srFact">
            <span className="srLabel"><Users size={15} />expertise</span>
            <p>
              <b>71%</b> of EU companies that considered AI and didn&rsquo;t adopt it
              say they lack the expertise.
            </p>
            <Source>Eurostat, 2025</Source>
          </div>
          <p className="srCallout">
            Large companies hire platform and FinOps teams to close the gap.{" "}
            <b>A 300-person company has nobody, so it overpays or never starts.</b>
          </p>
        </div>
      </div>
      </div>
    )
  },

  /* 03 ------------------------------------------------------------------ */
  {
    kicker: "03 / the problem",
    className: "slide--longTitle",
    title: PROBLEM_TITLE,
    accentPhrases: ["a fundamental gap"],
    content: (
      <div className="p3 p3B">
        <div className="p3B__cliff p3B__cliff--left">
          <span className="srLabel">AI capability</span>
          <Bot size={30} />
        </div>
        <div className="p3B__chasm">
          <span className="p3B__faced">This is what my team has faced on a regular basis</span>
          <div className="p3B__bridges">
            {CHOICES.map((c, i) => (
              <div className="p3B__bridge" key={c.name}>
                <svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 10 H300" stroke="var(--violet-bright)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
                  <path d={i === 0 ? "M300 10 H400" : "M300 10 H360"} stroke="var(--violet-bright)" strokeWidth="4" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="p3B__break"><XCircle size={22} /></span>
                <div className="p3B__label">
                  <b>{c.name} <span>{c.verdict}</span></b>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p3B__gapline"><span>the gap</span></div>
          <div className="p3B__why">
            <span className="srLabel">why both bridges break</span>
            <div className="p3B__marks">
              <div><Lightbulb size={20} /><b>No path to ROI</b><p>Companies lack capabilities not only in AI use, but also in how to identify and design net-cash-positive AI applications.</p></div>
              <div className="is-hero"><strong>80%</strong><b>rebuilt every time</b><p>of the elements foundational to any AI implementation are being rebuilt &mdash; and with unscalable architecture.</p></div>
              <div><Unplug size={20} /><b>Blurry AI/code border</b><p>A blurry border between AI and code leads to unreliable AI performance and loss of trust.</p></div>
            </div>
          </div>
        </div>
        <div className="p3B__cliff p3B__cliff--right">
          <span className="srLabel">Business value</span>
          <Target size={30} />
        </div>
      </div>
    )
  },

  /* 04 ------------------------------------------------------------------ */
  {
    kicker: "04 / the solution",
    className: "slide--longTitle",
    title:
      "Orograph is designed to fill this gap: a platform for managed AI agents + a consulting service that helps customers implement meaningful AI for business.",
    accentPhrases: ["fill this gap"],
    content: (
      <div className="srHalves">
        {[
          {
            name: "Consulting service",
            icon: <Handshake size={24} />,
            items: [
              {
                icon: <Users size={18} />,
                lead: "No engineers needed.",
                text: "Independent business consultants and Orograph’s own people create and manage bespoke AI agents for the Client — without engineers or engineering knowledge."
              },
              {
                icon: <KeyRound size={18} />,
                lead: "IP and tech belong to the Client.",
                text: "They own and compound what makes their business uniquely competitive: bespoke skills, prompts and data."
              },
              {
                icon: <Share2 size={18} />,
                lead: "Network effect working for the Client.",
                text: "90% of the functionality is already assembled; new cases compound and are shared across all Clients. One click updates the skills for hundreds of tenants and thousands of their agents, while ensuring resilience."
              }
            ]
          },
          {
            name: "Technology platform",
            icon: <ServerCog size={24} />,
            items: [
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
            ]
          }
        ].map((half) => (
          <section className="srHalf" key={half.name}>
            <div className="srHalf__head">
              <span className="srHalf__icon">{half.icon}</span>
              <h3>{half.name}</h3>
            </div>
            <ul className="srHalf__list">
              {half.items.map((it) => (
                <li key={it.lead}>
                  <span className="srHalf__bullet">{it.icon}</span>
                  <p><b>{it.lead}</b> {it.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )
  },

  /* 05 ------------------------------------------------------------------ */
  {
    kicker: "05 / secret sauce",
    className: "slide--longTitle",
    title:
      "Our secret sauce is the unique combination of the Tech Platform, Business Consulting and Extreme Modularity by design.",
    accentPhrases: ["Tech Platform, Business Consulting and Extreme Modularity"],
    content: (
      <div className="srSauce">
        <section className="srSauce__col">
          <div className="srHalf__head">
            <span className="srHalf__icon"><Cpu size={22} /></span>
            <h3>Tech Platform</h3>
          </div>
          <ul className="srSauce__list">
            <li>
              <b>Agents-as-data</b> &mdash; everything is a line in the database
              <ul>
                <li>Native database tools like RLS, unavailable to traditional agentic SDKs and frameworks</li>
                <li>Native access control and airtight multi-tenant data separation</li>
                <li>Infinite scalability</li>
              </ul>
            </li>
            <li><b>Atomic agents</b> &mdash; capable of running on weak or on-premise models</li>
            <li><b>Proprietary harness</b> that runs any tool-calling LLM as an agent</li>
          </ul>
          <span className="srSauce__plus" aria-hidden="true">+</span>
        </section>
        <section className="srSauce__col">
          <div className="srHalf__head">
            <span className="srHalf__icon"><Handshake size={22} /></span>
            <h3>Business Consulting</h3>
          </div>
          <ul className="srSauce__list">
            <li>
              We understand the Client&rsquo;s situation and quickly deliver the{" "}
              <b>first meaningful solution without code</b> (just configuration + instructions)
              &mdash; <b>time to value 1 week</b>, when the Client sees meaningful results.
            </li>
            <li>We <b>teach the Client&rsquo;s people</b> to handle AI agents as we introduce them.</li>
            <li>
              We <b>manage the Client&rsquo;s agentic fleet</b> in whatever split (Client vs us)
              is most comfortable and beneficial for the Client.
            </li>
          </ul>
          <span className="srSauce__plus" aria-hidden="true">+</span>
        </section>
        <section className="srSauce__col srSauce__col--accent">
          <div className="srHalf__head">
            <span className="srHalf__icon"><Boxes size={22} /></span>
            <h3>Extreme Modularity</h3>
          </div>
          <ul className="srSauce__list">
            <li>
              <b>Runtime, memory, skills, code</b> &mdash; everything is a separate, simple
              abstraction. Even prompt fragments are catalogued and loaded into an agent when
              it is called.
            </li>
            <li>
              So at Orograph we manage <b>a couple of hundred skills and prompt fragments</b>{" "}
              &mdash; not hundreds of thousands of our Clients&rsquo; agents.
            </li>
          </ul>
        </section>
      </div>
    )
  },

  /* 06 ------------------------------------------------------------------ */
  {
    kicker: "06 / founder",
    className: "slide--longTitle",
    title:
      "Orograph combines enterprise transformation experience with demonstrated ability to build and operate the platform.",
    accentPhrases: ["build and operate the platform"],
    content: (
      <div className="teamSlide">
        <div className="founderPortraitPanel">
          <div className="founderPortrait">
            <img src="/team/photo4.png" alt="Sergey Podolskiy" />
          </div>
          <div className="founderMeta">
            <strong>Sergey Podolskiy</strong>
            <span>Founder &amp; CEO &middot; Tallinn</span>
          </div>
        </div>
        <div className="founderStory founderStory--close">
          <div className="srFounder">
            <blockquote className="srQuote">
              &ldquo;I worked in systems with thousands of applications, engineers
              and regulated decisions. <b>Agents create a control problem those
              systems weren&rsquo;t built for.</b>&rdquo;
            </blockquote>
            <div className="srFounder__rows srFounder__rows--three">
              <div>
                <strong>Maersk</strong>
                <p>
                  A technology estate of ~3,000 applications, 20,000 employees and
                  7,000 engineers &mdash; ownership, access and accountability at scale.
                </p>
              </div>
              <div>
                <strong>BCG</strong>
                <p>
                  Data and technology programmes in banks, including a digital twin
                  with ~$130M impact.
                </p>
              </div>
              <div className="is-hi">
                <strong>Orograph</strong>
                <p>
                  Built the platform alone &mdash; 24 agents in production, 144 skills,
                  333 tools &mdash; delivered the first paid deployment, runs it in 2&ndash;4
                  hours a week.
                </p>
              </div>
            </div>
            <p className="srFounder__close">
              Enterprise discipline for running agents, at a cost an SME can carry.
            </p>
          </div>
        </div>
      </div>
    )
  },

  /* 07 ------------------------------------------------------------------ */
  {
    kicker: "07 / implementation",
    className: "slide--longTitle",
    title:
      "We are running a paid engagement with a UK PE company that needs AI agents both for itself and for its portfolio companies.",
    accentPhrases: ["paid engagement"],
    content: (
      <div className="srImpl">
        <div className="srImpl__top">
          <span className="srLabel">results</span>
          <div className="srPills">
            <span className="srPill"><Timer size={18} />Time to value <b>&lt;1 week</b></span>
            <span className="srPill"><Bot size={18} />Active agents: <b>18</b></span>
            <span className="srPill"><Percent size={18} /><b>85%</b> actions fully agent-owned</span>
          </div>
          <span className="srLiveBadge">Screenshots &middot; live Orograph software</span>
        </div>
        <div className="srShotGrid">
          {[
            { title: "18 agents deployed", src: "/proof/st3-agent-graph.png", alt: "Orograph agent graph: the deployed agents and their hand-offs" },
            { title: "8 main classes of artifacts", src: "/proof/st3-kinds-of-work-30d.png", alt: "Orograph, every kind of work: record updates, documents, tasks, decisions, calls, emails, deals, deal stage changes" },
            { title: "669 work items in 30 days", src: "/proof/st3-dashboard-30d.png", alt: "Orograph dashboard: 669 pieces of business work done by agents in 30 days" },
            { title: "7 most used agents", src: "/proof/st3-who-did-the-work-30d.png", alt: "Orograph, who did the work: one card per agent" }
          ].map((cell) => (
            <figure className="srShotCell" key={cell.title}>
              <figcaption>{cell.title}</figcaption>
              <div className="srShotCell__frame">
                <img src={cell.src} alt={cell.alt} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    )
  },

  /* 08 ------------------------------------------------------------------ */
  {
    kicker: "08 / scalability",
    className: "slide--longTitle",
    title:
      "Reusing agent capabilities and centralizing operations creates a path to lower deployment and management costs.",
    accentPhrases: ["lower deployment and management costs"],
    content: (
      <div className="srEcon">
        <section className="srCase__card">
          <span className="srLabel"><Repeat size={15} />reuse &middot; deployment cost</span>
          <div className="srCase__hero">
            <strong className="srBigNum">16 of 18</strong>
            <p>
              ST3 agents are roles any company of this size already has. Only{" "}
              <b>Deal Desk</b> and <b>Financial Modeler</b> were built for ST3 alone.
            </p>
          </div>
          <ReuseRows />
        </section>
        <section className="srCase__card">
          <span className="srLabel"><Wrench size={15} />centralized operations &middot; management cost</span>
          <div className="srEffort">
            <div><b>~50 h</b><span>to deploy ST3, over 6 weeks (actual working time)</span></div>
            <div><b>2&ndash;4 h</b><span>a week to run ST3&rsquo;s 18 agents <em>(time needed per agent managed decreases exponentially)</em></span></div>
            <div><b>9&ndash;17</b><span>companies one person could run (model)</span></div>
          </div>
          <p className="srCallout">
            <b>The same constraint that makes an agent safer also makes it cheaper:</b>{" "}
            a standard, governed runtime allows model choice per agent, bounded
            execution and measured quality.
          </p>
          <p className="srMuted srSmall">
            ST3&rsquo;s last 30 days re-priced on xiaomi/mimo-v 2.6-flash came out 89.7% cheaper.
          </p>
        </section>
      </div>
    )
  },

  /* 09 ------------------------------------------------------------------ */
  {
    kicker: "09 / market",
    className: "slide--longTitle",
    title:
      "Independent SMEs with 150–500 employees form an initial target segment with substantial automation needs.",
    accentPhrases: ["Independent SMEs with 150–500 employees"],
    content: (
      <div className="srSplit srSplit--even">
        <div className="srFacts">
          <div className="srFact">
            <span className="srLabel"><Target size={15} />ideal customer</span>
            <p>
              <b>Independent companies of 150&ndash;500 people</b> in the US, UK and EU,
              running the full set of management systems &mdash; sales, projects,
              decisions, finance &mdash; with no AI engineering team.
            </p>
          </div>
          <div className="srFact">
            <span className="srLabel"><Briefcase size={15} />buyer</span>
            <p>The owner or COO, who already carries the cost of the work agents take on.</p>
          </div>
          <div className="srFact">
            <span className="srLabel"><Users size={15} />scale of need</span>
            <p>
              <b>~128K companies</b> employing <b>~33M people</b>. Business-agent token
              spend <b>~$9.6B</b> in 2026, <b>~$39B</b> by 2028.
            </p>
          </div>
        </div>
        <div className="srTam">
          <div className="srTam__ring srTam__ring--tam">
            <span className="srLabel">TAM</span>
            <b>~$6B &rarr; ~$9B</b>
            <span>a year, 2026 &rarr; 2028: platform fees ~$5.0B + management fee ~$1.0B &rarr; ~$3.9B</span>
          </div>
          <div className="srTam__ring srTam__ring--sam">
            <span className="srLabel">SAM</span>
            <Need>bottom-up, by sector and region</Need>
          </div>
          <div className="srTam__ring srTam__ring--som">
            <span className="srLabel">SOM</span>
            <Need>reachable in 3 years</Need>
          </div>
        </div>
        <Source>Eurostat 2023, UK BPE 2025, US Census 2022, Ramp 2026, Gartner 2026 &middot; base case</Source>
      </div>
    )
  },

  /* 10 ------------------------------------------------------------------ */
  {
    kicker: "10 / business model",
    className: "slide--longTitle",
    title:
      "Deployment fees and recurring platform revenue support a scalable business model, with managed operations adding revenue.",
    accentPhrases: ["recurring platform revenue"],
    content: (
      <div className="srModel">
        <div className="srModel__left">
          <div className="srFees">
            <div className="srFee">
              <span className="srLabel">deployment &middot; actual</span>
              <strong>&pound;25K</strong>
              <p>6 weeks, ~50 hours (actual working time)</p>
            </div>
            <div className="srFee">
              <span className="srLabel">platform &middot; actual</span>
              <strong>&pound;2,500<small>/mo</small></strong>
              <p>recurring, 2&ndash;4 hours a week to run</p>
            </div>
            <div className="srFee srFee--hi">
              <span className="srLabel">managed ops &middot; proposed</span>
              <strong>10%</strong>
              <p>of the agent budget we run</p>
            </div>
          </div>
          <div className="srSwitch">
            <span className="srLabel">how customers move to managed</span>
            <div className="srSwitch__flow">
              <span>Own model keys</span>
              <ArrowRight size={16} />
              <span>Orograph side by side</span>
              <ArrowRight size={16} />
              <span className="is-hi">100% managed</span>
            </div>
          </div>
        </div>
        <div className="srModel__right">
          <div className="srUnit">
            <div className="srUnit__head"><span>Per customer</span><b>300-person company</b></div>
            <div><span>Platform revenue</span><b>~$39K a year</b></div>
            <div><span>Managed-operations fee</span><b>~$9K (2026) &rarr; ~$36K (2028)</b></div>
            <div><span>Revenue per company, 2028</span><b className="is-money">~$75K a year, plus deployment</b></div>
            <div><span>Cost to serve</span><b>2&ndash;4 hours a week (ST3)</b></div>
            <div><span>Gross margin</span><Need>after models, infra, support</Need></div>
            <div><span>Acquisition cost</span><Need>CAC and payback</Need></div>
          </div>
          <p className="srMuted srSmall">
            Open design choice: structure the managed fee so that efficiency raises
            our margin rather than shrinking our revenue.
          </p>
        </div>
        <Source>Base case, business agents only, excludes coding tools &middot; $1.30 per pound</Source>
      </div>
    )
  },

  /* 11 ------------------------------------------------------------------ */
  {
    kicker: "11 / go-to-market",
    className: "slide--longTitle",
    title:
      "Direct SME acquisition and repeatable deployments provide a route from founder-led delivery to scalable distribution.",
    accentPhrases: ["founder-led delivery to scalable distribution"],
    content: (
      <div className="srGtm">
        <div className="srFunnel">
          {[
            {
              icon: <Megaphone size={18} />,
              head: "Discovery",
              text: "Owner or COO conversation about the work to hand to agents.",
              proof: "First clients came through Lakestrom’s AI consulting practice."
            },
            {
              icon: <CircleDollarSign size={18} />,
              head: "Paid deployment",
              text: "Six weeks, fixed fee, first agent in days.",
              proof: "ST3: £25K, 8 days to the first agent."
            },
            {
              icon: <Bot size={18} />,
              head: "Expansion",
              text: "More roles and more of the company’s work move to agents.",
              proof: "ST3: 18 agents in 6 weeks; 71% of work involves an agent."
            },
            {
              icon: <Network size={18} />,
              head: "Referrals",
              text: "Owners introduce peers running similar companies.",
              proof: ""
            }
          ].map((s, i) => (
            <div className="srFunnel__step" key={s.head}>
              <span className="srFunnel__icon">{s.icon}</span>
              <strong>{s.head}</strong>
              <p>{s.text}</p>
              {s.proof ? <em>{s.proof}</em> : null}
            </div>
          ))}
        </div>
        <div className="srGtm__bottom">
          <div className="srFact">
            <span className="srLabel"><Repeat size={15} />from founder-led to repeatable</span>
            <p>
              A written deployment playbook, the reusable roles from company 1, and
              deployment hours measured company by company &mdash; so delivery stops
              depending on the founder.
            </p>
          </div>
        </div>
      </div>
    )
  },

  /* 12 ------------------------------------------------------------------ */
  {
    kicker: "12 / competition",
    className: "slide--longTitle",
    title:
      "Orograph competes on governed customization and managed outcomes—not agent creation alone.",
    accentPhrases: ["governed customization and managed outcomes"],
    content: (
      <div className="srCompete">
        <div className="srTable srTable--compete">
          <div className="srTable__row srTable__row--head">
            <span>Who</span>
            <span>What they sell</span>
            <span>What is left for a 150&ndash;500-person company</span>
          </div>
          {[
            [
              "Suites: Microsoft Copilot Studio, HubSpot, Odoo",
              "Agents inside their tool, with platform governance",
              "One vendor’s models and data; the company adapts to the tool"
            ],
            [
              "Agent platforms: Relevance AI",
              "Self-serve agent creation, approvals, routing, monitoring",
              "The company still designs, builds and runs its agents"
            ],
            [
              "Labs’ services arms and consultancies: Ode with Anthropic, OpenAI Deployment Co.",
              "Embedded engineers",
              "Enterprise cost base, tied to one model"
            ],
            [
              "Gateways and DIY: OpenRouter, LiteLLM, Lovable, n8n",
              "Routing and building tools",
              "Needs builders and governance the company doesn’t have"
            ]
          ].map(([who, what, why]) => (
            <div className="srTable__row" key={who}>
              <span>{who}</span>
              <span>{what}</span>
              <span>{why}</span>
            </div>
          ))}
          <div className="srTable__row srTable__row--hi">
            <span>Orograph</span>
            <span>Builds, runs and improves bespoke agents on one governed runtime</span>
            <span>A managed outcome at SME cost, sold to the owner</span>
          </div>
        </div>
        <p className="srCallout">
          <b>Every governed action makes Orograph harder to replace.</b> Inside each
          tenant&rsquo;s boundary we accumulate tested capabilities, agent
          configurations, operating knowledge, evaluation cases and governance
          history.
        </p>
        <Source>Sacra, Fortune, TNW, Business Wire, vendor documentation</Source>
      </div>
    )
  },

  /* 13 ------------------------------------------------------------------ */
  {
    kicker: "13 / the round",
    className: "slide--longTitle",
    title:
      "The proposed $1M round will test repeatable deployment economics across 15 independent SMEs.",
    accentPhrases: ["repeatable deployment economics"],
    content: (
      <div className="theRoundSlide">
        <div className="roundRow srRoundRow">
          <section className="roundCol roundCol--ask">
            <div className="panelHeader">
              <Rocket size={18} />
              <span>raising</span>
            </div>
            <strong className="roundAskAmount">$1M</strong>
            <p className="srRoundTerms">
              $500K now and $500K in the next round, on speedrun terms.
            </p>
          </section>

          <section className="roundCol roundCol--next">
            <div className="panelHeader">
              <Milestone size={18} />
              <span>milestones in 12 months</span>
            </div>
            <div className="roundMilestones">
              {[
                ["15 independent SMEs live", "repeatability beyond the first customer"],
                ["Deployment hours falling", "measured from company 1 to company 15"],
                [
                  "Side-by-side proof in every customer",
                  "own models vs managed: cost and QC pass rate"
                ],
                ["Unit economics measured", "gross margin and support cost per customer"]
              ].map(([head, body], i) => (
                <div className="roundMilestone" key={head}>
                  <span className="roundMilestoneNum">{i + 1}</span>
                  <div className="roundMilestone__body">
                    <strong>{head}</strong>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="roundCol roundCol--today">
            <div className="panelHeader">
              <Users size={18} />
              <span>use of funds</span>
            </div>
            <ul className="roundList">
              <li>Two engineers</li>
              <li>Founder-led sales to independent SMEs</li>
            </ul>
          </section>
        </div>

        <div className="roundClose">
          <p className="roundCloseStatement">
            The next round proves a repeatable SME business model &mdash; not just
            more agents.
          </p>
        </div>
      </div>
    )
  }

];

/* design variants sit right after the slide they re-imagine (pick one, drop the rest) */
const variantsAfter: Record<string, DeckSlide[]> = {};

/* variants the founder picked: they replace the original slide in the main deck */
const chosen = (variant: DeckSlide): DeckSlide => ({
  ...variant,
  kicker: variant.kicker.replace(/ · variant [A-Z]$/, "")
});
const chosenFor: Record<string, DeckSlide> = {
  "04": chosen(v04[1]),
  "05": chosen(v05[0]),
  "06": chosen(v06[0]),
  "09": chosen(v09[0]),
  "10": chosen(v10[0]),
  "12": chosen(v12[0])
};

export const mainSlides: DeckSlide[] = baseSlides.flatMap((slide) => {
  const key = slide.kicker.slice(0, 2);
  return chosenFor[key] ? [chosenFor[key]] : [slide, ...(variantsAfter[key] ?? [])];
});

/* ---------------------------------------------------------------------------
   Evidence appendix — detail moved out of the main storyline.
--------------------------------------------------------------------------- */
export const evidenceSlides: DeckSlide[] = [
  {
    kicker: "00 / appendix · operating model",
    className: "slide--longTitle",
    title:
      "Orograph removes these barriers through business expertise, shared technology and hands-on enablement.",
    accentPhrases: ["business expertise, shared technology and hands-on enablement"],
    content: (
      <div className="srMap">
        {[
          {
            barrier: "Complexity",
            tag: "business",
            answer: "Business expertise",
            icon: <Briefcase size={18} />,
            text: "We start from the company’s management system — the jobs, data and measures — and write each agent’s job with the owner."
          },
          {
            barrier: "Cost",
            tag: "technology",
            answer: "Shared technology",
            icon: <Boxes size={18} />,
            text: "One governed runtime and a shared library of 144 skills and 333 tools. Every agent’s work can be re-priced on any model."
          },
          {
            barrier: "Control",
            tag: "people",
            answer: "Hands-on enablement",
            icon: <Users size={18} />,
            text: "Every agent has a named owner and a mandate, people approve every change, and we run the workforce — 2 to 4 hours a week at ST3."
          }
        ].map((row) => (
          <div className="srMap__row" key={row.barrier}>
            <div className="srMap__barrier">
              <span className="srLabel">{row.tag}</span>
              <strong>{row.barrier}</strong>
            </div>
            <ArrowRight className="srMap__arrow" size={24} />
            <div className="srMap__answer">
              <span className="srMap__icon">{row.icon}</span>
              <div>
                <strong>{row.answer}</strong>
                <p>{row.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    kicker: "00 / appendix · agent designer",
    className: "slide--longTitle",
    title: "Plain-language briefs become bespoke agents assembled from reusable, governed components.",
    accentPhrases: ["Plain-language briefs become bespoke agents"],
    content: (
      <div className="srSplit srSplit--rightWide">
        <div className="srFlow">
          {[
            { n: "1", head: "Brief", text: "The owner writes the job in plain language." },
            { n: "2", head: "Assemble", text: "The Agent Designer builds it from shared skills and tools." },
            { n: "3", head: "Approve", text: "A person approves every change." },
            { n: "4", head: "Run", text: "A live agent with an owner, a mandate and a full version history." }
          ].map((s) => (
            <div className="srFlow__step" key={s.n}>
              <span className="roundMilestoneNum">{s.n}</span>
              <div>
                <strong>{s.head}</strong>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
          <div className="srStep srStep--hi">
            <strong>12 of 18</strong>
            <p>agents at ST3 were built from a plain-language brief.</p>
          </div>
        </div>
        <Shot
          src="/proof/pmo-team.png"
          alt="PMO's team of five agents in the ST3 tenant, each with its job in plain language"
          caption="PMO's team of five at ST3 — each card a live agent. Captured 29 Oct 2026."
        />
      </div>
    )
  },
  {
    kicker: "00 / appendix · agents-as-data",
    className: "slide--longTitle",
    title:
      "Agents-as-Data makes bespoke solutions easier to govern, reuse and maintain on a common runtime.",
    accentPhrases: ["Agents-as-Data"],
    content: (
      <div className="srArchWrap">
      <div className="srArch">
        <div className="srArch__layer srArch__layer--tenants">
          <span className="srLabel"><Building2 size={15} />independent tenants &middot; own data, mandates and history</span>
          <div className="srArch__cells">
            <div className="srArch__tenant is-live"><b>ST3 group</b><span>18 agents live</span></div>
            <div className="srArch__tenant"><b>Company 2</b><span>next</span></div>
            <div className="srArch__tenant"><b>Company N</b><span>&hellip;</span></div>
          </div>
        </div>
        <div className="srArch__layer srArch__layer--blocks">
          <span className="srLabel"><Boxes size={15} />reusable, versioned building blocks</span>
          <div className="srArch__cells srArch__cells--grid">
            <div><b>16</b><span>potentially reusable roles</span></div>
            <div><b>144</b><span>skills</span></div>
            <div><b>333</b><span>tools</span></div>
            <div><b>Policies</b><span>owner &middot; mandate &middot; approval</span></div>
          </div>
        </div>
        <div className="srArch__layer srArch__layer--runtime">
          <span className="srLabel"><Cpu size={15} />one common runtime</span>
          <p>
            <b>Each agent is a record, not code.</b> The runtime reads its job,
            tools, mandate and model on every turn &mdash; so a version can be
            rolled back, a prompt edited or a model switched <b>without a deployment</b>,
            and the whole fleet can be queried like a database.
          </p>
        </div>
      </div>
      <Shot
        live
        src="/proof/st3-agent-graph.png"
        alt="Orograph agent graph at ST3: Datacore, Meeting Analyst and PMO with their sub-agents, each card listing its skills, prompts, channels, memory and autonomy"
          caption="ST3 agent graph: each card is one agent, assembled from counted blocks (SKL skills, PMT prompts, MEM memory, AUT autonomy); lines are hand-offs between agents."
      />
      </div>
    )
  },
  {
    kicker: "00 / appendix \u00b7 who did the work",
    className: "slide--longTitle",
    title: "Who did the work at ST3: one card per agent, from tasks and decisions to 1,376 files checked.",
    accentPhrases: ["one card per agent"],
    content: (
      <div className="srOneShot">
        <Shot
          live
          src="/proof/st3-who-did-the-work-30d.png"
          alt="Orograph, who did the work: Meeting Analyst, Deal Steward, CRM Steward, Intake, Planner, PMO, Datacore"
          caption="ST3 tenant, last 30 days (29 Sep – 29 Oct 2026). New agents appear here automatically."
        />
      </div>
    )
  },
  {
    kicker: "00 / appendix \u00b7 agent graph",
    className: "slide--longTitle",
    title: "The ST3 agent graph: every agent is assembled from counted, governed building blocks.",
    accentPhrases: ["counted, governed building blocks"],
    content: (
      <div className="srOneShot">
        <Shot
          live
          src="/proof/st3-agent-graph.png"
          alt="Orograph agent graph at ST3: Datacore, Meeting Analyst and PMO with their sub-agents"
          caption="ST3 tenant, governance dashboard. Each card lists the agent's skills (SKL), prompts (PMT), memory (MEM) and autonomy (AUT); numbered lines are hand-offs between agents."
        />
      </div>
    )
  },
  {
    kicker: "00 / appendix · ST3 workforce",
    className: "slide--longTitle",
    title: "ST3’s 18 agents by function: 16 are roles any company of this size already has.",
    accentPhrases: ["16 are roles any company of this size already has"],
    content: (
      <div className="srOrgOnly">
        <div className="srOrg">
          <div className="srOrg__root">ST3 group &middot; 18 agents</div>
          <div className="srOrg__branches">
            {agentGroups.map((group) => (
              <div className={`srOrg__branch${group.unique ? " is-unique" : ""}`} key={group.label}>
                <div className="srOrg__head">
                  {group.label}
                  <em>{group.count}</em>
                </div>
                {group.agents.map((agent) => (
                  <div className="srOrg__agent" key={agent}>
                    <i />
                    {agent}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "00 / appendix · governance",
    className: "slide--longTitle",
    title: "Every agent has an owner, a mandate and a full version history.",
    accentPhrases: ["an owner, a mandate and a full version history"],
    content: (
      <div className="srPair">
        <div className="srPair__col">
          <span className="srLabel"><ShieldCheck size={15} />mandate</span>
          <Shot src="/proof/pmo-mandate.png" alt="PMO agent access, authority mandate and runtime settings" />
          <p>
            <b>Nothing auto-approves.</b> Each governed decision needs an approver.
          </p>
        </div>
        <div className="srPair__col">
          <span className="srLabel"><History size={15} />versions</span>
          <Shot src="/proof/pmo-versions.png" alt="PMO agent versions and history, each restorable" />
          <p>
            PMO agent: <b>113 versions in five weeks</b>, each one restorable.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "00 / appendix · model re-pricing",
    className: "slide--longTitle",
    title: "The platform re-prices every agent’s work on any model: ST3 on MiniMax M3 came out 89.7% cheaper.",
    accentPhrases: ["89.7% cheaper"],
    content: (
      <div className="srSplit srSplit--wideLeft">
        <Shot src="/proof/model-repricing.png" alt="Orograph re-prices ST3's agent work on MiniMax M3" />
        <div className="srFacts">
          <div className="srFact">
            <span className="srLabel"><Stamp size={15} />what it shows</span>
            <p>
              The same calls from ST3&rsquo;s last 30 days, re-priced as if every
              agent ran on one model.
            </p>
          </div>
          <div className="srFact">
            <span className="srLabel"><Target size={15} />what it does not show</span>
            <p>
              <b>Re-priced, not yet re-run.</b> Quality on the cheaper model is the
              side-by-side proof the round funds.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "00 / appendix · market model",
    className: "slide--longTitle",
    title: "Market model: about $9B a year by 2028 in companies of 150 to 500 people.",
    accentPhrases: ["about $9B a year by 2028"],
    content: (
      <div className="srMarket srMarket--full">
        <div className="srTable">
          <div className="srTable__row srTable__row--head">
            <span>US, UK and EU, base case</span>
            <span>2026</span>
            <span>2028</span>
          </div>
          {[
            ["Companies with 150 to 500 staff", "~128K", "~128K"],
            ["Employees in them", "~33M", "~33M"],
            ["Business-agent token spend per employee", "~$24 a month", "~$99 a month"],
            ["Business-agent token spend", "~$9.6B", "~$39B"],
            ["10% management fee", "~$1.0B", "~$3.9B"],
            ["Platform fees at ~$39K per company", "~$5.0B", "~$5.0B"]
          ].map(([label, a, b]) => (
            <div className="srTable__row" key={label}>
              <span>{label}</span>
              <span>{a}</span>
              <span>{b}</span>
            </div>
          ))}
          <div className="srTable__row srTable__row--hi">
            <span>Revenue pool</span>
            <span>~$6B</span>
            <span>~$9B</span>
          </div>
        </div>
        <Source>
          Eurostat 2023, UK BPE 2025, US Census 2022, Ramp 2026, Gartner 2026 &middot;
          tech-forward companies spend about 3.5&times; the base case
        </Source>
      </div>
    )
  }
];
