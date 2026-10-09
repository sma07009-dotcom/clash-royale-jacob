import type { Metadata } from "next";
import { SiteFrame } from "../site-shell";
import { CoachingTrainer } from "./coaching-trainer";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Prototype Clash Royale coaching page that accepts a gameplay clip and opens a feedback page with randomized practice pointers.",
};

export default function CoachingPage() {
  return (
    <SiteFrame
      active="coaching"
      eyebrow=""
      title="Coaching"
      intro=""
      highlights={[]}
      footerNote="Coaching is a local prototype. It does not upload or analyze real files; it opens a sample replay with three general pointers selected from a list of twenty."
      showHero={false}
      showSources={false}
    >
      <CoachingTrainer />
    </SiteFrame>
  );
}
