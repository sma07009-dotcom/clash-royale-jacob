import { synergies } from "../site-data";
import { BulletList, GuideCard, Pill, SectionGrid, SiteFrame } from "../site-shell";

export default function SynergiesPage() {
  return (
    <SiteFrame
      active="synergies"
      eyebrow=""
      title="Synergies"
      intro=""
      highlights={["5 synergies", "2-4 cards each", "Use cases"]}
      footerNote="The synergy examples are grounded in current RoyaleAPI related-card data, DeckShop deck lists, and recent YouTube meta guides from mid 2026."
    >
      <div className="synergy-list">
        <SectionGrid>
          {synergies.map((synergy) => (
            <GuideCard
              key={synergy.cards.join("-")}
              metric={`${synergy.cards.length} cards`}
            >
              <div className="chip-row">
                {synergy.cards.map((card) => (
                  <Pill key={card}>{card}</Pill>
                ))}
              </div>
              <p className="card-copy">{synergy.summary}</p>
              <div className="detail-grid">
                <div>
                  <p className="mini-heading">Best use cases</p>
                  <p className="card-copy">{synergy.bestUseCases}</p>
                </div>
                <div className="detail-stack">
                  <div>
                    <p className="mini-heading">Pros</p>
                    <BulletList items={synergy.pros} />
                  </div>
                  <div>
                    <p className="mini-heading">Cons</p>
                    <BulletList items={synergy.cons} />
                  </div>
                </div>
              </div>
            </GuideCard>
          ))}
        </SectionGrid>
      </div>
    </SiteFrame>
  );
}
