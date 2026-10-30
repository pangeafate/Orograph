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

const slides: Slide[] = [
  {
    kicker: "01 / title",
    title: "Orograph",
    className: "slide--title",
    content: (
      <div className="titleSlide">
        <LakestromDotField className="lakestromDotField" />
        <h1>Orograph</h1>
        <p className="tagline">
          The control system for a company AI workforce
        </p>
        <p className="subcopy">
          Every agent becomes a governed record &mdash; an owner, a mandate, a
          budget and a full history. The business runs thousands of them without
          an engineer, and can prove what every one of them did.
        </p>
        <p className="statusLine">
          prototype live &middot; design-partner conversations in motion
        </p>
      </div>
    )
  },
  {
    kicker: "02 / the shift",
    title: "Companies will create millions* of AI agents very soon.",
    accentPhrases: ["millions of AI agents"],
    content: (
      <div className="shiftSlide">
        <div className="shiftGrid">
          <article className="shiftCol">
            <div className="shiftColHead">
              <CircleDollarSign size={18} />
              <span>01</span>
            </div>
            <h3>You need to govern them as assets.</h3>
            <blockquote>
              <p>
                Human capital and token capital have to compound together.
              </p>
              <cite>Satya Nadella &middot; token capital</cite>
            </blockquote>
            <p className="shiftImp">
              Token spend is an expense. What accumulates around the model
              &mdash; instructions, grants, memory, evidence &mdash; is the
              asset. Assets have owners, ledgers and audits.
            </p>
          </article>
          <article className="shiftCol">
            <div className="shiftColHead">
              <FileSearch size={18} />
              <span>02</span>
            </div>
            <h3>You need to understand how they work in every detail.</h3>
            <blockquote>
              <p>
                AI can produce work faster than humans can understand or verify
                it. What matters is cognitive coverage.
              </p>
              <cite>Satya Nadella &middot; cognitive coverage</cite>
            </blockquote>
            <p className="shiftImp">
              Not just what the agent did &mdash; what it knew, what it chose,
              what evidence backed it, and which human stayed accountable.
            </p>
          </article>
          <article className="shiftCol">
            <div className="shiftColHead">
              <Scale size={18} />
              <span>03</span>
            </div>
            <h3>You need to give them an enforceable mandate.</h3>
            <blockquote>
              <p>Humans become managers of abundant digital labour.</p>
              <cite>Ethan Mollick &middot; management as the AI skill</cite>
            </blockquote>
            <p className="shiftImp">
              Roles, objectives, delegation, evaluation, escalation &mdash; the
              primitives of an organisation. Written down, and enforced at the
              moment the agent acts.
            </p>
          </article>
        </div>
        <div className="blackBoxBar">
          <Ban size={22} />
          <p>
            Today none of this is possible. Agents ship as{" "}
            <b>black boxes</b> &mdash; no owner, no enforceable mandate, no
            record of what they decided.
          </p>
        </div>
        <div className="proofStrip">
          <span>
            <b>18%</b>of large companies can produce a current list of the
            agents they are running<em>IBM</em>
          </span>
          <span>
            <b>1.5M</b>agents already running with no record of what they do
            <em>Gravitee</em>
          </span>
          <span>
            <b>2%</b>of companies have agents deployed at scale &mdash; 61% are
            still exploring<em>Capgemini Research Institute</em>
          </span>
        </div>
        <p className="shiftFootnote">
          <span>*</span> A Fortune 500 company ran fewer than 15 agents in 2025.
          Gartner projects <b>150,000+ each by 2028</b>. That is not a bigger
          tool estate &mdash; it is a second workforce, and it needs the three
          things every workforce needs.
        </p>
      </div>
    )
  },
  {
    kicker: "03 / the gap",
    className: "slide--gapTitle",
    title:
      "Every agent is getting an identity. Almost none is getting a mandate.",
    accentPhrases: ["Almost none is getting a mandate"],
    content: (
      <div className="gapSlide">
        <div className="gapGrid">
          <div className="gapPanel gapPanel--identity">
            <div className="gapPanelHead">
              <div className="gapPanelTitle">
                <Fingerprint size={20} />
                <h3>identity + access</h3>
              </div>
              <span className="gapStatus">becoming infrastructure</span>
            </div>
            <div className="gapRows">
              <div className="gapRow">
                <strong>Identity</strong>
                <span>Who is this agent?</span>
              </div>
              <div className="gapRow">
                <strong>Access</strong>
                <span>What systems can it reach?</span>
              </div>
              <div className="gapRow">
                <strong>Activity</strong>
                <span>What did it call?</span>
              </div>
            </div>
            <p className="gapVendors">
              Microsoft &middot; AWS &middot; Google already build here
            </p>
          </div>

          <div className="gapArrow" aria-hidden="true">
            <ArrowRight size={26} />
            <span className="gapArrowLabel">extends to</span>
          </div>

          <div className="gapPanel gapPanel--mandate">
            <div className="gapPanelHead">
              <div className="gapPanelTitle">
                <Stamp size={20} />
                <h3>business mandate</h3>
              </div>
              <span className="gapStatus">Orograph</span>
            </div>
            <div className="gapRows">
              <div className="gapRow">
                <strong>Decision</strong>
                <span>What may it decide?</span>
              </div>
              <div className="gapRow">
                <strong>Boundary</strong>
                <span>What data and systems may it act on?</span>
              </div>
              <div className="gapRow">
                <strong>Limit + owner</strong>
                <span>How far may it go &mdash; and who is accountable?</span>
              </div>
            </div>
          </div>
        </div>

        <p className="gapFooter">
          Identity says who the agent is. Access says what it can reach. A
          mandate says <b>what the company authorizes it to decide.</b>
        </p>
      </div>
    )
  },
  {
    kicker: "04 / founder",
    className: "slide--longTitle",
    title:
      "I worked in systems with thousands of applications, engineers and regulated decisions. Agents create a control problem those systems weren\u2019t built for.",
    accentPhrases: ["a control problem those systems weren\u2019t built for"],
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
          <div className="founderProofs founderProofs--three">
            <div>
              <strong>Lakestrom O&Uuml; &mdash; agents in production</strong>
              <p>
                Leads a team of ex-Microsoft data &amp; AI engineers building
                agentic AI and data systems across financial services, PE,
                transport and technology. The same problem keeps appearing:
                agents can increasingly act, but the enterprise control model has
                not caught up.
              </p>
            </div>
            <div>
              <strong>Maersk &mdash; enterprise complexity at scale</strong>
              <p>
                Worked inside a technology estate spanning ~3,000 applications,
                20,000 employees and 7,000 engineers. Saw first-hand the
                organisational machinery required to establish ownership, access,
                budgets and accountability at scale.
              </p>
            </div>
            <div>
              <strong>BCG &mdash; consequential decisions</strong>
              <p>
                Worked on data- and technology-heavy programmes in banks and
                financial institutions, including a digital twin with ~$130M
                impact. Built around decisions that had to be attributable,
                approved and defensible.
              </p>
            </div>
          </div>
          <p className="founderClose">
            Orograph comes directly from working across both worlds:{" "}
            <b>enterprise controls</b> and <b>AI that can act</b>.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "05 / the instrument",
    className: "slide--bkCardTitle",
    title:
      "Think of a company credit card. You do not control what your staff decide to buy \u2014 you control the card. Orograph \u2014 same, but for all kinds of authority.",
    accentPhrases: ["you control the card"],
    content: (
      <div className="cardSlide mandateSlide">
        <div className="cardBadges">
          <span>owner</span>
          <span>decisions</span>
          <span>data</span>
          <span>systems</span>
          <span>limits</span>
          <span>history</span>
        </div>
        <div className="instrStage">
          <svg
            className="instrLines"
            viewBox="0 0 1200 460"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="var(--violet-bright)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M357 70 C 384 92, 390 108, 404 146" />
              <path d="M312 230 L 404 230" />
              <path d="M357 390 C 384 368, 390 352, 404 314" />
              <path d="M843 70 C 816 92, 810 108, 796 146" />
              <path d="M888 230 L 796 230" />
              <path d="M843 390 C 816 368, 810 352, 796 314" />
            </g>
          </svg>

          <article className="instrSat instrSat--tl">
            <Users size={17} />
            <h3>owner</h3>
            <p>Customer Operations</p>
          </article>

          <article className="instrSat instrSat--ml">
            <Stamp size={17} />
            <h3>may decide</h3>
            <p>Refunds &middot; cancellations &middot; account changes</p>
          </article>

          <article className="instrSat instrSat--bl">
            <CircleDollarSign size={17} />
            <h3>financial authority</h3>
            <p>Refunds up to &euro;500</p>
          </article>

          <div className="corpCard">
            <div className="corpCard__top">
              <span className="corpCard__chip" aria-hidden="true" />
              <span className="corpCard__brand">Orograph</span>
            </div>
            <div className="corpCard__num">
              <i /><i /><i /><b>0412</b>
            </div>
            <div className="corpCard__foot">
              <div>
                <small>issued to</small>
                <span>customer.operations.agent</span>
              </div>
              <div>
                <small>valid thru</small>
                <span>30 Sep</span>
              </div>
            </div>
          </div>

          <article className="instrSat instrSat--tr">
            <Database size={17} />
            <h3>data boundary</h3>
            <p>
              Customer record + order history
              <i>no payment credentials</i>
            </p>
          </article>

          <article className="instrSat instrSat--mr">
            <Network size={17} />
            <h3>system authority</h3>
            <p>
              CRM: write
              <i>billing: limited write &middot; ERP: read only</i>
            </p>
          </article>

          <article className="instrSat instrSat--br">
            <Scale size={17} />
            <h3>escalation</h3>
            <p>Outside the mandate &rarr; human approval</p>
          </article>
        </div>

        <div className="cardScope">
          <Fingerprint size={18} />
          <p>
            <b>Today:</b> enforced inside Orograph. <b>Next:</b> the same mandate
            checked at the tool boundary for agents built elsewhere.
          </p>
        </div>
      </div>
    )
  },

  {
    kicker: "06 / coverage",
    className: "slide--covTitle",
    title:
      "The agent can run anywhere. The mandate is checked when it acts on the business.",
    accentPhrases: ["when it acts on the business"],
    content: (
      <div className="covSlide">
        <div className="covFlow">
          <div className="covEnd">
            <span className="covEnd__label">
              agents
              <em>where they already run</em>
            </span>
            <ul>
              <li>Copilot Studio</li>
              <li>LangGraph / Bedrock</li>
              <li>Internal agent</li>
            </ul>
          </div>

          <ArrowRight className="covArrow" size={24} />

          <div className="covGate">
            <span className="covGate__brand">Orograph</span>
            <strong>Mandate check</strong>
            <code>decision &middot; data &middot; system &middot; limit</code>
            <div className="covGate__verdicts">
              <em className="is-allow">allow</em>
              <em className="is-escalate">escalate</em>
              <em className="is-decline">decline</em>
            </div>
          </div>

          <ArrowRight className="covArrow" size={24} />

          <div className="covEnd covEnd--systems">
            <span className="covEnd__label">
              business systems
              <em>where consequences happen</em>
            </span>
            <ul>
              <li>Payments</li>
              <li>ERP / ledger</li>
              <li>Customer data</li>
              <li>Production / communications</li>
            </ul>
          </div>
        </div>

        <div className="covCases">
          <div className="covExample">
            <div className="covExample__text">
              <span className="covExample__eyebrow">example</span>
              <strong>Customer support agent</strong>
              <small>refund request</small>
            </div>
            <ArrowRight className="covExample__arrow" size={30} />
          </div>
          <article className="covCase covCase--allow">
            <span className="covCase__v">allow</span>
            <strong>Refund &euro;120</strong>
            <small>within mandate</small>
          </article>
          <article className="covCase covCase--escalate">
            <span className="covCase__v">escalate</span>
            <strong>Refund &euro;900</strong>
            <small>above the &euro;500 limit</small>
          </article>
          <article className="covCase covCase--decline">
            <span className="covCase__v">decline</span>
            <strong>Export payment credentials</strong>
            <small>outside the data boundary</small>
          </article>
        </div>

        <p className="covCasesNote">
          Same mandate pattern applies across functions.
        </p>

        <div className="covScope">
          <span>
            <b>today</b>Orograph-native agents
          </span>
          <span className="is-next">
            <b>next</b>third-party agents at the tool boundary
          </span>
        </div>
      </div>
    )
  },

  {
    kicker: "07 / one database \u00b7 every agent \u00b7 every mandate",
    className: "slide--dbTitle",
    title: "Every agent. Every mandate. Every version. One database.",
    accentPhrases: ["One database"],
    content: (
      <div className="dbSlide">
        <div className="dbConsole">
          <p className="dbAsk">
            Which agents can move money, change customer data, or act without a
            human owner?
          </p>

          <div className="dbQy">
            <span className="k">select</span> agent, authority, boundary, owner{" "}
            <span className="k">from</span> mandates{"\n"}
            <span className="k">where</span> system{" "}
            <span className="k">in</span> (
            <span className="s">
              &lsquo;payments&rsquo;, &lsquo;customer_data&rsquo;,
              &lsquo;production&rsquo;, &lsquo;contracts&rsquo;
            </span>
            ){"\n"}
            {"   "}
            <span className="k">or</span> owner <span className="k">is null</span>;
          </div>

          <div className="dbMeter">
            <span>1,412 rows &middot; 0.38 s</span>
            <span className="r">fleet-wide &middot; every mandate &middot; every version</span>
          </div>

          <div className="dbGrid">
            <div className="dbRow dbRow--head">
              <b>agent</b>
              <span>authority</span>
              <span>boundary</span>
              <span>owner</span>
            </div>
            {[
              ["support_agent_04", "refund \u2264 \u20ac500", "billing.write", "M. Larsen"],
              ["collections_agent", "payment plan \u2264 \u20ac5k", "ledger.write", ""],
              ["customer_ops_12", "account changes", "customer.*", "R. Sandhu"],
              ["data_export_bot", "bulk export", "customer_data.export", ""],
              ["deploy_assistant", "ship to production", "production.deploy", "K. Iversen"],
              ["contract_drafter", "send for signature", "contract.send", ""],
              ["payouts_runner", "disburse \u2264 \u20ac25k", "payments.write", "A. Whitfield"],
              ["kyc_reviewer_2", "request documents", "customer.read", "M. Larsen"],
              ["renewals_outreach", "price change \u2264 5%", "contract.send", ""],
              ["fraud_screen_v3", "freeze account", "customer.write", "S. Okafor"]
            ].map(([agent, authority, boundary, owner]) => (
              <div className="dbRow" key={agent}>
                <b>{agent}</b>
                <span>{authority}</span>
                <span>{boundary}</span>
                <span>{owner ? owner : <mark>none</mark>}</span>
              </div>
            ))}
          </div>

          <div className="dbAct">
            <button className="dbBtn" type="button">
              Return these 1,412 agents to their last approved mandate &rarr;
            </button>
          </div>
        </div>

        <p className="dbKicker">
          <b>The runtime reads the same records you query.</b> One change can
          govern one agent or the whole fleet. Postgres underneath &mdash;
          ordinary BI, SQL and audit tooling work across every mandate you have
          ever issued.
        </p>
      </div>
    )
  },
  {
    kicker: "08 / economics",
    title: "The same constraint that makes an agent safer also makes it cheaper.",
    accentPhrases: ["safer", "cheaper"],
    content: (
      <div className="econSlide">
        <p className="econLead">
          A narrow mandate means fewer tools, less context, fewer exploratory
          calls, and more opportunities to use smaller models.
        </p>

        <div className="econMain">
          <div className="econTable">
            <div className="econTable__row econTable__row--head">
              <span>driver</span>
              <span>monolithic agent</span>
              <span>narrow mandate</span>
              <span>effect</span>
            </div>
            {[
              ["Tool + context", "25 tools in prompt", "4 relevant tools", "Fewer input tokens"],
              ["Model", "Frontier model by default", "Right-sized model per task", "Lower model cost"],
              ["Exploration", "Broad reasoning + retries", "Narrow objective + bounded actions", "Fewer calls"],
              ["Human review", "Broad review surface", "Only exceptions escalate", "Less review"]
            ].map(([driver, mono, narrow, effect]) => (
              <div className="econTable__row" key={driver}>
                <span className="econTable__driver">{driver}</span>
                <span className="econTable__mono">{mono}</span>
                <span className="econTable__narrow">{narrow}</span>
                <span className="econTable__effect">{effect}</span>
              </div>
            ))}
          </div>

          <div className="econBenchmark">
            <div className="econBenchmark__label">
              <Gauge size={16} />
              <span>observed benchmark</span>
            </div>
            <div className="econBenchmark__figure">
              <span className="econBenchmark__in">$4.90</span>
              <ArrowRight size={26} />
              <span className="econBenchmark__out">$0.45</span>
            </div>
            <div className="econBenchmark__multiple">
              &asymp; 11&times; lower all-in cost
            </div>
            <p className="econBenchmark__note">
              Narrower authority reduces tool context, model cost, exploratory
              calls and human review.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "09 / go-to-market & pricing",
    className: "slide--gtmTitle",
    title:
      "Pricing and ICPs: We start where AI already presses the button.",
    accentPhrases: ["presses the button"],
    content: (
      <div className="gtmSlide">
        <div className="gtmCols">
          <section className="gtmCol">
            <div className="panelHeader">
              <Bot size={18} />
              <span>who</span>
            </div>
            <h3 className="gtmColTitle">AI-native SaaS + AI integrators</h3>
            <p className="gtmColBody">
              Agents already take consequential actions for customers.
            </p>
            <p className="gtmColNote">~300 Nordic target accounts</p>
          </section>

          <section className="gtmCol">
            <div className="panelHeader">
              <Target size={18} />
              <span>land</span>
            </div>
            <h3 className="gtmColTitle">One consequential workflow</h3>
            <p className="gtmColBody">
              Put the first production agent under an explicit mandate.
            </p>
            <p className="gtmColNote">Target: 3&ndash;5 design partners</p>
          </section>

          <section className="gtmCol">
            <div className="panelHeader">
              <Layers3 size={18} />
              <span>expand</span>
            </div>
            <h3 className="gtmColTitle gtmColTitle--path">
              1 workflow &rarr; 10 agents &rarr; 100+ &rarr; enterprise-wide
            </h3>
            <p className="gtmColBody">
              Expansion follows every new authority delegated to AI.
            </p>
          </section>
        </div>

        <section className="gtmModel">
          <div className="panelHeader">
            <CircleDollarSign size={18} />
            <span>commercial model</span>
          </div>
          <div className="gtmModelGrid">
            <div className="gtmFig">
              <span className="gtmFig__k">setup</span>
              <b className="gtmFig__n">$30k</b>
              <span className="gtmFig__d">one-off integration</span>
            </div>
            <div className="gtmFig">
              <span className="gtmFig__k">minimum</span>
              <b className="gtmFig__n">$2.5k / month</b>
              <span className="gtmFig__d">subscription floor</span>
            </div>
            <div className="gtmFig">
              <span className="gtmFig__k">100 agents</span>
              <b className="gtmFig__n">$50 / agent / month</b>
              <span className="gtmFig__arr">$60k ARR</span>
            </div>
            <div className="gtmFig">
              <span className="gtmFig__k">1,000 agents</span>
              <b className="gtmFig__n">$25 / agent / month</b>
              <span className="gtmFig__arr">$300k ARR</span>
            </div>
          </div>
        </section>
      </div>
    )
  },

  {
    kicker: "10 / where we sit",
    className: "slide--covTitle",
    title:
      "Identity and access are becoming infrastructure. Business authority is a separate layer.",
    accentPhrases: ["Business authority"],
    content: (
      <div className="sitSlide">
        <div className="sitStack">
          <div className="sitLayer">
            <span className="sitLayer__icon"><Workflow size={22} /></span>
            <div className="sitLayer__id">
              <h3>agent frameworks</h3>
              <p>LangGraph &middot; Copilot Studio &middot; Bedrock &middot; custom</p>
            </div>
            <p className="sitLayer__do">Build and run the agent</p>
          </div>

          <ChevronDown className="sitDown" size={22} aria-hidden="true" />

          <div className="sitLayer">
            <span className="sitLayer__icon"><Fingerprint size={22} /></span>
            <div className="sitLayer__id">
              <h3>identity + IAM</h3>
              <p>Microsoft &middot; AWS &middot; Google</p>
            </div>
            <p className="sitLayer__do">
              Identify the agent and grant system access
            </p>
          </div>

          <ChevronDown className="sitDown" size={22} aria-hidden="true" />

          <div className="sitLayer sitLayer--oro">
            <span className="sitLayer__icon"><Stamp size={26} /></span>
            <div className="sitLayer__id">
              <h3>Orograph</h3>
              <p>business authority</p>
            </div>
            <div className="sitLayer__body">
              <p className="sitLayer__do">
                Encode and enforce the company&rsquo;s mandate
              </p>
              <p className="sitLayer__dims">
                decision &middot; purpose &middot; data boundary &middot; limits
                &middot; escalation &middot; accountability
              </p>
            </div>
          </div>

          <ChevronDown className="sitDown" size={22} aria-hidden="true" />

          <div className="sitLayer">
            <span className="sitLayer__icon"><Network size={22} /></span>
            <div className="sitLayer__id">
              <h3>systems of consequence</h3>
              <p>
                ERP &middot; CRM &middot; payments &middot; customer data
                &middot; communications &middot; production
              </p>
            </div>
            <p className="sitLayer__do">
              Where an agent&rsquo;s action becomes a business consequence
            </p>
          </div>
        </div>

        <p className="sitStatement">
          We build on hyperscaler identity and access.{" "}
          <b>Orograph governs the business decision.</b>
        </p>
      </div>
    )
  },

  {
    kicker: "11 / what compounds",
    className: "slide--gtmTitle",
    title: "Every governed action makes Orograph harder to replace.",
    accentPhrases: ["harder to replace"],
    content: (
      <div className="wcSlide">
        <div className="wcLoop">
          <div className="wcStage">
            <div className="wcStage__head">
              <ShieldCheck size={18} />
              <strong>enforce</strong>
            </div>
            <p>Check every action</p>
          </div>

          <span className="wcArrow" aria-hidden="true">
            <ArrowRight size={20} />
          </span>

          <div className="wcStage wcStage--asset">
            <div className="wcStage__head">
              <ScrollText size={22} />
              <strong>record</strong>
            </div>
            <p className="wcStage__fields">
              authority &middot; approver &middot; configuration &middot;
              action &middot; outcome
            </p>
          </div>

          <span className="wcArrow" aria-hidden="true">
            <ArrowRight size={20} />
          </span>

          <div className="wcStage">
            <div className="wcStage__head">
              <GitCompare size={18} />
              <strong>learn</strong>
            </div>
            <p>Compare failures, escalations and cost</p>
          </div>

          <span className="wcArrow" aria-hidden="true">
            <ArrowRight size={20} />
          </span>

          <div className="wcStage">
            <div className="wcStage__head">
              <Sparkles size={18} />
              <strong>improve</strong>
            </div>
            <p>Recommend better mandates and controls</p>
          </div>
        </div>

        <div className="wcBoxes">
          <div className="wcBox">
            <div className="wcBox__head">
              <History size={16} />
              <span>switching cost</span>
            </div>
            <strong>History cannot be recreated later.</strong>
            <p>
              Audits and incidents depend on the accumulated authority record.
            </p>
          </div>
          <div className="wcBox wcBox--next">
            <div className="wcBox__head">
              <Users size={16} />
              <span>cross-customer learning</span>
            </div>
            <strong>Patterns improve across deployments.</strong>
            <p>Benchmark configurations, never customer data.</p>
          </div>
        </div>

        <p className="wcBottom">
          The policy engine is copyable.{" "}
          <b>The accumulated authority history is not.</b>
        </p>
      </div>
    )
  },

  {
    kicker: "12 / the round",
    title: "$1.5M to prove Orograph works for agents we did not build.",
    accentPhrases: ["agents we did not build"],
    content: (
      <div className="theRoundSlide">
        <div className="roundRow">
          <section className="roundCol roundCol--today">
            <div className="panelHeader">
              <Database size={18} />
              <span>today &mdash; built and running</span>
            </div>
            <ul className="roundList">
              <li>Production runtime</li>
              <li>Mandates as structured records</li>
              <li>Fleet-wide history and querying</li>
              <li>Enforcement inside our own runtime</li>
              <li className="roundList__hi">
                1 design partner already working with us
              </li>
            </ul>
            <p className="roundToday__close">The core system exists.</p>
          </section>

          <section className="roundCol roundCol--next">
            <div className="panelHeader">
              <Milestone size={18} />
              <span>next 12 months</span>
            </div>
            <div className="roundMilestones">
              <div className="roundMilestone">
                <span className="roundMilestoneNum">1</span>
                <div className="roundMilestone__body">
                  <strong>External enforcement</strong>
                  <p>Third-party agents governed at the tool boundary.</p>
                </div>
              </div>
              <div className="roundMilestone">
                <span className="roundMilestoneNum">2</span>
                <div className="roundMilestone__body">
                  <strong>5 paid design partners</strong>
                  <p>Consequential production workflows.</p>
                </div>
              </div>
              <div className="roundMilestone">
                <span className="roundMilestoneNum">3</span>
                <div className="roundMilestone__body">
                  <strong>Repeatable deployment</strong>
                  <p>
                    Same mandate across multiple frameworks and customer
                    systems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="roundCol roundCol--ask">
            <div className="panelHeader">
              <Rocket size={18} />
              <span>raising</span>
            </div>
            <strong className="roundAskAmount">$1.5M</strong>
            <ul className="roundAskUse">
              <li>2 core engineers</li>
              <li>external enforcement</li>
              <li>paid production deployments</li>
            </ul>
          </section>
        </div>

        <div className="roundClose">
          <p className="roundCloseStatement">
            Every agent is getting an identity. Orograph gives it a mandate.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "13 / appendix",
    title: "Appendix",
    className: "slide--appendixBreaker",
    content: (
      <div className="appendixBreaker">
        <p className="appendixBreakerTitle">
          The governed agent workforce, in the product
        </p>
      </div>
    )
  },
  {
    kicker: "14 / appendix",
    title:
      "Across every tenant, each agent is a database record \u2014 observable, versioned and changeable at runtime.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/agents-lines-in-database.png"
        alt="Governance dashboard agents table — one row per agent identity"
        note={
          <>
            Roll back a version, edit a prompt, switch a model or change data
            ownership &mdash; <b>no deployment</b>. The runtime reads the new
            state on the next turn.
          </>
        }
      />
    )
  },
  {
    kicker: "15 / appendix",
    title:
      "Each agent is a record \u2014 created in minutes, then equipped with the instructions, tools and data it needs.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/agent-record-overview.png"
        alt="Agent record overview \u2014 instructions, equipment, model, autonomy, comms, memory, schedule and proof"
      />
    )
  },
  {
    kicker: "16 / appendix",
    title:
      "Org charts let one mandate become a coordinated atomic workforce.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/orgchart-graph-view.png"
        alt="Graph view \u2014 level-1 agents, a PMO org chart of layer-2 workers, and independent agents"
      />
    )
  },
  {
    kicker: "17 / appendix",
    title:
      "The same agent, mandate and history persist across web, Telegram and other channels.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/chats-and-channels.png"
        alt="Chats dashboard with agent cards next to a live Telegram thread"
      />
    )
  },
  {
    kicker: "18 / appendix",
    title:
      "Every part of an agent is structured data \u2014 not scattered files. That makes the whole workforce observable, queryable and governable by default.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/explorer-structured-record.png"
        alt="Explorer record detail \u2014 every field of one agent as structured columns"
      />
    )
  },
  {
    kicker: "19 / appendix",
    title:
      "Not just the agent itself: its memory, working state and owned data are structured tables too.",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/data-owned-tables.png"
        alt="Data view \u2014 an agent-owned table with its attribution and browsable rows"
      />
    )
  },
  {
    kicker: "20 / appendix",
    title:
      "Every element of the agent - fragments, tools, skills, capabilities and schema - is reusable across the entire fleet, versioned in catalogues and assembled at runtime",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/tools-catalogue.png"
        alt="Tools catalogue generated from the runtime ToolRegistry"
      />
    )
  },
  {
    kicker: "21 / appendix",
    title:
      "(some examples) Fragments, tools, skills, capabilities and schema packs all live versioned in catalogues",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/reusable-elements-examples.png"
        alt="Examples of prompt fragments, tools, skills, capabilities, schema packs, channels and plugins"
      />
    )
  },
  {
    kicker: "22 / appendix",
    title:
      "Every single trace is captured: governance decisions, agent tool calls, routing errors - all available for immediate analysis and continuous improvement",
    className: "slide--appendixImage",
    content: (
      <AppendixImage
        src="/appendix/events-trace-capture.png"
        alt="Append-only events stream with per-agent cost breakdown"
      />
    )
  },
  {
    kicker: "23 / appendix",
    title: "There are three ways to operate governed agents with Orograph.",
    accentPhrases: ["three ways"],
    content: (
      <div className="modesSlide">
        <section className="modeBand">
          <h4>re-assembly</h4>
          <div className="modeRow">
            <div className="modeNode">
              <Bot size={20} />
              <b>their agent</b>
              <span className="sdkTag">SDK</span>
            </div>
            <ElbowFan dir="out" />
            <div className="modeBadges">
              <span><Wrench size={13} />skills</span>
              <span><Sparkles size={13} />prompt</span>
              <span><Database size={13} />data</span>
            </div>
            <ElbowFan dir="in" />
            <div className="modeNode modeNode--oro">
              <Layers3 size={20} />
              <b>Orograph</b>
              <span>re-assembled as a governed record</span>
            </div>
          </div>
        </section>

        <section className="modeBand">
          <h4>control layer</h4>
          <div className="modeRow modeRow--control">
            <div className="modeNode">
              <Bot size={20} />
              <b>their agent, left in place</b>
              <div className="platformChips">
                <span>AWS</span>
                <span>MS Foundry</span>
                <span>LangGraph</span>
              </div>
            </div>
            <div className="mcpLanes">
              <div className="mcpLane">
                <span>tool call &middot; MCP</span>
                <i />
                <ChevronRight size={14} />
              </div>
              <div className="mcpLane mcpLane--back">
                <ChevronLeft size={14} />
                <i />
                <span>allow / decline &middot; recorded</span>
              </div>
            </div>
            <div className="modeNode modeNode--oro">
              <ShieldCheck size={20} />
              <b>Orograph</b>
              <span>control plane, in the path of the call</span>
            </div>
          </div>
        </section>

        <section className="modeBand">
          <h4>oro-native</h4>
          <div className="modeRow modeRow--native">
            <div className="dataTable">
              <div className="dataTable__head">
                <span>owner</span><span>scope</span><span>tier</span><span>budget</span><span>model</span>
              </div>
              <div className="dataTable__row">
                <span>M. Larsen</span><span>claims.eu.*</span><span>2</span><span>&euro;1,100</span><span>sonnet-5</span>
              </div>
              <div className="dataTable__row dataTable__row--ghost">
                <span>R. Sandhu</span><span>claims.uk.*</span><span>1</span><span>&euro;400</span><span>haiku-4.5</span>
              </div>
            </div>
            <ArrowRight className="hArrow hArrow--sm" size={20} />
            <div className="materialise">
              <code>materialiseAgent()</code>
              <em>reads the row at run time</em>
            </div>
            <ArrowRight className="hArrow hArrow--sm" size={20} />
            <div className="modeNode modeNode--oro">
              <Bot size={20} />
              <b>a running agent</b>
              <span>a new one is a row, not a repo &mdash; no code, no deploy</span>
            </div>
          </div>
        </section>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 problem",
    retired: true,
    title: "Every company just hired ten thousand workers overnight.",
    accentPhrases: ["ten thousand workers overnight"],
    content: (
      <div className="overnightSlide">
        <p className="overnightKicker">
          No badges. No managers. No spending limits. No record of what they
          did. <b>And they can hire more of each other.</b>
        </p>
        <div className="evidenceStrip">
          <MiniMetric
            value="18%"
            label="of enterprises maintain a current inventory of their own agents (IBM)"
            tone="amber"
          />
          <MiniMetric
            value="1.5M"
            label="agents already running with no monitoring and no audit trail (Gravitee)"
            tone="violet"
          />
          <MiniMetric
            value="<15 → 150,000+"
            label="agents per Fortune 500 company, 2025 → 2028 (Gartner)"
            tone="cyan"
          />
        </div>
        <div className="deadlineBar">
          <CalendarClock size={22} />
          <div>
            <strong>August 2026 &mdash; EU AI Act high-risk obligations enforce.</strong>
            <span>
              FINRA&rsquo;s 2026 report is explicit: narrow scope, permissions,
              audit trails, human checkpoints &mdash; and missing traces are a
              books-and-records violation. This stops being embarrassing and
              becomes illegal.
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 the mandate (spec v3)",
    retired: true,
    className: "slide--mandateDoc",
    title:
      "A mandate turns business authority into something a runtime can check.",
    accentPhrases: ["business authority", "runtime can check"],
    content: (
      <div className="mandateDocSlide">
        <p className="mandateDocLede">
          The same object defines what an agent may decide, what data it may
          use, what systems it may change, and when it must escalate.
        </p>

        <div className="mandateDocMain">
          <div className="mandateDocCard">
            <div className="mandateDocCard__head">
              <span className="mandateDocCard__badge">
                <Stamp size={18} />
              </span>
              <div className="mandateDocCard__titleWrap">
                <h3 className="mandateDocCard__title">
                  Customer Operations Agent
                </h3>
                <span className="mandateDocCard__meta">
                  Mandate v18 &middot; approved 12 Aug 2026
                </span>
              </div>
              <span className="mandateDocCard__pill">Active</span>
            </div>

            <div className="mandateDocFields">
              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <Users size={12} /> Owner
                </span>
                <p className="mandateDocField__value">Customer Operations</p>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <Target size={12} /> Purpose
                </span>
                <p className="mandateDocField__value">
                  Resolve routine customer account and order issues
                </p>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <Scale size={12} /> Decision authority
                </span>
                <p className="mandateDocField__value">
                  Refund &middot; cancel &middot; amend order &middot; correct
                  account details
                </p>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <Database size={12} /> Data boundary
                </span>
                <p className="mandateDocField__value">
                  Customer profile &middot; order history &middot; support
                  history
                </p>
                <span className="mandateDocField__sub">
                  <b>Excluded:</b> payment credentials
                </span>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <Network size={12} /> System authority
                </span>
                <p className="mandateDocField__value">CRM &mdash; write</p>
                <span className="mandateDocField__sub">
                  Billing &mdash; limited write &middot; ERP &mdash; read only
                </span>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <CircleDollarSign size={12} /> Limits
                </span>
                <p className="mandateDocField__value">
                  Refund &le; &euro;500
                </p>
                <span className="mandateDocField__sub">
                  Account deletion requires approval &middot; no export of
                  payment data
                </span>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <ShieldCheck size={12} /> Escalation
                </span>
                <p className="mandateDocField__value">
                  Outside mandate &rarr; named human approval
                </p>
              </div>

              <div className="mandateDocField">
                <span className="mandateDocField__label">
                  <CalendarClock size={12} /> Valid until
                </span>
                <p className="mandateDocField__value">30 Sep 2026</p>
              </div>
            </div>
          </div>

          <div className="mandateDocOutcomes">
            <span className="mandateDocOutcomes__label">
              same agent &middot; three actions
            </span>
            <div className="mandateDocOutcomeList">
              <div className="mandateDocOutcome mandateDocOutcome--allow">
                <div className="mandateDocOutcome__text">
                  <strong>Refund &euro;120</strong>
                  <span>within mandate</span>
                </div>
                <span className="mandateDocOutcome__verdict">Allow</span>
              </div>

              <div className="mandateDocOutcome mandateDocOutcome--escalate">
                <div className="mandateDocOutcome__text">
                  <strong>Delete customer account</strong>
                  <span>approval required</span>
                </div>
                <span className="mandateDocOutcome__verdict">Escalate</span>
              </div>

              <div className="mandateDocOutcome mandateDocOutcome--decline">
                <div className="mandateDocOutcome__text">
                  <strong>Export payment credentials</strong>
                  <span>outside mandate</span>
                </div>
                <span className="mandateDocOutcome__verdict">Decline</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mandateDocFoot">
          <History size={18} />
          <p>
            The mandate is used to approve the agent, check its actions,
            reconstruct its history, and query authority across the fleet.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 the boundary (spec v3)",
    retired: true,
    className: "slide--smallTitle",
    title:
      "The agent can run anywhere. The mandate is checked when it acts on the business.",
    accentPhrases: ["checked when it acts"],
    content: (
      <div className="bndSlide">
        <div className="bndHero">
          <div className="hEnd">
            <span className="hEndLabel">
              agents
              <em>where they already run</em>
            </span>
            <ul>
              <li>Copilot Studio agent</li>
              <li>LangGraph agent</li>
              <li>Bedrock agent</li>
              <li>Internal agent</li>
              <li>Orograph-native agent</li>
            </ul>
            <span className="bndColNote">
              Different models, frameworks and runtimes.
            </span>
          </div>

          <ArrowRight className="hArrow bndArrow" size={24} />

          <div className="bndCore">
            <span className="bndCore__brand">Orograph</span>
            <strong className="bndCore__title">Mandate check</strong>

            <div className="bndDims">
              <span>
                <ClipboardCheck size={13} className="bndDimIcon" /> decision
              </span>
              <span>
                <Database size={13} className="bndDimIcon" /> data context
              </span>
              <span>
                <Wrench size={13} className="bndDimIcon" /> system action
              </span>
              <span>
                <Scale size={13} className="bndDimIcon" /> limit / escalation rule
              </span>
            </div>

            <div className="bndOutcomes">
              <div className="bndOutcome is-allow">
                <ShieldCheck size={16} className="bndOutcomeIcon" />
                Allow
              </div>
              <div className="bndOutcome is-escalate">
                <Users size={16} className="bndOutcomeIcon" />
                Escalate
              </div>
              <div className="bndOutcome is-decline">
                <Ban size={16} className="bndOutcomeIcon" />
                Decline
              </div>
            </div>

            <span className="bndCore__note">
              decision + active mandate version + approver recorded
            </span>
          </div>

          <div className="bndFlow">
            <ArrowRight className="hArrow bndArrow" size={24} />
            <div className="bndFlowEx">
              <code>billing.refund &euro;120</code>
              <span className="bndFlowEx__v is-allow">&rarr; allow</span>
            </div>
            <div className="bndFlowEx bndFlowEx--blocked">
              <code>customer.export payment_credentials</code>
              <span className="bndFlowEx__v is-decline">&rarr; decline</span>
            </div>
          </div>

          <div className="hEnd hEnd--tools">
            <span className="hEndLabel">
              systems
              <em>where consequences happen</em>
            </span>
            <ul>
              <li>CRM / customer records</li>
              <li>ERP / ledger</li>
              <li>payments</li>
              <li>outbound communications</li>
              <li>production systems</li>
              <li>internal data</li>
            </ul>
            <span className="bndColNote">
              The boundary is the business action, not the model call.
            </span>
          </div>
        </div>

        <div className="bndScope">
          <div className="bndScope__item">
            <b>Today</b>
            <span>
              the mandate is issued and enforced for agents running through
              Orograph.
            </span>
          </div>
          <div className="bndScope__item is-next">
            <b>Next</b>
            <span>
              the same mandate is enforced at the tool boundary for agents built
              and hosted elsewhere.
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 one database (spec v3)",
    retired: true,
    className: "slide--dbTitle",
    title: "Every agent. Every mandate. Every version. One database.",
    accentPhrases: ["One database"],
    content: (
      <div className="dbSlide">
        <div className="dbGhosts" aria-hidden="true">
          <i style={{ right: "1%", top: "4%" }}>repo-a</i>
          <i style={{ right: "2.4%", top: "23%" }}>repo-b</i>
          <i style={{ right: "0%", top: "42%" }}>repo-c</i>
          <i style={{ right: "3%", top: "61%" }}>repo-d</i>
        </div>

        <div className="dbConsole">
          <p className="dbAsk">
            Which agents can take consequential actions without an active
            owner?
          </p>

          <div className="dbQy">
            <span className="k">select</span> agent, action_class,
            mandate_limit, owner{"\n"}
            <span className="k">from</span> active_agent_mandates{"\n"}
            <span className="k">where</span> consequential = true{"\n"}
            <span className="k">and</span> owner_status !={" "}
            <span className="s">&lsquo;active&rsquo;</span>;
          </div>

          <div className="dbMeter">
            <span>18 agents &middot; 0.37 s</span>
            <span className="r">
              fleet-wide &middot; current + historical versions
            </span>
          </div>

          <div className="dbGrid dbGrid--fit">
            <div className="dbRow dbRow--head">
              <b>agent</b>
              <span>authority</span>
              <span>boundary</span>
              <span>owner</span>
            </div>
            {[
              ["support_ops_04", "refund ≤ €500", "billing.write", "M. Larsen"],
              ["customer_export_02", "export customer data", "customer.*", ""],
              ["release_agent_07", "production deploy", "prod.deploy", ""],
              ["collections_03", "payment plan ≤ €5k", "ledger.write", "R. Sandhu"],
              ["pricing_11", "discount ≤ 8%", "crm.write", "T. Meyer"]
            ].map(([agent, authority, boundary, owner]) => (
              <div className="dbRow" key={agent}>
                <b>{agent}</b>
                <span>{authority}</span>
                <span>{boundary}</span>
                <span>{owner ? owner : <mark>none</mark>}</span>
              </div>
            ))}
          </div>

          <div className="dbAct">
            <button className="dbBtn" type="button">
              Return these agents to their last approved mandate &rarr;
            </button>
          </div>
        </div>

        <p className="dbKicker">
          <b>The runtime reads the same records you query.</b> One change can
          govern one agent or the whole fleet.
        </p>
        <p className="dbKickerNote">
          Postgres underneath: ordinary SQL, BI and audit tooling work across
          the workforce.
        </p>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 the gap / crux (v1)",
    retired: true,
    title:
      "Every agent is about to get an identity. None of them is getting a mandate.",
    accentPhrases: ["None of them is getting a mandate"],
    content: (
      <div className="cruxSlide">
        <div className="cruxGrid">
          <div className="cruxColumn cruxColumn--solved">
            <div className="cruxColumnHead">
              <Fingerprint size={18} />
              <span>identity</span>
              <em>solved, 2026</em>
            </div>
            <p className="cruxVendors">
              Microsoft Agent 365 + Entra Agent ID &middot; AWS Agent Registry
              &middot; Google Cloud Agent Registry
            </p>
            <ul>
              <li>unique agent identities</li>
              <li>human sponsors</li>
              <li>activity logs and tool visibility</li>
              <li>lifecycle states</li>
            </ul>
            <p className="cruxConcede">
              This is real, it works, and we build on top of it.
            </p>
          </div>
          <div className="cruxArrow" aria-hidden="true">
            <ArrowRight size={30} />
          </div>
          <div className="cruxColumn cruxColumn--open">
            <div className="cruxColumnHead">
              <Scale size={18} />
              <span>authority</span>
              <em>unsolved</em>
            </div>
            <ul className="cruxAxes">
              <li>
                <strong>Scope</strong>
                <span>which data and systems, ring-fenced</span>
              </li>
              <li>
                <strong>Authority tier</strong>
                <span>which decisions, at what value, needing whose approval</span>
              </li>
              <li>
                <strong>Budget</strong>
                <span>per decision, per turn, per month</span>
              </li>
            </ul>
            <p className="cruxConcede cruxConcede--open">
              Nobody encodes what an agent may <b>decide</b>, up to what value,
              or who is accountable when it is wrong.
            </p>
          </div>
        </div>
        <div className="cruxAnchor">
          <ScrollText size={20} />
          <p>
            Every regulated firm already maintains exactly that document for its
            people &mdash; a board-approved, externally audited{" "}
            <b>delegation-of-authority matrix</b>. Not one has it for agents.{" "}
            <b>We make it executable &mdash; and we attach it to the identity
            they are already issuing.</b>
          </p>
        </div>
        <div className="landscapeStrip">
          <span><Workflow size={15} />Frameworks build <b>one agent</b></span>
          <span><Database size={15} />Registries <b>list</b> agents</span>
          <span><Eye size={15} />Overlays <b>watch</b> agents</span>
          <span><Sparkles size={15} />Builders <b>ship</b> agents fast</span>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 the agent personnel file",
    retired: true,
    title: "This is what a governed agent looks like.",
    accentPhrases: ["governed agent"],
    content: (
      <div className="productSlide productSlide--file">
        <PersonnelFile />
        <p className="bottomCaption">
          Non-technical operators build and run the workforce. Every agent
          versioned, every decision reconstructable, every change attributable
          to the person who made it.
        </p>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 mechanism",
    retired: true,
    title:
      "Code defines what an agent can be. Data defines what each agent is.",
    accentPhrases: ["Data defines what each agent is"],
    content: (
      <div className="mechanismSlide">
        <div className="mechanismGrid">
          <div className="mechPanel">
            <div className="panelHeader">
              <Layers3 size={18} />
              <span>shared runtime &mdash; one generic path</span>
            </div>
            <p>
              Model invocation, tool execution, permission enforcement, memory
              loading, event processing, trace recording. The same code
              constructs every agent.
            </p>
            <p className="mechK8s">
              The closest established analogue is a Kubernetes control plane
              &mdash; declarative spec, versioned, with an admission controller
              that refuses anything unauthorised. It holds for the control plane
              and breaks at reconciliation: Kubernetes converges because a
              pod&rsquo;s desired state is checkable and its actions idempotent.
              Neither is true of a cognitive worker.{" "}
              <b>We deliberately did not take the promise of convergence.</b>
            </p>
            <div className="mechProof">
              <Ban size={16} />
              <span>
                There is no <code>class PMO extends Agent</code> anywhere. A lint
                rule makes per-caller special-casing a build failure &mdash;{" "}
                <code>if (ctx.agent_id === &quot;pmo&quot;)</code> is banned in
                tool handlers.
              </span>
            </div>
          </div>
          <div className="mechPanel mechPanel--record">
            <div className="panelHeader">
              <Database size={18} />
              <span>per-agent record &mdash; everything that differs</span>
            </div>
            <div className="mechFields">
              {[
                "identity & ownership",
                "role & objectives",
                "prompt versions",
                "model policy",
                "skills & tools",
                "access grants",
                "memory bindings",
                "manager & subordinates",
                "budgets",
                "evaluations",
                "status",
                "operating history"
              ].map((field) => (
                <span key={field}>{field}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="authorityClaim">
          <ShieldCheck size={22} />
          <p>
            An agent cannot acquire a capability that isn&rsquo;t a grant row.
            Scope, authority and budget are checked at a single enforcement
            point, and materialisation fails closed on an unregistered tool
            &mdash; so <b>&ldquo;an agent running with permissions nobody
            granted&rdquo; is not a state this system can enter.</b>{" "}
            <span>
              That is a claim about authority, not about output. We can prove
              what an agent was permitted to do. Nobody can prove what a model
              will say.
            </span>
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 velocity",
    retired: true,
    title: "Agents as code are applications. Agents as data are a workforce.",
    accentPhrases: ["Agents as data are a workforce"],
    content: (
      <div className="versusSlide">
        <Versus
          rows={[
            {
              label: "Change an agent's instructions",
              market: "Raise a ticket with IT and wait — PR, review, build, deploy",
              oro: "Edit the record; the runtime reads it on the next turn"
            },
            {
              label: "Who can make the change",
              market: "Engineers only",
              oro: "The accountable business owner, inside their authority tier"
            },
            {
              label: "Roll back a bad prompt",
              market: "Redeploy an older build",
              oro: "Point the agent back to its last approved version"
            },
            {
              label: "Prove who approved an action",
              market: "Stitch logs, hunt PR comments, reconstruct",
              oro: "The approval is a record, not a reconstruction"
            },
            {
              label: "Review the change before it ships",
              market:
                "git diff, PR review, type-checking, CI — free and mature",
              oro:
                "Schema validation + approval state machine; no line-level diff culture",
              concede: true
            }
          ]}
        />
        <div className="caveatBar">
          <Wrench size={18} />
          <p>
            New runtime primitives, tool implementations, security enforcement
            and schema changes still require code. What is true is narrower and
            still substantial:{" "}
            <b>
              most changes that differentiate one agent from another no longer
              require a software deployment.
            </b>
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 change control",
    retired: true,
    title: "Faster to change — and harder to change without permission.",
    accentPhrases: ["harder to change without permission"],
    content: (
      <div className="versusSlide">
        <Versus
          rows={[
            {
              label: "Change what an agent does",
              market: "Ticket → PR → build → deploy → monitor",
              oro:
                "Edit the record; the approval tier fires if the change crosses one; live next turn"
            },
            {
              label: "Grant a tool",
              market: "Code change in the agent's wiring",
              oro: "Grant row + a named human sponsor for high-risk classes"
            },
            {
              label: "Try it safely first",
              market: "Build the routing logic yourself",
              oro: "Try it on 5% before you turn it on for four thousand"
            },
            {
              label: "Roll back",
              market: "Redeploy a previous build",
              oro: "Point back to the last approved version — instant, no collateral"
            },
            {
              label: "Re-tune prompts for a new model family",
              market:
                "Required — and a code-first team has a local repro harness and bisects deterministically",
              oro:
                "Required, same work; a composed prompt is more model-coupled, not less",
              concede: true
            }
          ]}
        />
        <div className="reframeBar">
          <ClipboardCheck size={18} />
          <p>
            The real enterprise bottleneck is not change speed &mdash; it is{" "}
            <b>revalidation cost</b>. Because every change is versioned and
            carries its own evaluation evidence, revalidation becomes cheap.
            That is aimed straight at the function that blocks every AI project
            in the bank.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 point-in-time control",
    retired: true,
    title:
      "You cannot see inside the model. You can see everything around it.",
    accentPhrases: ["everything around it"],
    content: (
      <div className="versusSlide">
        <Versus
          rows={[
            {
              label: "“Who approved the instructions behind this action?”",
              market: "Stitch git blame + deploy logs + APM traces",
              oro: "Provenance edge: event → version → approver record"
            },
            {
              label: "“What was it permitted to do at 14:07 on the 3rd?”",
              market: "Reconstruct from the commit and the config at that deploy",
              oro: "Version snapshot + grant rows as of that event"
            },
            {
              label: "“Which agents can write, with no active owner?”",
              market: "Not answerable without building an inventory first",
              oro: "One query"
            },
            {
              label: "Contain a misbehaving agent",
              market: "Binary on/off, or redeploy with the tool removed",
              oro:
                "Suspend one grant · one skill · one model · one branch · one customer context"
            },
            {
              label: "Undo the effects already committed",
              market: "Nobody can",
              oro: "Nobody can — suspension is a brake, not an undo",
              tie: true
            }
          ]}
        />
        <div className="caveatBar caveatBar--claim">
          <ShieldCheck size={18} />
          <p>
            A monitor tells you an agent did something it shouldn&rsquo;t.{" "}
            <b>We make it impossible to define one that can.</b> Intent, context,
            action and assurance are at full coverage today; effect coverage is
            partial &mdash; a stated gap with a roadmap, not a rounding error.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 compounding (v1)",
    retired: true,
    title: "The fleet becomes one queryable dataset — and that is the asset.",
    accentPhrases: ["one queryable dataset"],
    content: (
      <div className="compoundSlide">
        <div className="compoundGrid">
          <div className="compoundPanel compoundPanel--proven">
            <div className="panelHeader">
              <Gauge size={18} />
              <span>proven today &mdash; demoable in ten seconds</span>
            </div>
            <ul>
              <li>Which agents have write access with no active owner?</li>
              <li>Which tools cause the most failures?</li>
              <li>Which agents burned tokens for 90 days and produced nothing?</li>
              <li>Which agents are still on last quarter&rsquo;s model?</li>
            </ul>
            <pre className="fleetQuery">
{`select agent_id, owner, last_run
from   agents
where  can_write
and    owner_status <> 'active';`}
            </pre>
            <p>
              Those are queries, not projects. No app-per-agent architecture can
              answer them.
            </p>
          </div>
          <div className="compoundPanel compoundPanel--thesis">
            <div className="panelHeader">
              <BrainCircuit size={18} />
              <span>the thesis &mdash; stated as a thesis</span>
            </div>
            <p>
              Every execution writes a row joining task type, configuration,
              actions, outcome, evaluation and cost. That join is the asset
              &mdash; it is not derivable from any model provider&rsquo;s logs.
            </p>
            <div className="learnLoop">
              {["run", "observe", "evaluate", "compare", "improve", "propagate"].map(
                (step) => (
                  <span key={step}>{step}</span>
                )
              )}
            </div>
            <p className="compoundHonest">
              We have the substrate. We have not yet run it at fleet scale.{" "}
              <b>That is what the pilots are for.</b>
            </p>
          </div>
        </div>
        <div className="moatNote">
          <Target size={18} />
          <p>
            Encoded authority and operating history are <b>switching cost</b>,
            and we would rather name it correctly. The genuine compounding
            effect is cross-customer configuration learning &mdash; not customer
            data, but the shape of what works. A benchmark library, not a data
            pool. <b>Benchmark rights go into the design-partner contracts now</b>{" "}
            &mdash; that consent cannot be retrofitted.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 economics (v1)",
    retired: true,
    title: "10–40× cheaper, and it is arithmetic — not a slogan.",
    accentPhrases: ["it is arithmetic"],
    content: (
      <div className="economicsSlide">
        <div className="leverTable">
          <div className="leverHead">
            <span>lever</span>
            <span>monolithic frontier agent</span>
            <span>atomic department</span>
            <span>multiple</span>
          </div>
          {[
            ["Input tokens per call", "33,750", "6,150", "5.5×"],
            ["Number of model calls", "14", "6", "2.3×"],
            ["Blended model price", "frontier tier", "mid / small tier", "1.7×"],
            ["Retry / exploratory loops", "1.25", "1.05", "1.2×"]
          ].map(([lever, mono, dept, mult]) => (
            <div className="leverRow" key={lever}>
              <span>{lever}</span>
              <span>{mono}</span>
              <span>{dept}</span>
              <b>{mult}</b>
            </div>
          ))}
          <div className="leverRow leverRow--total">
            <span>cost per invoice exception</span>
            <span>$2.20</span>
            <span>$0.11</span>
            <b>≈ 20×</b>
          </div>
        </div>
        <div className="economicsSide">
          <div className="econInsight">
            <KeyRound size={18} />
            <p>
              <b>The tool catalogue is the context.</b> A grant row saying
              &ldquo;this agent has four tools&rdquo; is a direct token
              reduction, not just a security control &mdash; the governance
              model and the cost model are the same mechanism.
            </p>
          </div>
          <div className="econInsight">
            <Building2 size={18} />
            <p>
              <b>All-in, including human review: $4.90 → $0.45 ≈ 11×.</b> Lower
              than the token multiple, because review is a floor cost. Model
              tier &mdash; what most decks lead with &mdash; is the smallest
              lever of the four.
            </p>
          </div>
        </div>
        <div className="collapseBar">
          <strong>Where the multiple collapses:</strong> non-decomposable work
          → worse than 1× &middot; over-decomposition re-serialises context at
          every boundary &middot; routing accuracy below ~90% &middot; against
          an already well-engineered baseline → 2&ndash;4× &middot; below ~1,000
          tasks/month &middot; if frontier prices collapse to small-tier, the
          multiple roughly halves. <b>We would rather give you the band than the
          headline.</b>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 ask (v1)",
    retired: true,
    title: "Every company will run more agents than employees.",
    accentPhrases: ["more agents than employees"],
    content: (
      <div className="businessSlide">
        <div className="businessGrid">
          <div className="bizPanel">
            <div className="panelHeader">
              <Network size={18} />
              <span>wedge</span>
            </div>
            <p>
              Financial-services and insurance operations &mdash;
              audit-mandatory, approval-heavy workflows.
            </p>
            <div className="buyingGroup">
              <span>CAIO <em>buys</em></span>
              <span>CISO <em>gates</em></span>
              <span>GRC <em>obliges</em></span>
              <span>Ops <em>uses</em></span>
            </div>
          </div>
          <div className="bizPanel bizPanel--price">
            <div className="panelHeader">
              <CircleDollarSign size={18} />
              <span>pricing</span>
            </div>
            <strong className="priceLine">Per governed agent, per month.</strong>
            <p>
              Tiered by fleet size, annual, with a floor. Not a percentage of
              token spend &mdash; we deliberately do not price on the thing we
              shrink, so making your bill smaller makes us more valuable, not
              less.
            </p>
            <div className="priceLadder">
              <span><b>$25&ndash;75K</b><em>fixed-fee pilot</em></span>
              <span><b>$100&ndash;300K</b><em>early commercial ACV</em></span>
              <span><b>dozens &rarr; thousands</b><em>governed agents</em></span>
            </div>
          </div>
        </div>
        <div className="askBand">
          <div className="watermark">$1.5M</div>
          <h3>Pre-seed, as three dated milestones</h3>
          <ol>
            <li>
              <b>Govern an agent Orograph did not build, by month 6</b> &mdash;
              trace ingestion, MCP interception, Entra federation.
            </li>
            <li>
              <b>Three paid financial-services pilots</b>, with benchmark rights
              written into the contract.
            </li>
            <li>
              <b>The first two engineering hires</b> &mdash; two ex-Microsoft
              data &amp; AI engineers committing full-time on close.
            </li>
          </ol>
          <p className="askClose">
            Orograph is where that workforce is <b>hired, governed and held
            accountable</b>.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 03 / the instrument (v1)",
    retired: true,
    className: "slide--cardTitle",
    title:
      "Think of a company credit card with superpowers. You do not control what your staff decide to buy \u2014 you control the card.",
    accentPhrases: ["you control the card"],
    content: (
      <div className="cardSlide">
        <div className="cardBadges">
          <span>budgets</span>
          <span>authority</span>
          <span>decisions</span>
          <span>history</span>
          <span className="cardBadges__more">&hellip;and more</span>
        </div>
        <div className="orbit">
          <svg className="orbitRing" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
            <ellipse
              cx="500" cy="250" rx="474" ry="212"
              fill="none"
              stroke="var(--border-violet)"
              strokeWidth="1.5"
              strokeDasharray="7 9"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <article className="orbitItem orbitItem--tl">
            <Stamp size={18} />
            <h3>How much can it approve?</h3>
            <p>A ceiling on decisions, not just spend. Above the line, a named person signs.</p>
          </article>

          <article className="orbitItem orbitItem--tr">
            <ScrollText size={18} />
            <h3>Who approved this?</h3>
            <p>The approver&rsquo;s name sits inside the decision &mdash; not in a log you have to stitch together.</p>
          </article>

          <article className="orbitItem orbitItem--ml">
            <History size={18} />
            <h3>Put it back how it was</h3>
            <p>Restore one agent to the permissions signed off in June. Nobody else is touched.</p>
          </article>

          <div className="corpCard">
            <div className="corpCard__top">
              <span className="corpCard__chip" aria-hidden="true" />
              <span className="corpCard__brand">Orograph</span>
            </div>
            <div className="corpCard__num">
              <i /><i /><i /><b>0412</b>
            </div>
            <div className="corpCard__foot">
              <div>
                <small>issued to</small>
                <span>claims.triage.completeness</span>
              </div>
              <div>
                <small>authority</small>
                <span>tier 2 &middot; &euro;50k</span>
              </div>
            </div>
          </div>

          <article className="orbitItem orbitItem--mr">
            <ShieldCheck size={18} />
            <h3>Prove nobody had access</h3>
            <p>&ldquo;No agent could reach the payments ledger in Q2.&rdquo; Monitoring only ever proves the opposite.</p>
          </article>

          <article className="orbitItem orbitItem--bl">
            <Table2 size={18} />
            <h3>Ask all of them at once</h3>
            <p>Which agents can move money, have no owner, and cost more than they return? One question.</p>
          </article>

          <article className="orbitItem orbitItem--br">
            <GitCompare size={18} />
            <h3>What has to be re-tested?</h3>
            <p>Change an agent and the system shows which controls moved &mdash; and proves the rest did not.</p>
          </article>
        </div>

        <div className="cardScope">
          <Fingerprint size={19} />
          <p>
            <b>Where the card works today:</b> issued and enforced inside our
            runtime. Month 6: the same card attached to a Microsoft Entra Agent
            ID and enforced at the tool call &mdash; governing agents we did not
            build.
          </p>
        </div>
      </div>
    )
  },
  {
    kicker: "retired \u00b7 04 / coverage (v1)",
    retired: true,
    className: "slide--smallTitle",
    title:
      "Orograph applies governance and transparency to agents that already exist — or creates any number of Orograph-native agents, equally easily.",
    accentPhrases: ["agents that already exist", "Orograph-native agents"],
    content: (
      <div className="coverageSlide">
        <div className="interceptHero">
          <div className="hEnd">
            <span className="hEndLabel">
              their agents &middot; their code
              <em>where they already run</em>
            </span>
            <ul>
              <li>LangGraph agent</li>
              <li>Copilot Studio agent</li>
              <li>Bedrock agent</li>
              <li>the one an analyst built</li>
            </ul>
          </div>

          <ArrowRight className="hArrow" size={26} />

          <div className="oroCard">
            <div className="oroCard__chip" aria-hidden="true" />
            <strong>Orograph</strong>
            <span className="oroCard__axes">owner &middot; limit &middot; record</span>
            <span className="oroCard__when">checked before the call</span>
            <div className="oroCard__verdict">
              <em className="is-allow">allow</em>
              <em className="is-decline">decline</em>
            </div>
          </div>

          <ArrowRight className="hArrow" size={26} />

          <div className="hEnd hEnd--tools">
            <span className="hEndLabel">
              the tools that move
              <em>money and data</em>
            </span>
            <ul>
              <li>payments</li>
              <li>the customer database</li>
              <li>the ledger</li>
              <li>outbound email</li>
            </ul>
          </div>
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
