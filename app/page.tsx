import { decks } from "./site-data";
import { BulletList, GuideCard, Pill, SectionGrid, SiteFrame } from "./site-shell";

export default function Home() {
  return (
      <SiteFrame
        active="decks"
      eyebrow=""
        title="Clash Royale guide hub"
      intro=""
      highlights={[]}
      footerNote="Research used to shape these decks: Supercell's August 2026 balance changes, DeckShop's current New Meta page, RoyaleAPI card and deck stats, and recent July/August 2026 YouTube deck guides."
    >
      <SectionGrid>
        {decks.map((deck) => (
          <GuideCard
            key={deck.name}
            title={deck.name}
            kicker={deck.style}
            metric={`Avg elixir ${deck.averageElixir}`}
          >
            <div className="chip-row">
              {deck.cards.map((card) => (
                <Pill key={card}>{card}</Pill>
              ))}
            </div>
            <div className="detail-grid">
              <div>
                <p className="mini-heading">How it wins</p>
                <p className="card-copy">{deck.summary}</p>
              </div>
              <div className="detail-stack">
                <div>
                  <p className="mini-heading">Best into</p>
                  <p className="card-copy">{deck.bestInto}</p>
                </div>
                <div>
                  <p className="mini-heading">Cons</p>
                  <BulletList items={deck.cons} />
                </div>
              </div>
            </div>
          </GuideCard>
        ))}
      </SectionGrid>
    </SiteFrame>
  );
}
