/**
 * Small abstract diagram of the offline-first mobile architecture described in the
 * experience section (Riverpod state, repository/service layer, sqflite cache, REST API).
 * Pure CSS animation: nodes stagger in once, a single dot travels the rail.
 */
const layers = [
  { key: "UI", value: "Flutter widgets", note: "Responsive, accessible" },
  { key: "State", value: "Riverpod", note: "Providers" },
  { key: "Repository", value: "REST service layer", note: "Token management" },
  { key: "Local", value: "sqflite cache", note: "Offline-first" },
  { key: "Remote", value: "REST APIs", note: "Queued sync" },
];

export const HeroDiagram = () => (
  <div
    className="relative overflow-hidden rounded-md border border-border bg-surface/80"
    role="img"
    aria-label="Architecture diagram: Flutter UI, Riverpod state, repository layer, sqflite local cache and REST APIs with queued sync."
  >
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <span className="eyebrow text-muted-foreground">Architecture</span>
      <span className="eyebrow flex items-center gap-2 text-muted-foreground">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
        Offline-first
      </span>
    </div>

    <div className="px-5 py-6 sm:px-6">
      <ol>
        {layers.map((l, i) => (
          <li
            key={l.key}
            className="node-in relative grid grid-cols-[6.25rem_1fr] items-center gap-x-4 pb-5 pl-6 last:pb-0"
            style={{ ["--i" as string]: i }}
          >
            {/* node + connector to the next layer */}
            <span aria-hidden className={`absolute left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-muted-foreground bg-background ${i < layers.length - 1 ? "top-[calc((100%-1.25rem)/2)]" : "top-1/2"}`} />
            {i < layers.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[2.5px] top-[calc((100%-1.25rem)/2)] h-[calc(100%)] w-px bg-border"
              />
            )}
            <span className="eyebrow text-muted-foreground">{l.key}</span>
            <div
              className="pulse-node min-w-0 rounded-sm border border-border bg-background/60 px-3 py-2.5 transition-colors duration-200 hover:border-primary/50"
              style={{ ["--i" as string]: i }}
            >
              <div className="truncate text-sm font-medium">{l.value}</div>
              <div className="truncate font-mono text-[11px] text-muted-foreground">{l.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);
