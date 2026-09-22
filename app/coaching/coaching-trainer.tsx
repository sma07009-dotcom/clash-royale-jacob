"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "setup" | "analyzing" | "result";
type Strategy = "Cycle" | "Bait" | "Beat Down" | "Bridge Spam" | "Control" | "Siege";

const SAMPLE_CLIP_URL =
  "https://www.youtube.com/embed/p_TloWASvgo?start=75&end=105&rel=0&modestbranding=1&playsinline=1&enablejsapi=1";

const STRATEGIES: { name: Strategy; note: string }[] = [
  { name: "Cycle", note: "fast pressure" },
  { name: "Bait", note: "force spells" },
  { name: "Beat Down", note: "big pushes" },
  { name: "Bridge Spam", note: "instant punish" },
  { name: "Control", note: "defend first" },
  { name: "Siege", note: "protect setup" },
];

const POINTER_POOL = [
  "You are leaking elixir too much. When both players are close to full elixir, the opponent plays first and you wait a few seconds, which can put you about 3-4 elixir behind.",
  "You overcommit on offense. The first push is already dying, then you add more cards, so the defender gets extra value from the same troops.",
  "Your win condition goes in while the opponent still has their main counter ready. Try baiting that counter first, then attack when it is out of cycle.",
  "You defend in the same lane every time. When the opponent builds a big push, pressure the opposite lane so they cannot spend everything on offense.",
  "Your small spell is used too early. Hold Log, Zap, or Arrows until you know whether they are saving swarms for your win condition.",
  "You are stacking support troops too close together. Spread them out so one Fireball, Poison, or splash card cannot hit everything.",
  "Your cycle cards are being played with no purpose. Cheap cards should either defend, chip, pull troops, or help you get back to a key card.",
  "You ignore card rotation after defending. Count how many cards the opponent plays after their building or spell, then attack before that answer returns.",
  "Your tank is placed too early in single elixir. Wait until you have enough elixir to support it or until the opponent commits first.",
  "You miss chances to counterpush. A surviving defender should often become the front of your next attack instead of letting it walk alone.",
  "You play reactive cards proactively. Cards like Skeleton Army, Inferno Tower, or swarm counters are stronger when saved for the threat they answer.",
  "Your bridge pressure is predictable. Mix same-lane and opposite-lane attacks so the opponent cannot pre-place the perfect defense.",
  "You let the opponent activate King Tower too easily. Be careful with Tornado-able win conditions and splash placements near the center.",
  "You spend down to zero elixir without knowing their hand. Keep a little elixir available unless you are sure their punish cards are out of cycle.",
  "Your defensive building is too high. Pull win conditions toward the center so both towers can help and their support troops split up.",
  "You are late with damage spells. If the opponent keeps giving Fireball or Poison value, take it before the support troops cross the bridge.",
  "You use the same first play every match. Rotate between safe cycle cards, waiting, or a light pressure card so opponents cannot read you instantly.",
  "You stop pressuring in double elixir. Faster decks should keep forcing responses so the opponent cannot build one huge push for free.",
  "Your bait cards are not layered well. Force the small spell with Princess, Goblin Gang, or Skeleton Barrel before sending the bigger barrel push.",
  "You defend the tower instead of the matchup. Sometimes taking small damage is fine if it saves the exact card you need for their next real push.",
];

function pickPointers() {
  const pointers = POINTER_POOL.slice();

  for (let index = pointers.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = pointers[index];
    pointers[index] = pointers[swapIndex];
    pointers[swapIndex] = temp;
  }

  return pointers.slice(0, 3 + Math.floor(Math.random() * 2));
}

