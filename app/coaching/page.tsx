import type { Metadata } from "next";
import { SiteFrame } from "../site-shell";
import { CoachingTrainer } from "./coaching-trainer";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Prototype Clash Royale coaching page that accepts a gameplay upload click and shows a sample replay with randomized feedback.",
};

export default function CoachingPage() {
  return (
    <SiteFrame
      active="coaching"
      eyebrow=""
      title="Coaching"
      intro=""
      highlights={[]}
      footerNote="Coaching is a local prototype. It does not upload or analyze real files yet; clicking upload shows a sample replay and made-up coaching feedback."
      showHero={false}
      showSources={false}
    >
      <CoachingTrainer />
    </SiteFrame>
  );
}
