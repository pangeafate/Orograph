import type { ReactNode } from "react";
import { Boxes, Cpu, Handshake } from "lucide-react";
import type { DeckSlide } from "../speedrunSlides";
import "./v05-sauce.css";

const TITLE =
  "Our secret sauce is the unique combination of the Tech Platform, Business Consulting and Extreme Modularity by design.";
const ACCENT = ["Tech Platform, Business Consulting and Extreme Modularity"];

/* shared copy (verbatim from the original slide) */
const T_ADD = (
  <>
    <b>Agents-as-data</b> &mdash; everything is a line in the database
  </>
);
const T_SUBS = [
  "Native database tools like RLS, unavailable to traditional agentic SDKs and frameworks",
  "Native access control and airtight multi-tenant data separation",
  "Infinite scalability"
];
const T_ATOMIC = (
  <>
    <b>Atomic agents</b> &mdash; capable of running on weak or on-premise models
  </>
);
const T_HARNESS = (
  <>
    <b>Proprietary harness</b> that runs any tool-calling LLM as an agent
  </>
);
const C_FIRST = (
  <>
    We understand the Client&rsquo;s situation and quickly deliver the{" "}
    <b>first meaningful solution without code</b> (just configuration + instructions) &mdash;{" "}
    <b>time to value 1 week</b>, when the Client sees meaningful results.
  </>
);
const C_TEACH = (
  <>
    We <b>teach the Client&rsquo;s people</b> to handle AI agents as we introduce them.
  </>
);
const C_MANAGE = (
  <>
    We <b>manage the Client&rsquo;s agentic fleet</b> in whatever split (Client vs us) is most
    comfortable and beneficial for the Client.
  </>
);
const M_ABSTRACT = (
  <>
    <b>Runtime, memory, skills, code</b> &mdash; everything is a separate, simple abstraction. Even
    prompt fragments are catalogued and loaded into an agent when it is called.
  </>
);
const M_FEW = (
  <>
    So at Orograph we manage <b>a couple of hundred skills and prompt fragments</b> &mdash; not
    hundreds of thousands of our Clients&rsquo; agents.
  </>
);

/* ---------- B: three overlapping circles (Venn) ---------- */
const variantB: DeckSlide = {
  kicker: "05 / secret sauce · variant B",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v05B">
      <section className="v05B__panel v05B__panel--tech">
        <div className="v05B__head">
          <span className="v05B__icon"><Cpu size={20} /></span>
          <h3>Tech Platform</h3>
        </div>
        <ul className="v05B__list">
          <li>
            {T_ADD}
            <ul>
              {T_SUBS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </li>
          <li>{T_ATOMIC}</li>
          <li>{T_HARNESS}</li>
        </ul>
      </section>

      <div className="v05B__venn">
        <svg viewBox="0 0 400 330" aria-hidden="true">
          <circle className="v05B__c v05B__c--tech" cx="140" cy="118" r="102" />
          <circle className="v05B__c v05B__c--consult" cx="260" cy="118" r="102" />
          <circle className="v05B__c v05B__c--mod" cx="200" cy="220" r="102" />
          <text className="v05B__t v05B__t--tech" x="100" y="96" textAnchor="middle">Tech</text>
          <text className="v05B__t v05B__t--tech" x="100" y="118" textAnchor="middle">Platform</text>
          <text className="v05B__t v05B__t--consult" x="300" y="96" textAnchor="middle">Business</text>
          <text className="v05B__t v05B__t--consult" x="300" y="118" textAnchor="middle">Consulting</text>
          <text className="v05B__t v05B__t--mod" x="200" y="272" textAnchor="middle">Extreme</text>
          <text className="v05B__t v05B__t--mod" x="200" y="294" textAnchor="middle">Modularity</text>
        </svg>
        <span className="v05B__core" role="img" aria-label="secret sauce: mortar and pestle">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="v05Gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7DC8A" />
                <stop offset="45%" stopColor="#D9A93A" />
                <stop offset="100%" stopColor="#9C6B12" />
              </linearGradient>
            </defs>
            {/* pestle */}
            <path d="M47 50 L76 19" stroke="url(#v05Gold)" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="80" cy="15" rx="9" ry="7" transform="rotate(-47 80 15)" fill="url(#v05Gold)" />
            {/* leaves */}
            <path d="M38 47 C 30 36, 34 26, 44 22 C 47 32, 45 40, 38 47 Z" fill="var(--green)" />
            <path d="M44 47 C 46 34, 54 28, 63 29 C 60 39, 53 45, 44 47 Z" fill="var(--green)" opacity="0.85" />
            <path d="M33 48 C 24 44, 18 38, 18 31 C 27 31, 33 38, 33 48 Z" fill="var(--green)" opacity="0.7" />
            {/* bowl */}
            <ellipse cx="50" cy="50" rx="40" ry="8" fill="#FFF8E6" stroke="url(#v05Gold)" strokeWidth="4" />
            <path d="M11 52 C 13 75, 29 86, 50 86 C 71 86, 87 75, 89 52 C 76 59, 24 59, 11 52 Z" fill="url(#v05Gold)" />
            <path d="M24 66 C 34 70, 46 71, 58 70 M62 74 C 70 73, 76 70, 80 66" stroke="#FFF3CF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
            <rect x="33" y="85" width="34" height="8" rx="3" fill="url(#v05Gold)" />
          </svg>
        </span>
      </div>

      <section className="v05B__panel v05B__panel--consult">
        <div className="v05B__head">
          <span className="v05B__icon"><Handshake size={20} /></span>
          <h3>Business Consulting</h3>
        </div>
        <ul className="v05B__list">
          <li>{C_FIRST}</li>
          <li>{C_TEACH}</li>
          <li>{C_MANAGE}</li>
        </ul>
      </section>

      <section className="v05B__panel v05B__panel--mod">
        <div className="v05B__head">
          <span className="v05B__icon"><Boxes size={20} /></span>
          <h3>Extreme Modularity</h3>
        </div>
        <ul className="v05B__list v05B__list--row">
          <li>{M_ABSTRACT}</li>
          <li>{M_FEW}</li>
        </ul>
      </section>
    </div>
  )
};

