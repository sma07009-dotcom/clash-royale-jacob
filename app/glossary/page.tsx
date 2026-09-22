import { glossary } from "../site-data";
import { GuideCard, SectionGrid, SiteFrame } from "../site-shell";

export default function GlossaryPage() {
  return (
    <SiteFrame
      active="glossary"
      eyebrow=""
      title="Glossary"
      intro=""
      highlights={["New-player terms", "Simple examples", "Game language"]}
      footerNote="Use this page when a guide or deck description uses a word that is not clear yet."
      showSources={false}
    >
      <SectionGrid>
        {glossary.map((item) => (
          <GuideCard
            key={item.term}
            title={item.term}
          >
            <p className="card-copy">{item.meaning}</p>
            <div>
              <p className="mini-heading">Example</p>
              <p className="card-copy">{item.example}</p>
            </div>
          </GuideCard>
        ))}
      </SectionGrid>
    </SiteFrame>
  );
}
