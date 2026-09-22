"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type TrophyEntry = {
  id: string;
  date: string;
  trophies: number;
};

type RangeKey = "all" | "7d" | "1m" | "3m" | "6m" | "1y";

type ChartPoint = TrophyEntry & {
  x: number;
  y: number;
};

const CHART_WIDTH = 720;
const CHART_HEIGHT = 390;
const CHART_MARGIN = { top: 62, right: 34, bottom: 88, left: 96 };
const DAY_MS = 24 * 60 * 60 * 1000;
const RANGE_OPTIONS: { key: RangeKey; label: string; days?: number }[] = [
  { key: "all", label: "All history" },
  { key: "7d", label: "1 week", days: 7 },
  { key: "1m", label: "1 month", days: 30 },
  { key: "3m", label: "3 months", days: 90 },
  { key: "6m", label: "6 months", days: 180 },
  { key: "1y", label: "1 year", days: 365 },
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayValue() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function normalizeDate(value: string) {
  const cleanValue = value.trim();
  if (!cleanValue) throw new Error("Every row needs a date.");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(cleanValue)
    ? new Date(`${cleanValue}T00:00:00`)
    : new Date(cleanValue);
  if (Number.isNaN(date.getTime())) throw new Error(`${cleanValue} is not a readable date.`);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseTrophies(value: string) {
  const trophies = Number(value.trim());
  if (!Number.isInteger(trophies) || trophies < 0) {
    throw new Error("Trophies must be a whole number of 0 or more.");
  }
  return trophies;
}

function parseCsvRows(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];
    if (character === '"' && inQuotes && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(cell.trim());
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell.trim());
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

function parseCsv(text: string): TrophyEntry[] {
  const rows = parseCsvRows(text.replace(/^\uFEFF/, ""));
  if (!rows.length) throw new Error("That CSV does not contain any rows.");
  const firstRow = rows[0].map((value) => value.toLowerCase());
  const hasHeader = firstRow.length === 2 && firstRow[0] === "date" && firstRow[1] === "trophies";
  const dataRows = hasHeader ? rows.slice(1) : rows;
  if (!dataRows.length) throw new Error("Add at least one date and trophy value to the CSV.");

  return dataRows.map((values, index) => {
    if (values.length !== 2) throw new Error(`Row ${index + 1} must have exactly date and trophies fields.`);
    return { id: makeId(), date: normalizeDate(values[0]), trophies: parseTrophies(values[1]) };
  });
}

function sortEntries(entries: TrophyEntry[]) {
  return [...entries].sort((first, second) => first.date.localeCompare(second.date) || first.id.localeCompare(second.id));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

function formatShortDate(value: string, includeYear: boolean) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
  }).format(new Date(`${value}T00:00:00`));
}

function formatExactDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function getVisibleEntries(entries: TrophyEntry[], rangeKey: RangeKey) {
  if (rangeKey === "all" || !entries.length) return entries;
  const option = RANGE_OPTIONS.find((range) => range.key === rangeKey);
  const latest = new Date(`${entries[entries.length - 1].date}T00:00:00`).getTime();
  const cutoff = latest - (option?.days ?? 0) * DAY_MS;
  return entries.filter((entry) => new Date(`${entry.date}T00:00:00`).getTime() >= cutoff);
}

function getChartPoints(points: TrophyEntry[]): { chartPoints: ChartPoint[]; low: number; high: number } {
  const values = points.map((point) => point.trophies);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max(100, (max - min) * 0.18);
  const low = Math.max(0, min - padding);
  const high = max + padding;
  const plotWidth = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right;
  const plotHeight = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;
  const chartPoints = points.map((point, index) => ({
    ...point,
    x: CHART_MARGIN.left + (plotWidth * index) / Math.max(1, points.length - 1),
    y: CHART_MARGIN.top + ((high - point.trophies) / (high - low || 1)) * plotHeight,
  }));

  return { chartPoints, low, high };
}

