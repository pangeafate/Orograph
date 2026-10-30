import type { ReactNode } from "react";
import {
  ArrowRight,
  Gauge,
  Handshake,
  KeyRound,
  Lightbulb,
  Receipt,
  Repeat,
  Scale,
  Coins,
  Rocket,
  Timer
} from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v10-model.css";

/* Design variants for "10 / business model". Every word of the original is kept;
   only arrangement and visual framing change. */

const TITLE =
  "Deployment fees and recurring platform revenue support a scalable business model, with managed operations adding revenue.";
const ACCENT = ["recurring platform revenue"];

const Source = ({ children }: { children: ReactNode }) => (
  <p className="srSource">{children}</p>
);

/** an input the pitch still needs — shown, not faked */
const Need = ({ children }: { children: ReactNode }) => (
  <span className="srNeed">data needed &middot; {children}</span>
);

const SOURCE = "Base case, business agents only, excludes coding tools · $1.30 per pound";

/* ---------------- variant B: customer lifecycle + receipt ---------------- */

const STAGES = [
  {
    step: "step 1",
    icon: <Rocket size={16} />,
    label: <>deployment &middot; actual</>,
    value: <>&euro;30K</>,
    text: "6 weeks, ~50 hours (actual working time)",
    tone: "green"
  },
  {
    step: "step 2",
    icon: <Repeat size={16} />,
    label: <>platform &middot; actual</>,
    value: (
      <>
        &euro;3,000<small>/mo</small>
      </>
    ),
    text: "recurring, 2–4 hours a week to run",
    tone: "green"
  },
  {
    step: "step 3",
    icon: <Gauge size={16} />,
    label: <>managed ops &middot; proposed</>,
    value: <>10%</>,
    text: "of the agent budget we run",
    tone: "violet"
  }
];

/* euro figures: €1.19 per pound (26 Oct 2026), $1.12 per euro (27 Oct 2026) */
const variantB: DeckSlide = {
  kicker: "10 / business model · variant B",
  className: "slide--longTitle",
  title:
    "Deployment and platform fees pay from day one, and the 10% managed fee grows with every customer's agent budget.",
  accentPhrases: ["the 10% managed fee grows with every customer's agent budget"],
  content: (
    <div className="v10B">
      <div className="v10B__journey">
        <div className="v10C__tags v10B__tags">
          {STAGES.map((t) => (
            <div className={`v10C__tag v10C__tag--${t.tone}`} key={t.step}>
              <span className="v10C__stub" aria-hidden="true">{t.icon}</span>
              <span className="srLabel">{t.label}</span>
              <strong>{t.value}</strong>
              <p>{t.text}</p>
            </div>
          ))}
        </div>

        <div className="v10B__switch">
          <span className="srLabel">how customers move to managed</span>
          <div className="v10B__stairs">
            <div className="v10B__stair v10B__stair--1">
              <KeyRound size={18} />
              <span>Own model keys</span>
            </div>
            <ArrowRight className="v10B__stairArrow" size={18} />
            <div className="v10B__stair v10B__stair--2">
              <Handshake size={18} />
              <span>Orograph side by side</span>
            </div>
            <ArrowRight className="v10B__stairArrow" size={18} />
            <div className="v10B__stair v10B__stair--3">
              <Gauge size={18} />
              <span>100% managed</span>
            </div>
          </div>
        </div>

        <p className="v10B__payback">
          <Coins size={20} />
          <span>
            <b>&euro;3K&ndash;5K</b> to acquire vs. a <b>&euro;30K</b> deployment fee: each direct customer
            repays its acquisition cost <b>6&ndash;10&times;</b> before the first platform invoice. Delivery
            hours, not cash, limit growth.
          </span>
        </p>
        <p className="v10B__note v10B__decision">
          <Scale size={16} />
          <span>
            <b>Decision:</b> the fee is 10% of the prepaid monthly agent budget, not of tokens used. When
            we rightsize models, the customer gets more work and our fee holds.
          </span>
        </p>
      </div>

      <aside className="v10B__receipt">
        <div className="v10B__receiptHead">
          <Receipt size={18} />
          <span>Per customer</span>
          <b>300-person company</b>
        </div>
        <div className="v10B__line"><span>Platform revenue</span><b>~&euro;36K a year</b></div>
        <div className="v10B__line"><span>Managed-operations fee</span><b>~&euro;8K (2026) &rarr; ~&euro;32K (2028)</b></div>
        <div className="v10B__total">
          <span>Revenue per company, 2028</span>
          <b>~&euro;68K a year, plus deployment</b>
        </div>
        <div className="v10B__line v10B__line--sub">
          <span>Through a partner</span>
          <b>~&euro;61K a year</b>
          <em>The partner keeps the &euro;30K deployment and 20% of the platform fee.</em>
        </div>
        <div className="v10B__line"><span>Cost to serve</span><b>2&ndash;4 hours a week (ST3)</b></div>
        <div className="v10B__line v10B__line--sub">
          <span>Gross margin</span>
          <b>over 70% &rarr; over 80% (2026 &rarr; 2028)</b>
          <em>Under &euro;1K a month in costs; we don&rsquo;t pay for the models, and infra cost per company is negligible.</em>
        </div>
        <div className="v10B__line v10B__line--sub">
          <span>Support &middot; separate cost</span>
          <b>&euro;1,000 a day today</b>
          <em>no more than an hour a week, decreasing</em>
        </div>
        <div className="v10B__line"><span>Acquisition cost</span><b>&euro;3K&ndash;5K</b></div>
      </aside>
      <Source>
        Base case, business agents only, excludes coding tools &middot; &euro;1.19 per pound, $1.12 per
        euro &middot; ST3 contract in pounds (&pound;25K, &pound;2,500/mo)
      </Source>
    </div>
  )
};

