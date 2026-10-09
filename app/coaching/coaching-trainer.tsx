"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STRATEGIES, type Strategy } from "./coaching-data";

type Stage = "setup" | "analyzing";

export function CoachingTrainer() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("setup");
  const [strategy, setStrategy] = useState<Strategy>("Cycle");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setSelectedFile(file.name);
    setStage("analyzing");

    window.setTimeout(() => {
      const params = new URLSearchParams({ strategy, file: file.name });
      router.push(`/coaching/feedback/?${params.toString()}`);
    }, 850);
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
              <input
                ref={inputRef}
                className="history-file-input"
                type="file"
                onChange={handleFileChange}
                aria-label="Choose a gameplay clip"
              />
              <button
                className="coaching-upload-card"
                type="button"
                aria-describedby="upload-note"
                onClick={() => inputRef.current?.click()}
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
                Choose any file. After it is selected, you will be taken to a feedback page with three random practice pointers.
              </p>
              {selectedFile ? <p className="coaching-selected-file">Selected: {selectedFile}</p> : null}
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
                <li>Pick the deck strategy you are practicing, then choose a short gameplay clip.</li>
                <li>This prototype does not analyze video with AI; it gives general coaching pointers instead.</li>
                <li>Each feedback page selects three pointers from a set of twenty.</li>
              </ul>
            </section>
          </div>
        </div>
      ) : (
        <div className="coaching-view coaching-analyzing">
          <h1 className="coaching-title">Coaching</h1>
          <div className="coaching-analyze-card" role="status" aria-live="polite">
            <span className="coaching-spinner" aria-hidden="true"></span>
            <div>
              <h2>Preparing your feedback...</h2>
              <p>
                Building three practice pointers for your <strong>{strategy}</strong> deck.
              </p>
              {selectedFile ? <p className="coaching-selected-file">Using {selectedFile}</p> : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
