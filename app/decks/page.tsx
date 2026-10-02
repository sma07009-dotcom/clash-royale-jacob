import { decks } from "../site-data";
import { GuideCard, Pill, SectionGrid, SiteFrame } from "../site-shell";

export default function DecksPage() {
  return (
    <SiteFrame
      active="decks"
      eyebrow=""
      title="Decks"
      intro=""
      highlights={["4 deck guides", "Current cards", "Simple game plans"]}
      footerNote="These deck guides are starting points. Adjust them as your card levels and matchups change."
    >
      <SectionGrid>
        {decks.map((deck) => (
          <GuideCard key={deck.name} title={deck.name} kicker={deck.style} metric={`${deck.averageElixir} elixir`}>
            <div>
              <p className="mini-heading">Cards</p>
              <div className="chip-row">
                {deck.cards.map((card) => <Pill key={card}>{card}</Pill>)}
              </div>
            </div>
            <p className="card-copy">{deck.summary}</p>
            <div className="detail-grid">
              <div>
                <p className="mini-heading">Best into</p>
                <p className="card-copy">{deck.bestInto}</p>
              </div>
              <div>
                <p className="mini-heading">Watch out for</p>
                <ul className="bullet-list">{deck.cons.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </GuideCard>
        ))}
      </SectionGrid>
    </SiteFrame>
  );
}
