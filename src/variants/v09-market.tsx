import type { ReactNode } from "react";
import { Briefcase, Factory, MapPin, Target, Users } from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v09-market.css";

/* design variants for slide 09 / market
   B — a bullseye: TAM / SAM / SOM as nested circles with leader-line callouts,
       the ideal customer described beside it
   C — a funnel: scale of need → TAM → SAM → SOM narrowing onto the target customer */

const TITLE =
  "Independent SMEs with 150–500 employees form an initial target segment with substantial automation needs.";
const ACCENTS = ["Independent SMEs with 150–500 employees"];

/** an input the pitch still needs — shown, not faked (copied from speedrunSlides) */
const Need = ({ children }: { children: ReactNode }) => (
  <span className="srNeed">data needed &middot; {children}</span>
);

const SOURCE = (
  <p className="srSource v09__source">
    Eurostat 2023, UK BPE 2025, US Census 2022, Ramp 2026, Gartner 2026 &middot; base case
  </p>
);

const ICP = (
  <>
    <b>Independent companies of 150&ndash;500 people</b> in the US, UK and EU, running the
    full set of management systems &mdash; sales, projects, decisions, finance &mdash; with
    no AI engineering team.
  </>
);
const BUYER = "The owner or COO, who already carries the cost of the work agents take on.";
const TAM_BIG = <>~$6B &rarr; ~$9B</>;
const TAM_DETAIL = (
  <>a year, 2026 &rarr; 2028: platform fees ~$5.0B + management fee ~$1.0B &rarr; ~$3.9B</>
);

/* euro figures for variant B: €1.19 per pound (26 Oct 2026), $1.12 per euro (27 Oct 2026) */
const TITLE_EUR =
  "Independent SMEs with 150–500 employees: ~28K companies in the EU, a ~€1.8B a year market by 2028.";
const ACCENTS_EUR = ["~28K companies in the EU, a ~€1.8B a year market by 2028"];
const ICP_EU = (
  <>
    <b>Founder-led independent companies of 150&ndash;500 people</b>
    Starting in the EU, running the full set of management systems (sales, projects,
    decisions, finance) with no AI engineering team.
  </>
);
/* start regions are highlighted: they are where the SOM begins */
const REGIONS = [
  { name: "Germany & Austria", value: 530 },
  { name: "Southern Europe", value: 420 },
  { name: "Central & Eastern", value: 310 },
  { name: "France", value: 190 },
  { name: "Benelux & Ireland", value: 160, start: true },
  { name: "Nordics & Baltics", value: 130, start: true }
];
const SECTORS = [
  { name: "Manufacturing", value: 10.2 },
  { name: "Trade", value: 5.8 },
  { name: "Health & care", value: 3.0 },
  { name: "Logistics", value: 2.4 },
  { name: "Construction", value: 2.0 },
  { name: "Professional services", value: 2.0 }
];