export function CoachingTrainer() {
  const [stage, setStage] = useState<Stage>("setup");
  const [strategy, setStrategy] = useState<Strategy>("Cycle");
  const [pointers, setPointers] = useState<string[]>([]);
  const [clipVersion, setClipVersion] = useState(0);
  const uploadRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (stage !== "analyzing") {
      return;
    }

    const timer = window.setTimeout(() => {
      setPointers(pickPointers());
      setClipVersion((current) => current + 1);
      setStage("result");
    }, 900 + Math.floor(Math.random() * 450));

    return () => window.clearTimeout(timer);
  }, [stage]);

  function startAnalysis() {
    setStage("analyzing");
  }

  function resetCoaching() {
    setStage("setup");
    setPointers([]);
    window.setTimeout(() => uploadRef.current?.focus(), 0);
  }

  return (
    <section className="coaching-trainer" aria-labelledby="coaching-heading">
      {stage === "setup" ? (
        <div className="coaching-view coaching-setup">
          <div className="coaching-title-row">
            <h1 className="coaching-title" id="coaching-heading">
              Coaching
            </h1>
            <span className="coaching-mode-pill">Prototype coach</span>
          </div>

          <div className="coaching-setup-grid">
            <section className="coaching-upload-panel" aria-labelledby="upload-heading">
              <h2 className="coaching-section-title" id="upload-heading">
                Upload file
              </h2>
              <button
                className="coaching-upload-card"
                ref={uploadRef}
                type="button"
                aria-describedby="upload-note"
                onClick={startAnalysis}
              >
                <span className="coaching-upload-icon" aria-hidden="true">
                  <svg viewBox="0 0 140 120" role="img">
                    <path d="M38 86h-5c-13 0-24-10-24-23 0-12 9-22 21-23 5-18 21-31 41-31 22 0 40 17 42 39h3c13 0 23 10 23 23s-10 23-23 23H94"></path>
                    <path d="M70 108V52"></path>
                    <path d="M48 74 70 52l22 22"></path>
                  </svg>
                </span>
                <span className="coaching-upload-text">Choose clip</span>
              </button>
              <p className="coaching-helper" id="upload-note">
                Click to upload a 10s-30s gameplay clip. This prototype accepts the click and uses a sample replay.
              </p>
            </section>

            <section className="coaching-strategy-panel" aria-labelledby="strategy-heading">
              <h2 className="coaching-section-title" id="strategy-heading">
                Deck strat
              </h2>
              <div className="coaching-strategy-grid" role="radiogroup" aria-label="Deck strategy">
                {STRATEGIES.map((option) => (
                  <button
                    key={option.name}
                    className="coaching-strategy-option"
                    type="button"
                    aria-pressed={option.name === strategy}
                    onClick={() => setStrategy(option.name)}
                  >
                    <strong>{option.name}</strong>
                    <span>{option.note}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="coaching-explainer" aria-labelledby="feature-heading">
              <h2 className="coaching-section-title" id="feature-heading">
                What is this feature?
              </h2>
              <ul>
                <li>Upload a clip of you playing that is 10s-30s long, then pick your deck strategy.</li>
                <li>The clip is treated like it was analyzed and the page gives coaching pointers.</li>
                <li>This works best with clips that have more action, so there is more gameplay to judge.</li>
              </ul>
            </section>
          </div>
        </div>
      ) : null}

      {stage === "analyzing" ? (
        <div className="coaching-view coaching-analyzing">
          <h1 className="coaching-title">Coaching</h1>
          <div className="coaching-analyze-card" role="status" aria-live="polite">
            <span className="coaching-spinner" aria-hidden="true"></span>
            <div>
              <h2>Analyzing gameplay...</h2>
              <p>
                Checking elixir leaks, card cycle, lane pressure, and timing for your <strong>{strategy}</strong> deck.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {stage === "result" ? (
        <div className="coaching-view coaching-result">
          <div className="coaching-result-header">
            <h1 className="coaching-title">Coaching</h1>
            <div className="coaching-result-badges" aria-label="Analysis details">
              <span>{strategy} deck</span>
              <span>Sample replay</span>
            </div>
          </div>

          <div className="coaching-result-grid">
            <section className="coaching-gameplay" aria-labelledby="gameplay-heading">
              <h2 className="coaching-section-title" id="gameplay-heading">
                Your gameplay
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
                <button className="coaching-secondary-button" type="button" onClick={resetCoaching}>
                  Analyze another
                </button>
              </div>
            </section>

            <section className="coaching-pointer-panel" aria-labelledby="pointers-heading">
              <p className="coaching-pointer-kicker">AI coach notes</p>
              <h2 className="coaching-section-title" id="pointers-heading">
                Pointers
              </h2>
              <ol className="coaching-pointer-list">
                {pointers.map((pointer) => (
                  <li key={pointer}>{pointer}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}
