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

    <div className="relative px-5 py-6 sm:px-6">
      {/* rail */}
      <div aria-hidden className="absolute bottom-9 left-[1.65rem] top-9 w-px bg-border sm:left-[2.15rem]">
        <span
          className="flow-dot absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-primary"
          style={{ ["--travel" as string]: "calc(100% - 7px)" }}
        />
      </div>

      <ol className="space-y-5">
        {layers.map((l, i) => (
          <li key={l.key} className="node-in relative flex items-center gap-5 pl-6" style={{ ["--i" as string]: i }}>
            <span aria-hidden className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-muted-foreground bg-background" />
            <span className="eyebrow w-[5.5rem] shrink-0 text-muted-foreground">{l.key}</span>
            <div className="min-w-0 flex-1 rounded-sm border border-border bg-background/60 px-3 py-2.5 transition-colors duration-200 hover:border-primary/50">
              <div className="truncate text-sm font-medium">{l.value}</div>
              <div className="truncate font-mono text-[11px] text-muted-foreground">{l.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);
