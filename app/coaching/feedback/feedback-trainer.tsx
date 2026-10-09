"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pickPointers, STRATEGIES, type Strategy } from "../coaching-data";

const SAMPLE_CLIP_URL =
  "https://www.youtube.com/embed/p_TloWASvgo?start=75&end=105&rel=0&modestbranding=1&playsinline=1&enablejsapi=1";

function isStrategy(value: string | null): value is Strategy {
  return Boolean(value && STRATEGIES.some((option) => option.name === value));
}

export function FeedbackTrainer() {
  const searchParams = useSearchParams();
  const strategyParam = searchParams.get("strategy");
  const strategy: Strategy = isStrategy(strategyParam) ? strategyParam : "Cycle";
  const fileName = searchParams.get("file") || "Gameplay clip";
  const [pointers, setPointers] = useState<string[]>([]);
  const [clipVersion, setClipVersion] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPointers(pickPointers()));
    return () => window.cancelAnimationFrame(frame);
  }, [searchParams]);

  return (
    <section className="coaching-trainer" aria-labelledby="feedback-heading">
      <div className="coaching-view coaching-result">
        <div className="coaching-result-header">
          <div>
            <p className="coaching-pointer-kicker">Practice result</p>
            <h1 className="coaching-title" id="feedback-heading">
              Your coaching feedback
            </h1>
          </div>
          <div className="coaching-result-badges" aria-label="Analysis details">
            <span>{strategy} deck</span>
            <span>3 random pointers</span>
          </div>
        </div>

        <p className="coaching-feedback-file">Clip selected: {fileName}</p>

        <div className="coaching-result-grid">
          <section className="coaching-gameplay" aria-labelledby="gameplay-heading">
            <h2 className="coaching-section-title" id="gameplay-heading">
              Sample gameplay
            </h2>
            <div className="coaching-video-frame">
              <iframe
                key={clipVersion}
                title="Sample Clash Royale gameplay clip"
                src={`${SAMPLE_CLIP_URL}&clip=${clipVersion}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="coaching-actions">
              <button
                className="coaching-secondary-button"
                type="button"
                onClick={() => setClipVersion((current) => current + 1)}
              >
                Replay clip
              </button>
              <Link className="coaching-secondary-button" href="/coaching/">
                Analyze another
              </Link>
            </div>
          </section>

          <section className="coaching-pointer-panel" aria-labelledby="pointers-heading">
            <p className="coaching-pointer-kicker">General coaching list</p>
            <h2 className="coaching-section-title" id="pointers-heading">
              Three things to try
            </h2>
            <ol className="coaching-pointer-list">
              {pointers.map((pointer) => (
                <li key={pointer}>{pointer}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
