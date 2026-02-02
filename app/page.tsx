"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

const analystProfiles = {
  "Sector Analyst": {
    pain: "Drowning in inconsistent broker and vendor files before modeling.",
    hook: "Automate schema conformance so you can focus on thesis work.",
    levers: ["Canonical views", "Variant screens", "Traceable fixes"],
  },
  "Data Ops Lead": {
    pain: "Manual QC across Excel, SQL, and Python every morning.",
    hook: "Centralize validation rules and surface anomalies in minutes.",
    levers: ["Rules engine", "Lineage audit", "Provider scoring"],
  },
  "Portfolio Strategist": {
    pain: "Silent errors undermine confidence heading into IC meetings.",
    hook: "Pair anomaly detection with explainable corrections.",
    levers: ["Anomaly radar", "Impact sims", "Research-ready exports"],
  },
} as const;

type ProfileKey = keyof typeof analystProfiles;

type SourceStat = {
  name: string;
  manualHours: number;
  anomalyRate: number;
};

const sourceMatrix: SourceStat[] = [
  { name: "Market data (Bloomberg)", manualHours: 6, anomalyRate: 0.8 },
  { name: "Alt data (card, satellite)", manualHours: 8, anomalyRate: 1.1 },
  { name: "Broker research PDFs", manualHours: 5, anomalyRate: 0.6 },
  { name: "Internal factor models", manualHours: 4, anomalyRate: 0.5 },
  { name: "Vendor ESG feeds", manualHours: 7, anomalyRate: 1.0 },
  { name: "Survey + channel checks", manualHours: 3, anomalyRate: 0.4 },
];

const deliverableOptions = [
  "Schema reconciliation playbook",
  "Provider scoring dashboard",
  "Automated anomaly detection run",
  "Data lineage + audit brief",
  "Analyst-ready research bundle",
  "Receipt-ready validation log",
] as const;

const sprintLengths = ["1 week", "2 weeks", "3 weeks", "4 weeks"] as const;

const blueprint = [
  {
    title: "Ingestion & standardization",
    bullets: [
      "Normalize schemas across Excel, SQL, and Python outputs with reusable mappings.",
      "Tag fields with business definitions so analysts trust column-level lineage.",
    ],
  },
  {
    title: "Validation & monitoring",
    bullets: [
      "Layer rulebooks (nulls, drift, outliers) plus adaptive anomaly detection.",
      "Stream corrections back to providers with embedded context and receipts.",
    ],
  },
  {
    title: "Analyst experience",
    bullets: [
      "Surface QA alerts inside research notebooks and collaboration tools.",
      "Capture before/after evidence for IC decks and regulatory reviews.",
    ],
  },
];

const numberFormatter = new Intl.NumberFormat("en-US");