const variants: DeckSlide[] = [
  /* ---------------- variant B: the bullseye (euro figures, Oct 2026 model run) ---------------- */
  {
    kicker: "09 / market · variant B",
    title: TITLE_EUR,
    accentPhrases: ACCENTS_EUR,
    className: "slide--longTitle",
    content: (
      <div className="v09B v09B--eur">
        <div className="v09B__left">
          <div className="v09B__target">
            <div className="v09B__rings">
              <div className="v09B__ring v09B__ring--tam">
                <span className="v09B__tag">TAM</span>
                <b className="v09B__tamBig">~&euro;5.5B &rarr; ~&euro;8B</b>
              </div>
              <div className="v09B__ring v09B__ring--sam">
                <span className="v09B__tag">SAM</span>
                <b className="v09B__samBig">~&euro;1.2B &rarr; ~&euro;1.8B</b>
              </div>
              <div className="v09B__ring v09B__ring--som">
                <span className="v09B__somIn">
                  <span className="v09B__tag">SOM</span>
                  <b className="v09B__somBig">~&euro;23M</b>
                  <span className="v09B__somArr">ARR</span>
                </span>
              </div>
            </div>
            <div className="v09B__callouts">
              <div className="v09B__call v09B__call--tam">
                <span className="srLabel">TAM</span>
                <p>a year, 2026 &rarr; 2028, US, UK and EU: platform fees ~&euro;4.6B + management fee ~&euro;0.9B &rarr; ~&euro;3.5B</p>
              </div>
              <div className="v09B__call v09B__call--sam">
                <span className="srLabel">SAM</span>
                <p>a year, 2026 &rarr; 2028: <b>~28K independent EU companies</b> in sectors that fit.</p>
                <p className="v09B__note">With the UK included, the SAM is ~32K companies and ~&euro;1.4B &rarr; ~&euro;2.0B.</p>
              </div>
              <div className="v09B__call v09B__call--som">
                <span className="srLabel">SOM</span>
                <p>
                  <b>300 companies in 3 years</b>, 150 direct and 150 through implementation
                  partners, ~1% of SAM. We start in the Nordics, Baltics, Benelux and Ireland.
                </p>
              </div>
            </div>
          </div>

          <div className="v09B__split">
            <div className="v09B__bars">
              <span className="srLabel"><MapPin size={14} />SAM by region, 2028 <em className="v09B__startKey"><i />where we start</em></span>
              {REGIONS.map((r) => (
                <div className={`v09B__bar${r.start ? " v09B__bar--start" : ""}`} key={r.name}>
                  <span className="v09B__barName">{r.name}</span>
                  <span className="v09B__barTrack"><i style={{ width: `${(r.value / 530) * 100}%` }} /></span>
                  <b>&euro;{r.value}M</b>
                </div>
              ))}
            </div>
            <div className="v09B__bars v09B__bars--sector">
              <span className="srLabel"><Factory size={14} />SAM by sector, companies</span>
              {SECTORS.map((r) => (
                <div className="v09B__bar" key={r.name}>
                  <span className="v09B__barName">{r.name}</span>
                  <span className="v09B__barTrack"><i style={{ width: `${(r.value / 10.2) * 100}%` }} /></span>
                  <b>{r.value.toFixed(1)}K</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="v09B__who">
          <div className="v09B__icp">
            <span className="srLabel"><Target size={15} />ideal customer</span>
            <p>{ICP_EU}</p>
          </div>
          <div className="v09B__buyer">
            <span className="v09B__buyerIcon"><Briefcase size={20} /></span>
            <div>
              <span className="srLabel">buyer</span>
              <p>{BUYER}</p>
            </div>
          </div>
          <div className="v09B__scale">
            <span className="srLabel"><Users size={15} />scale of need</span>
            <p>
              <b className="v09B__num">~28K companies</b> employing{" "}
              <b className="v09B__num">~7M people</b>. Business-agent token spend{" "}
              <b className="v09B__num v09B__num--green">~&euro;1.8B</b> in 2026,{" "}
              <b className="v09B__num v09B__num--green">~&euro;7.5B</b> by 2028.
            </p>
          </div>
        </div>
        <p className="srSource v09__source">
          Eurostat 2022&ndash;2025 (company counts, AI use, group ownership), UK BPE 2025, US Census
          2022, Ramp 2026, Gartner 2026 &middot; base case &middot; &euro;1.19 per pound, $1.12 per
          euro. SAM excludes foreign-owned subsidiaries, half of domestic-group members, IT,
          finance, staffing and hospitality. Not to scale.
        </p>
      </div>
    )
  },

  /* ---------------- variant C: the funnel ---------------- */
  {
    kicker: "09 / market · variant C",
    title: TITLE,
    accentPhrases: ACCENTS,
    className: "slide--longTitle",
    content: (
      <div className="v09C">
        <div className="v09C__funnel">
          <div className="v09C__band v09C__band--need">
            <span className="srLabel"><Users size={15} />scale of need</span>
            <p>
              <b>~128K companies</b> employing <b>~33M people</b>. Business-agent token spend{" "}
              <b>~$9.6B</b> in 2026, <b>~$39B</b> by 2028.
            </p>
          </div>
          <div className="v09C__band v09C__band--tam">
            <span className="v09C__tag">TAM</span>
            <b className="v09C__tamBig">{TAM_BIG}</b>
            <span className="v09C__tamDetail">{TAM_DETAIL}</span>
          </div>
          <div className="v09C__band v09C__band--sam">
            <span className="v09C__tag">SAM</span>
            <Need>bottom-up, by sector and region</Need>
          </div>
          <div className="v09C__band v09C__band--som">
            <span className="v09C__tag">SOM</span>
            <Need>reachable in 3 years</Need>
          </div>
        </div>

        <div className="v09C__arrow" aria-hidden="true">
          <svg viewBox="0 0 80 40" preserveAspectRatio="none">
            <path d="M2 20 H66" stroke="#5B3CE0" strokeWidth="3" strokeDasharray="7 5" fill="none" />
            <path d="M62 10 L78 20 L62 30 Z" fill="#5B3CE0" />
          </svg>
        </div>

        <div className="v09C__dest">
          <div className="v09C__bull" aria-hidden="true">
            <i /><i /><i /><Target size={26} />
          </div>
          <div className="v09C__icp">
            <span className="srLabel">ideal customer</span>
            <p>{ICP}</p>
          </div>
          <div className="v09C__buyer">
            <span className="srLabel"><Briefcase size={15} />buyer</span>
            <p>{BUYER}</p>
          </div>
        </div>
        {SOURCE}
      </div>
    )
  }
];

export default variants;
