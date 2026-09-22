import type { Metadata } from "next";
import { SiteFrame } from "../site-shell";
import { ProgressTracker } from "./progress-tracker";

export const metadata: Metadata = {
  title: "Trophy History",
  description: "Create, upload, download, and graph a personal Clash Royale trophy history CSV.",
};

export default function ProgressPage() {
  return (
    <SiteFrame
      active="progress"
      eyebrow=""
      title="Progress"
      intro=""
      highlights={[]}
      footerNote="This page works from a local CSV file. Download your history to keep a copy, then upload that file whenever you want to view it again."
      showHero={false}
      showSources={false}
    >
      <ProgressTracker />
    </SiteFrame>
  );
}