export default function HomePage() {
  const [profile, setProfile] = useState<ProfileKey>("Sector Analyst");
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "Market data (Bloomberg)",
    "Alt data (card, satellite)",
    "Broker research PDFs",
  ]);
  const [automationCoverage, setAutomationCoverage] = useState(65);
  const [recordsPerDay, setRecordsPerDay] = useState(180000);
  const [baselineErrorRate, setBaselineErrorRate] = useState(2.1);
  const [targetErrorRate, setTargetErrorRate] = useState(0.4);
  const [avgAnalystRate, setAvgAnalystRate] = useState(175);
  const [kickoff, setKickoff] = useState(() => new Date().toISOString().split("T")[0]);
  const [sprintLength, setSprintLength] = useState<(typeof sprintLengths)[number]>(
    "2 weeks",
  );
  const [deliverables, setDeliverables] = useState<string[]>([
    "Schema reconciliation playbook",
    "Automated anomaly detection run",
    "Analyst-ready research bundle",
  ]);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [prioritySource, setPrioritySource] = useState("Market data (Bloomberg)");
  const [dataGoal, setDataGoal] = useState(
    "Hit <1% error rate before distributing models to PMs",
  );
  const [successScript, setSuccessScript] = useState<string | null>(null);

  const plan = useMemo(() => {
    if (!selectedSources.length) {
      return [] as Array<SourceStat & { hoursSaved: number; anomalyCatch: number }>;
    }

    const coverage = automationCoverage / 100;
    return sourceMatrix
      .filter((source) => selectedSources.includes(source.name))
      .map((source) => ({
        ...source,
        hoursSaved: Math.round(source.manualHours * coverage),
        anomalyCatch: parseFloat((source.anomalyRate * coverage).toFixed(1)),
      }));
  }, [automationCoverage, selectedSources]);

  const totalHoursSaved = plan.reduce((acc, item) => acc + item.hoursSaved, 0);
  const totalAnomalies = plan.reduce((acc, item) => acc + item.anomalyCatch, 0);

  const sanitizedTarget = Math.min(targetErrorRate, baselineErrorRate - 0.1);
  const errorsBaseline = recordsPerDay * (baselineErrorRate / 100);
  const errorsProjected = recordsPerDay * (Math.max(sanitizedTarget, 0.05) / 100);
  const errorDelta = Math.max(errorsBaseline - errorsProjected, 0);
  const minutesPerCorrection = 3;
  const hoursRecoveredDaily = (errorDelta * minutesPerCorrection) / 60;
  const monthlySavings = hoursRecoveredDaily * 20 * avgAnalystRate;

  const toggleSource = (sourceName: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceName)
        ? prev.filter((item) => item !== sourceName)
        : [...prev, sourceName],
    );
  };

  const toggleDeliverable = (item: string) => {
    setDeliverables((prev) =>
      prev.includes(item) ? prev.filter((entry) => entry !== item) : [...prev, item],
    );
  };

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const script = `Hi ${leadName || "team"},\n\nThanks for previewing DataFit. We'll configure the ${
      prioritySource || "selected"
    } pipeline, align on the ${profile} workflow, and capture before/after validation receipts for your diligence package.\n\nTalk soon,\nDataFit Lab`;
    setSuccessScript(script);
  };

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-6 py-12 lg:space-y-12 lg:py-16">
      <header className="sticky top-0 z-30 -mx-6 mb-8 bg-gradient-to-r from-night/95 via-night/80 to-night/60 px-6 py-4 backdrop-blur-lg">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10" />
            <div>
              <p className="font-display text-lg text-white">DataFit Lab</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Experimental nav</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <a href="#chatbot" className="transition hover:text-sun">
              Chatbot
            </a>
            <a href="#pricing" className="transition hover:text-sun">
              Pricing
            </a>
            <a href="#api" className="transition hover:text-sun">
              API Docs
            </a>
          </div>
          <a
            href="#lead-capture"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
          >
            Early access
          </a>
        </nav>
        <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-pulse via-aqua to-sun" />
      </header>

      <section className="grid gap-8 rounded-[32px] border border-white/15 bg-gradient-to-br from-[#081225]/90 via-[#1E3264]/80 to-[#3F7FED]/75 p-8 shadow-halo lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-white">
          <p className="badge-chip">Buy-side data validation lab</p>
          <h1 className="font-display text-4xl leading-tight lg:text-5xl">DataFit Control Room</h1>
          <p className="text-lg text-white/90 lg:text-xl">
            Clean, normalize, and explain multi-provider datasets so research analysts spend time on
            insight—not reconciliation. Stitch value prop canvases into a single workspace that catches
            silent errors before models ship to PMs.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Schema guardrails", "Anomaly radar", "Provider receipts", "Lineage notes", "Analyst handoff"].map(
              (label) => (
                <span key={label} className="channel-chip bg-white/20 text-white">
                  {label}
                </span>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#lead-capture"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-night transition hover:bg-sun"
            >
              Book a validation sprint
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="inline-flex items-center rounded-full border border-white/40 px-4 py-2 text-sm">
              Purpose-built for buy-side research pods
            </span>
          </div>
        </div>
        <div className="section-card bg-white/15 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Value DNA</p>
            <Sparkles className="h-5 w-5" />
          </div>
          <Image
            src="/pulsefunnel-logo.svg"
            alt="DataFit logo"
            width={420}
            height={160}
            className="mt-4 w-full rounded-2xl bg-white/80 p-4"
            priority
          />
          <p className="mt-6 text-sm text-white/90">
            Map value props to customer pains/gains (see canvas) and capture screenshots for your submission packet.
          </p>
        </div>
      </section>

      <section id="chatbot" className="section-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Research Copilot</h2>
          <span className="badge-chip text-white/60">Coming soon</span>
        </div>
        <p className="text-sm text-white/80">
          Embed a schema-aware chatbot that summarizes validation receipts, flags anomalies, and pushes short-hand notes to analysts inside Slack/Teams before they run a model. Use this placeholder section while you wire the dedicated page.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {["Surface silent errors", "Translate provider quirks", "Auto-generate IC memos"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="section-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Analyst profile calibrator</h2>
            <span className="text-sm text-white/70">Mirror the jobs-to-be-done</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {(Object.keys(analystProfiles) as ProfileKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setProfile(key)}
                className={clsx(
                  "rounded-2xl border p-4 text-left transition",
                  profile === key
                    ? "border-aqua bg-aqua/20 text-white"
                    : "border-white/10 hover:border-white/30",
                )}
              >
                <p className="font-semibold">{key}</p>
                <p className="mt-2 text-sm text-white/80">{analystProfiles[key].pain}</p>
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-white/70">Workflow promise</p>
            <p className="font-display text-xl">{analystProfiles[profile].hook}</p>
            <p className="mt-2 text-sm text-white/70">
              Focus levers: {analystProfiles[profile].levers.join(", ")}
            </p>
          </div>
        </div>

        <div className="section-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Data pipeline scope</h2>
            <span className="text-sm text-white/70">Toggle feeds + automation</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {sourceMatrix.map((source) => (
              <button
                key={source.name}
                type="button"
                onClick={() => toggleSource(source.name)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  selectedSources.includes(source.name)
                    ? "border-pulse bg-pulse/20 text-white"
                    : "border-white/10 text-white/70 hover:border-white/30",
                )}
              >
                {source.name}
              </button>
            ))}
          </div>
          <label className="block text-sm text-white/70">
            Automation coverage: <span className="font-semibold text-white">{automationCoverage}%</span>
            <input
              type="range"
              min={30}
              max={95}
              step={5}
              value={automationCoverage}
              onChange={(event) => setAutomationCoverage(Number(event.target.value))}
              className="mt-2 w-full cursor-pointer"
            />
          </label>
          {plan.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/20 p-4 text-sm text-white/70">
              Select at least one source to estimate reclaimed capacity.
            </p>
          ) : (
            <div className="space-y-4">
              {plan.map((entry) => (
                <div key={entry.name} className="rounded-2xl border border-white/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-xs text-white/60">
                        Manual hours {entry.manualHours}/wk • Anomaly rate {entry.anomalyRate}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display">{entry.hoursSaved} hrs returned</p>
                      <p className="text-xs text-white/60">{entry.anomalyCatch} anomalies flagged</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-pulse via-aqua to-sun"
                      style={{ width: `${Math.max((entry.hoursSaved / (entry.manualHours || 1)) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-sm text-white/70">Weekly hours returned</p>
                  <p className="text-2xl font-display">{totalHoursSaved}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Anomalies caught upfront</p>
                  <p className="text-2xl font-display">{totalAnomalies.toFixed(1)}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-aqua" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="section-card space-y-4">
          <h2 className="font-display text-2xl">Reliability pulse</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            <label className="text-sm text-white/70">
              Records/day
              <input
                type="number"
                min={10000}
                value={recordsPerDay}
                onChange={(e) => setRecordsPerDay(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              />
            </label>
            <label className="text-sm text-white/70">
              Baseline error %
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={baselineErrorRate}
                onChange={(e) => setBaselineErrorRate(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              />
            </label>
            <label className="text-sm text-white/70">
              Target error %
              <input
                type="number"
                min={0.05}
                step={0.05}
                value={targetErrorRate}
                onChange={(e) => setTargetErrorRate(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              />
            </label>
            <label className="text-sm text-white/70">
              Analyst rate ($/hr)
              <input
                type="number"
                min={50}
                value={avgAnalystRate}
                onChange={(e) => setAvgAnalystRate(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">Daily hours recovered</p>
              <p className="text-3xl font-display">{hoursRecoveredDaily.toFixed(1)} hrs</p>
              <p className="text-xs text-aqua">
                {numberFormatter.format(Math.round(errorDelta))} avoided corrections
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">Monthly value unlocked</p>
              <p className="text-3xl font-display">
                ${numberFormatter.format(Math.round(monthlySavings))}
              </p>
              <p className="text-xs text-pulse">Assumes 20 analyst days/month</p>
            </div>
          </div>
        </div>

        <div className="section-card space-y-4">
          <h2 className="font-display text-2xl">Validation sprint builder</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-white/70">
              Sprint kickoff
              <input
                type="date"
                value={kickoff}
                onChange={(e) => setKickoff(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              />
            </label>
            <label className="text-sm text-white/70">
              Sprint length
              <select
                value={sprintLength}
                onChange={(e) => setSprintLength(e.target.value as (typeof sprintLengths)[number])}
                className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              >
                {sprintLengths.map((length) => (
                  <option key={length}>{length}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <p className="text-sm text-white/70">Deliverables</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {deliverableOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleDeliverable(item)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    deliverables.includes(item)
                      ? "border-sun bg-sun/20 text-white"
                      : "border-white/10 text-white/70 hover:border-white/30",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            <pre className="whitespace-pre-wrap font-body text-sm">
{`Kickoff: ${kickoff}
Cadence: ${sprintLength}
Deliverables: ${deliverables.join(", ") || "TBD"}
Owner: ${profile}`}
            </pre>
            <p className="mt-2 text-xs text-white/60">Capture logs + receipts to prove the value proposition fit.</p>
          </div>
        </div>
      </section>

      <section id="lead-capture" className="section-card space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">Intake + follow-up</h2>
            <p className="text-sm text-white/70">Record GitHub URL, screenshots, and analyst goals.</p>
          </div>
          <span className="badge-chip text-white/60">Attach to submission</span>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleLeadSubmit}>
          <label className="text-sm text-white/70">
            Name
            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
            />
          </label>
          <label className="text-sm text-white/70">
            Work email
            <input
              type="email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              required
            />
          </label>
          <label className="text-sm text-white/70">
            Priority data source
            <select
              value={prioritySource}
              onChange={(e) => setPrioritySource(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-night/60 p-2"
            >
              {sourceMatrix.map((source) => (
                <option key={source.name}>{source.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/70">
            Definition of done
            <textarea
              className="mt-1 h-24 w-full rounded-xl border border-white/10 bg-night/60 p-2"
              value={dataGoal}
              onChange={(e) => setDataGoal(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-aqua via-pulse to-sun px-6 py-3 font-semibold text-night shadow-halo md:col-span-2"
          >
            Generate follow-up script
          </button>
        </form>
        {successScript && (
          <div className="rounded-2xl border border-white/20 bg-night/60 p-4 text-sm">
            <p className="mb-2 font-semibold text-white/80">Autogenerated reply</p>
            <pre className="whitespace-pre-wrap font-body text-white/70">{successScript}</pre>
          </div>
        )}
      </section>

      <section className="section-card space-y-4">
        <h2 className="font-display text-2xl">Validation blueprint</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {blueprint.map((section) => (
            <details key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4" open>
              <summary className="cursor-pointer font-semibold">{section.title}</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-card space-y-4">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="font-display text-2xl">Pricing sketch</h2>
          <p className="text-sm text-white/70">Placeholder until the full page ships.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tier: "Pilot", desc: "Single pod • 3 feeds • validation receipts", price: "$4k / mo" },
            { tier: "Studio", desc: "Up to 5 pods • unlimited rulebooks", price: "$9k / mo" },
            { tier: "Enterprise", desc: "Custom SLAs • lineage export", price: "Talk to us" },
          ].map((plan) => (
            <div key={plan.tier} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{plan.tier}</p>
              <p className="mt-2 text-3xl font-display">{plan.price}</p>
              <p className="mt-2 text-sm text-white/70">{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="api" className="section-card space-y-4">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="font-display text-2xl">API doc placeholder</h2>
          <a href="#" className="text-sm text-aqua hover:text-sun">
            Generate docs →
          </a>
        </div>
        <p className="text-sm text-white/80">
          Describe how your validation API will be consumed. Below is a starter linear bar to illustrate the request lifecycle.
        </p>
        <div className="space-y-2">
          {["/ingest", "/validate", "/receipts"].map((endpoint, index) => (
            <div key={endpoint} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{endpoint}</span>
                <span>{index === 0 ? "POST" : index === 1 ? "PUT" : "GET"}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-aqua via-pulse to-sun"
                  style={{ width: `${(index + 1) * 30}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/60">Swap this stub once the real API explorer is ready.</p>
      </section>

      <footer className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          Push the repo to GitHub, deploy on Vercel/Netlify, grab hero + reliability screenshots, and attach them with your value proposition slide deck.
        </p>
      </footer>
    </main>
  );
}
