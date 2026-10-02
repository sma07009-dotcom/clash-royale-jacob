import { LessonRoad } from "./progression";
import { SiteFrame } from "./site-shell";

export default function Home() {
  return (
    <SiteFrame active="learn" skipGate eyebrow="Clash Royale fundamentals" title="Build your game sense, one play at a time." intro="Turn tricky in-game moments into simple habits with short, playable scenarios. Complete the road to unlock your guidebook." highlights={["10 mini lessons", "Play to learn", "Unlock as you go"]} footerNote="Your lesson progress is saved in this browser. More scenarios are coming soon." showSources={false}><LessonRoad /></SiteFrame>
  );
}