/* ---------------- variant C: price tags + stacked revenue bar ---------------- */

const TAGS = [
  { label: <>deployment &middot; actual</>, value: <>&pound;25K</>, text: "6 weeks, ~50 hours (actual working time)", tone: "green", icon: <Rocket size={16} /> },
  {
    label: <>platform &middot; actual</>,
    value: (
      <>
        &pound;2,500<small>/mo</small>
      </>
    ),
    text: "recurring, 2–4 hours a week to run",
    tone: "green",
    icon: <Repeat size={16} />
  },
  { label: <>managed ops &middot; proposed</>, value: <>10%</>, text: "of the agent budget we run", tone: "violet", icon: <Gauge size={16} /> }
];

/* bar geometry: the two stated 2028 components, ~$39K + ~$36K = ~$75K */
const PLATFORM_W = (39 / 75) * 100;
const MANAGED_W = (36 / 75) * 100;
const MANAGED_2026 = (9 / 36) * 100;

const variantC: DeckSlide = {
  kicker: "10 / business model · variant C",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v10C">
      <div className="v10C__top">
        <div className="v10C__tags">
          {TAGS.map((t, i) => (
            <div className={`v10C__tag v10C__tag--${t.tone}`} key={i}>
                            <span className="v10C__stub" aria-hidden="true">{t.icon}</span>
              <span className="srLabel">{t.label}</span>
              <strong>{t.value}</strong>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
        <div className="v10C__switch">
          <span className="srLabel">how customers move to managed</span>
          <div className="v10C__dial">
            <div className="v10C__dialTrack" aria-hidden="true"><i /></div>
            <div className="v10C__dialStops">
              <span><b /><em>Own model keys</em></span>
              <span><b /><em>Orograph side by side</em></span>
              <span className="is-hi"><b /><em>100% managed</em></span>
            </div>
          </div>
        </div>
      </div>

      <div className="v10C__bar">
        <div className="v10C__barHead">
          <span className="srLabel">Per customer</span>
          <b>300-person company</b>
          <span className="v10C__total">
            <em>Revenue per company, 2028</em>
            <strong>~$75K a year, plus deployment</strong>
          </span>
        </div>
        <div className="v10C__stack">
          <div className="v10C__seg v10C__seg--platform" style={{ width: `${PLATFORM_W}%` }}>
            <span>Platform revenue</span>
            <strong>~$39K a year</strong>
          </div>
          <div className="v10C__seg v10C__seg--managed" style={{ width: `${MANAGED_W}%` }}>
            <i className="v10C__seg2026" style={{ width: `${MANAGED_2026}%` }} aria-hidden="true" />
            <span>Managed-operations fee</span>
            <strong>~$9K (2026) &rarr; ~$36K (2028)</strong>
          </div>
          <div className="v10C__plus" aria-hidden="true">+</div>
        </div>
        <div className="v10C__axis" aria-hidden="true">
          <span style={{ left: `${PLATFORM_W + (MANAGED_W * MANAGED_2026) / 100}%` }}>2026</span>
          <span style={{ left: "100%" }}>2028</span>
        </div>
      </div>

      <div className="v10C__bottom">
        <div className="v10C__cell">
          <span className="srLabel"><Timer size={14} />Cost to serve</span>
          <b>2&ndash;4 hours a week (ST3)</b>
        </div>
        <div className="v10C__cell v10C__cell--need">
          <span className="srLabel">Gross margin</span>
          <Need>after models, infra, support</Need>
        </div>
        <div className="v10C__cell v10C__cell--need">
          <span className="srLabel">Acquisition cost</span>
          <Need>CAC and payback</Need>
        </div>
        <p className="v10C__note">
          <Lightbulb size={16} />
          <span>
            Open design choice: structure the managed fee so that efficiency raises
            our margin rather than shrinking our revenue.
          </span>
        </p>
      </div>
      <Source>{SOURCE}</Source>
    </div>
  )
};

const variants: DeckSlide[] = [variantB, variantC];

export default variants;