function TrophyHistoryChart({
  points,
  rangeLabel,
  selectedIndex,
  onSelectPoint,
}: {
  points: TrophyEntry[];
  rangeLabel: string;
  selectedIndex: number | null;
  onSelectPoint: (index: number) => void;
}) {
  const { chartPoints, low, high } = getChartPoints(points);
  const plotWidth = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right;
  const plotHeight = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;
  const linePath = chartPoints
    .map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const xTickIndexes = Array.from(new Set([0, Math.floor((chartPoints.length - 1) / 2), chartPoints.length - 1]));
  const selectedPoint = selectedIndex === null ? null : chartPoints[selectedIndex];

  return (
    <div className="history-chart-shell">
      <svg
        className="history-chart"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={`Trophies over time using ${rangeLabel}.`}
      >
        <rect width={CHART_WIDTH} height={CHART_HEIGHT} fill="#ffffff" />
        {Array.from({ length: 16 }, (_, index) => {
          const x = CHART_MARGIN.left + (plotWidth * index) / 15;
          return <line key={`x-grid-${index}`} x1={x} x2={x} y1={CHART_MARGIN.top} y2={CHART_HEIGHT - CHART_MARGIN.bottom} stroke="#d9d9d9" />;
        })}
        {Array.from({ length: 10 }, (_, index) => {
          const y = CHART_MARGIN.top + (plotHeight * index) / 9;
          return <line key={`y-grid-${index}`} x1={CHART_MARGIN.left} x2={CHART_WIDTH - CHART_MARGIN.right} y1={y} y2={y} stroke="#d9d9d9" />;
        })}
        <line x1={CHART_MARGIN.left} x2={CHART_MARGIN.left} y1={CHART_MARGIN.top} y2={CHART_HEIGHT - CHART_MARGIN.bottom} stroke="#808080" strokeWidth="2" />
        <line x1={CHART_MARGIN.left} x2={CHART_WIDTH - CHART_MARGIN.right} y1={CHART_HEIGHT - CHART_MARGIN.bottom} y2={CHART_HEIGHT - CHART_MARGIN.bottom} stroke="#808080" strokeWidth="2" />
        <text className="history-chart-title" x={CHART_WIDTH / 2} y="34" textAnchor="middle">Trophies over time</text>
        <text className="history-axis-title" transform={`rotate(-90 26 ${CHART_HEIGHT / 2})`} x="26" y={CHART_HEIGHT / 2} textAnchor="middle">Trophies</text>
        <text className="history-axis-title" x={CHART_WIDTH / 2} y="376" textAnchor="middle">Time</text>
        {[high, (high + low) / 2, low].map((tick, index) => (
          <text key={`y-label-${index}`} className="history-tick-label" x="84" y={CHART_MARGIN.top + (plotHeight * index) / 2 + 5} textAnchor="end">
            {formatNumber(Math.round(tick))}
          </text>
        ))}
        {xTickIndexes.map((index) => (
          <text key={`x-label-${index}`} className="history-tick-label" x={chartPoints[index].x} y={CHART_HEIGHT - 51} textAnchor="middle">
            {formatShortDate(chartPoints[index].date, points.length < 3)}
          </text>
        ))}
        <path d={linePath} fill="none" stroke="#63c84d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        {chartPoints.map((point, index) => (
          <circle
            key={point.id}
            aria-label={`${formatNumber(point.trophies)} trophies on ${formatExactDate(point.date)}`}
            className="history-chart-dot"
            cx={point.x}
            cy={point.y}
            fill={index === selectedIndex ? "#f4a51c" : "#63c84d"}
            onClick={() => onSelectPoint(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectPoint(index);
              }
            }}
            r={index === selectedIndex ? 8 : 6}
            role="button"
            stroke="#ffffff"
            strokeWidth="2"
            tabIndex={0}
          />
        ))}
      </svg>
      {selectedPoint ? (
        <div
          className="history-point-detail"
          style={{
            left: `${Math.min(88, Math.max(12, (selectedPoint.x / CHART_WIDTH) * 100))}%`,
            top: `${(selectedPoint.y / CHART_HEIGHT) * 100}%`,
          }}
        >
          <strong>{formatNumber(selectedPoint.trophies)} trophies</strong>
          <span>{formatExactDate(selectedPoint.date)}</span>
        </div>
      ) : (
        <p className="history-point-hint">Click a point to see the exact date and trophies.</p>
      )}
    </div>
  );
}

