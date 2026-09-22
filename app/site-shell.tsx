import Link from "next/link";
import type { ReactNode } from "react";
import { navigation, researchSources, type NavKey } from "./site-data";

type SiteFrameProps = {
  active: NavKey;
  eyebrow: string;
  title: string;
  intro: string;
  highlights: string[];
  footerNote: string;
  showSources?: boolean;
  showHero?: boolean;
  children: ReactNode;
};

type GuideCardProps = {
  title?: string;
  kicker?: string;
  metric?: string;
  children: ReactNode;
};

export function SiteFrame({
  active,
  eyebrow,
  title,
  intro,
  highlights,
  footerNote,
  showSources = true,
  showHero = true,
  children,
}: SiteFrameProps) {
  return (
    <div className="page-shell">
      <header className="site-topbar">
        <div className="site-topbar-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              CR
            </span>
            <span>
              <span className="brand-title">Clash Royale Guide Hub</span>
              <span className="brand-subtitle">Decks, strategies, and synergies</span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.key}
                className="nav-link"
                href={item.href}
                aria-current={item.key === active ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        {showHero ? (
          <section className="hero">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="hero-title">{title}</h1>
            {intro ? <p className="hero-copy">{intro}</p> : null}
            {highlights.length ? (
              <div className="hero-pills">
                {highlights.map((highlight) => (
                  <span key={highlight} className="hero-pill">
                    {highlight}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="content-stack">{children}</div>

        <footer className="site-footer">
          <p className="footer-note">{footerNote}</p>
          {showSources ? (
            <div className="source-row" aria-label="Research sources">
              {researchSources.map((source) => (
                <a
                  key={source.label}
                  className="source-link"
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="source-tag">{source.kind}</span>
                  <span>{source.label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </footer>
      </main>
    </div>
  );
}

export function SectionGrid({ children }: { children: ReactNode }) {
  return <section className="card-grid">{children}</section>;
}

export function GuideCard({ title, kicker, metric, children }: GuideCardProps) {
  const hasHeading = Boolean(kicker || title);

  return (
    <article className="guide-card">
      <div className="guide-card-top">
        {hasHeading ? (
          <div className="guide-card-title-group">
            {kicker ? <p className="guide-card-kicker">{kicker}</p> : null}
            {title ? <h2 className="guide-card-title">{title}</h2> : null}
          </div>
        ) : null}
        {metric ? <span className="metric">{metric}</span> : null}
      </div>
      {children}
    </article>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