/* ---------- C: a periodic table of the sauce ---------- */
type El = { n: number; sym: string; body: ReactNode; wide?: boolean; small?: boolean };

const Element = ({ el }: { el: El }) => (
  <div className={`v05C__el${el.wide ? " is-wide" : ""}${el.small ? " is-small" : ""}`}>
    <div className="v05C__sym">
      <span className="v05C__n">{el.n}</span>
      <strong>{el.sym}</strong>
    </div>
    <p>{el.body}</p>
  </div>
);

const Group = ({
  mod,
  label,
  name,
  icon,
  children
}: {
  mod: string;
  label: string;
  name: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <section className={`v05C__group v05C__group--${mod}`}>
    <div className="v05C__ghead">
      <span className="v05C__gicon">{icon}</span>
      <div>
        <span className="v05C__glabel">{label}</span>
        <h3>{name}</h3>
      </div>
    </div>
    <div className="v05C__cells">{children}</div>
  </section>
);

const variantC: DeckSlide = {
  kicker: "05 / secret sauce · variant C",
  className: "slide--longTitle",
  title: TITLE,
  accentPhrases: ACCENT,
  content: (
    <div className="v05C">
      <Group mod="tech" label="group I" name="Tech Platform" icon={<Cpu size={20} />}>
        <Element el={{ n: 1, sym: "Ad", body: T_ADD, wide: true }} />
        <div className="v05C__subs">
          {T_SUBS.map((s, i) => (
            <Element key={s} el={{ n: 2 + i, sym: ["Db", "Ac", "Sc"][i], body: s, small: true }} />
          ))}
        </div>
        <div className="v05C__pair">
          <Element el={{ n: 5, sym: "At", body: T_ATOMIC }} />
          <Element el={{ n: 6, sym: "Hr", body: T_HARNESS }} />
        </div>
      </Group>
      <span className="v05C__plus" aria-hidden="true">+</span>
      <Group mod="consult" label="group II" name="Business Consulting" icon={<Handshake size={20} />}>
        <Element el={{ n: 7, sym: "Tv", body: C_FIRST }} />
        <Element el={{ n: 8, sym: "Te", body: C_TEACH }} />
        <Element el={{ n: 9, sym: "Fl", body: C_MANAGE }} />
      </Group>
      <span className="v05C__plus" aria-hidden="true">+</span>
      <Group mod="mod" label="group III" name="Extreme Modularity" icon={<Boxes size={20} />}>
        <Element el={{ n: 10, sym: "Ab", body: M_ABSTRACT }} />
        <Element el={{ n: 11, sym: "Pf", body: M_FEW }} />
      </Group>
    </div>
  )
};

const variants: DeckSlide[] = [variantB, variantC];

export default variants;