export function ProgressTracker() {
  const [entries, setEntries] = useState<TrophyEntry[]>([]);
  const [dateValue, setDateValue] = useState(todayValue);
  const [trophiesValue, setTrophiesValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeRange, setActiveRange] = useState<RangeKey>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [statusIsError, setStatusIsError] = useState(false);
  const sortedEntries = sortEntries(entries);
  const visiblePoints = getVisibleEntries(sortedEntries, activeRange);
  const rangeLabel = RANGE_OPTIONS.find((range) => range.key === activeRange)?.label ?? "All history";

  function showStatus(message: string, isError = false) {
    setStatus(message);
    setStatusIsError(isError);
  }

  function resetEditor() {
    setEditingId(null);
    setDateValue(todayValue());
    setTrophiesValue("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const nextEntry = { id: editingId ?? makeId(), date: normalizeDate(dateValue), trophies: parseTrophies(trophiesValue) };
      setEntries((current) => sortEntries(editingId ? current.map((entry) => (entry.id === editingId ? nextEntry : entry)) : [...current, nextEntry]));
      setSelectedIndex(null);
      showStatus(editingId ? "Entry updated." : "Entry added.");
      resetEditor();
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Please check the entry and try again.", true);
    }
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setEntries(sortEntries(parseCsv(await file.text())));
      setSelectedIndex(null);
      showStatus(`${file.name} loaded successfully.`);
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "That CSV could not be loaded.", true);
    } finally {
      event.target.value = "";
    }
  }

  function handleDownload() {
    if (!sortedEntries.length) return;
    const csv = ["date,trophies", ...sortedEntries.map((entry) => `${entry.date},${entry.trophies}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "trophy-history.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    showStatus("CSV downloaded.");
  }

  return (
    <section className="progress-tracker history-workspace" aria-labelledby="history-title">
      <div className="history-heading">
        <div>
          <p className="history-kicker">Personal progress file</p>
          <h1 className="history-title" id="history-title">trophy history file</h1>
          <p className="history-intro">Keep a simple two-column CSV of your trophy milestones, then turn it into a graph whenever you want.</p>
        </div>
        <div className="history-file-actions" aria-label="CSV file actions">
          <label className="history-action-button history-upload-button" htmlFor="csv-upload">Upload CSV</label>
          <input id="csv-upload" className="history-file-input" type="file" accept=".csv,text/csv" onChange={handleUpload} />
          <button className="history-action-button history-download-button" type="button" disabled={!sortedEntries.length} onClick={handleDownload}>Download CSV</button>
        </div>
      </div>

      <div className="history-grid">
        <section className="history-editor" aria-labelledby="entry-heading">
          <div className="history-panel-heading">
            <div><p className="history-panel-kicker">Create or update</p><h2 id="entry-heading">Add a trophy snapshot</h2></div>
            <span className="history-entry-state">{editingId ? "Editing row" : "New row"}</span>
          </div>
          <form className="history-entry-form" onSubmit={handleSubmit}>
            <label className="history-field"><span>Trophies</span><input type="number" min="0" step="1" placeholder="Click to type" required value={trophiesValue} onChange={(event) => setTrophiesValue(event.target.value)} /></label>
            <label className="history-field"><span>Date when you had those trophies</span><input type="date" required value={dateValue} onChange={(event) => setDateValue(event.target.value)} /></label>
            <div className="history-form-actions">
              <button className="history-primary-button" type="submit">{editingId ? "Update entry" : "Add entry"}</button>
              {editingId ? <button className="history-cancel-button" type="button" onClick={resetEditor}>Cancel edit</button> : null}
            </div>
          </form>
          <p className="history-format-note"><code>date,trophies</code> is the only format this page uses.</p>
        </section>

        <section className="history-file-panel" aria-labelledby="file-heading">
          <div className="history-panel-heading">
            <div><p className="history-panel-kicker">Your local data</p><h2 id="file-heading">Current file</h2></div>
            <span className="history-row-count">{sortedEntries.length} {sortedEntries.length === 1 ? "row" : "rows"}</span>
          </div>
          <div className="history-table-wrap">
            <table className="history-table">
              <caption className="progress-visually-hidden">Trophy history rows</caption>
              <thead><tr><th scope="col">#</th><th scope="col">Date</th><th scope="col">Trophies</th><th scope="col"><span className="progress-visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {sortedEntries.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td><td>{formatShortDate(entry.date, true)}</td><td>{formatNumber(entry.trophies)}</td>
                    <td className="history-row-actions"><button type="button" onClick={() => { setEditingId(entry.id); setDateValue(entry.date); setTrophiesValue(String(entry.trophies)); }}>Edit</button><button type="button" onClick={() => { setEntries((current) => current.filter((item) => item.id !== entry.id)); setSelectedIndex(null); showStatus("Entry removed."); }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!sortedEntries.length ? <p className="history-table-empty">Add a row or upload a CSV to start your file.</p> : null}
          </div>
        </section>
      </div>

      <section className="history-chart-card" aria-labelledby="chart-heading">
        <div className="history-chart-heading">
          <h2 id="chart-heading">Trophies over time</h2>
        </div>
        {visiblePoints.length ? <TrophyHistoryChart points={visiblePoints} rangeLabel={rangeLabel} selectedIndex={selectedIndex} onSelectPoint={setSelectedIndex} /> : <div className="history-chart-empty"><span className="history-empty-icon" aria-hidden="true">+</span><strong>Your graph will appear here</strong><span>{sortedEntries.length ? "No rows fall inside this time range." : "Add at least one dated trophy entry or upload your CSV."}</span></div>}
        <div className="history-range-controls" aria-label="Graph time range">
          {RANGE_OPTIONS.map((option) => <button key={option.key} className="history-range-button" type="button" aria-pressed={activeRange === option.key} onClick={() => { setActiveRange(option.key); setSelectedIndex(null); }}>{option.label}</button>)}
        </div>
      </section>

      <p className={`history-status${statusIsError ? " is-error" : ""}`} role="status" aria-live="polite">{status}</p>
    </section>
  );
}
