import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { TacticalLoadout } from "@/components/site/tactical-loadout";
import { componentRegistry } from "@/lib/component-registry";

const systemChecks = [
  { value: String(componentRegistry.length).padStart(2, "0"), label: "React primitives" },
  { value: "100%", label: "TypeScript source" },
  { value: "A11Y", label: "Keyboard first" },
];

const protocols = [
  {
    code: "SYS-01",
    title: "Readable under pressure",
    description: "Hierarchy stays obvious at a glance. Strong structure does the work before decoration arrives.",
  },
  {
    code: "SYS-02",
    title: "Behavior is standard issue",
    description: "Focus, keyboard control, and state management ship with the primitive, not as an afterthought.",
  },
  {
    code: "SYS-03",
    title: "Source stays in your hands",
    description: "Typed React code is built to be copied, inspected, changed, and deployed without a black box.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 7l5 5-5 5" />
    </svg>
  );
}

function CrosshairIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="6" />
      <path d="M16 2v7M16 23v7M2 16h7M23 16h7" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="tactical-page">
      <a href="#main-content" className="tactical-skip-link">
        Skip to mission brief
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="tactical-hero" aria-labelledby="hero-title">
          <Image
            src="/home/tactical-operator.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="tactical-hero-image"
          />
          <div className="tactical-hero-wash" />
          <div className="tactical-grid" />

          <div className="tactical-hero-shell">
            <nav className="tactical-mission-nav" aria-label="Page sections">
              <span className="tactical-rail-label">Mission index</span>
              <a href="#main-content" className="is-active" aria-current="page">
                <span>01</span>
                Overview
              </a>
              <a href="#loadout">
                <span>02</span>
                Loadout
              </a>
              <a href="#protocol">
                <span>03</span>
                Protocol
              </a>
            </nav>

            <div className="tactical-hero-copy">
              <div className="tactical-eyebrow">
                <span className="tactical-status-dot" />
                Concrete UI / React armory
              </div>
              <h1 id="hero-title" className="tactical-display tactical-hero-title">
                Build.<br />
                Ship. <span>Command.</span>
              </h1>
              <p className="tactical-hero-summary">
                A modern neo-brutalist component system built for decisive interfaces:
                hard structure, accessible behavior, and source code you control.
              </p>
              <div className="tactical-actions">
                <Link href="/docs/installation" className="tactical-button tactical-button-primary">
                  Initialize system
                  <ArrowIcon />
                </Link>
                <Link href="/docs/components" className="tactical-button tactical-button-ghost">
                  Inspect components
                </Link>
              </div>
            </div>

            <aside className="tactical-intel" aria-label="System status">
              <div className="tactical-intel-heading">
                <CrosshairIcon />
                <div>
                  <span>System status</span>
                  <strong>Operational</strong>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Runtime</dt>
                  <dd>React 19</dd>
                </div>
                <div>
                  <dt>Framework</dt>
                  <dd>Next 16</dd>
                </div>
                <div>
                  <dt>Protocol</dt>
                  <dd>TypeScript</dd>
                </div>
              </dl>
              <span className="tactical-coordinates">01°17&apos;S / 36°49&apos;E</span>
            </aside>
          </div>

          <div className="tactical-hero-footer" aria-label="Library summary">
            <span>CONCRETE / UI</span>
            <span className="tactical-hero-line" />
            <span>BUILD 2026.07</span>
            <span>STATUS: STABLE</span>
          </div>
        </section>

        <section id="loadout" className="tactical-section tactical-loadout-section" aria-labelledby="loadout-title">
          <div className="tactical-section-shell">
            <header className="tactical-section-heading">
              <div>
                <p className="tactical-kicker">02 / Component loadout</p>
                <h2 id="loadout-title" className="tactical-display">
                  Select only what<br />the mission needs.
                </h2>
              </div>
              <p>
                No decorative inventory. Start with a focused set of primitives,
                verify their behavior, then expand as the product demands.
              </p>
            </header>

            <TacticalLoadout />
          </div>
        </section>

        <section id="protocol" className="tactical-protocol" aria-labelledby="protocol-title">
          <div className="tactical-section-shell">
            <div className="tactical-protocol-header">
              <p className="tactical-kicker">03 / Operating protocol</p>
              <h2 id="protocol-title" className="tactical-display">
                Clarity is the<br />combat advantage.
              </h2>
            </div>

            <div className="tactical-protocol-list">
              {protocols.map((protocol) => (
                <article key={protocol.code}>
                  <span>{protocol.code}</span>
                  <div>
                    <h3>{protocol.title}</h3>
                    <p>{protocol.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="tactical-system-checks" aria-label="System checks">
              {systemChecks.map((item) => (
                <div key={item.label}>
                  <strong className="tactical-display">{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tactical-deploy" aria-labelledby="deploy-title">
          <div className="tactical-deploy-grid" />
          <div className="tactical-deploy-mark" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="tactical-deploy-content">
            <p className="tactical-kicker">Deployment window open</p>
            <h2 id="deploy-title" className="tactical-display">Your interface. Your rules.</h2>
            <p>Install the foundation, copy the source, and adapt every token to the product in front of you.</p>
            <div className="tactical-actions">
              <Link href="/docs/installation" className="tactical-button tactical-button-dark">
                Read installation
                <ArrowIcon />
              </Link>
              <Link href="/docs/templates" className="tactical-text-link">
                View field templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="tactical-footer">
        <div>
          <Link href="/" className="tactical-footer-brand">CONCRETE / UI</Link>
          <p>Modern neo-brutalist React primitives. Built to be owned.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/docs">Docs</Link>
          <Link href="/docs/components">Components</Link>
          <Link href="/docs/templates">Templates</Link>
          <a href="https://github.com/jchiwaii/concrete-ui" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <span className="tactical-footer-code">CU / 2026</span>
      </footer>
    </div>
  );
}
