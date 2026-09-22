import { strategies } from "../site-data";
import { BulletList, GuideCard, Pill, SectionGrid, SiteFrame } from "../site-shell";

export default function StrategiesPage() {
  return (
    <SiteFrame
      active="strategies"
      eyebrow=""
      title="Strategies"
      intro=""
      highlights={["6 strategies", "Good cards", "Video guide"]}
      footerNote="The strategy notes are based on the linked YouTube guide about Clash Royale deck archetypes."
    >
      <section className="panel video-panel">
        <div className="panel-head">
          <p className="panel-kicker">video to understand strategies better</p>
          <a
            className="video-link"
            href="https://www.youtube.com/watch?v=j4emvnDUfoQ"
            target="_blank"
            rel="noreferrer"
          >
            Watch the strategy archetype video
          </a>
        </div>
      </section>

      <SectionGrid>
        {strategies.map((strategy) => (
          <GuideCard
            key={strategy.name}
            title={strategy.name}
          >
            <div>
              <p className="mini-heading">Good cards</p>
              <div className="chip-row">
                {strategy.cards.map((card) => (
                  <Pill key={card}>{card}</Pill>
                ))}
              </div>
            </div>
            <p className="card-copy">{strategy.summary}</p>
            <div className="detail-grid">
              <div>
                <p className="mini-heading">How to play</p>
                <p className="card-copy">{strategy.howToPlay}</p>
              </div>
              <div className="detail-stack">
                <div>
                  <p className="mini-heading">Pros</p>
                  <BulletList items={strategy.pros} />
                </div>
                <div>
                  <p className="mini-heading">Cons</p>
                  <BulletList items={strategy.cons} />
                </div>
              </div>
            </div>
          </GuideCard>
        ))}
      </SectionGrid>
    </SiteFrame>
  );
}
