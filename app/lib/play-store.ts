import { portfolio } from "./portfolio";

export interface AppDownloads {
  title: string;
  /** Lower bound of the public Play Store bucket, e.g. 10000 for "10K+". */
  count: number;
  /** Label as shown on the store, e.g. "10K+". */
  label: string;
}

const MULTIPLIERS: Record<string, number> = { K: 1e3, M: 1e6, B: 1e9 };

export function parseBucket(value: string): number {
  const match = value.replace(/,/g, "").match(/^([\d.]+)([KMB]?)\+?$/i);
  if (!match) return 0;
  return Math.round(parseFloat(match[1]) * (MULTIPLIERS[match[2].toUpperCase()] ?? 1));
}

export function formatCount(count: number): string {
  if (count >= 1e6) return `${+(count / 1e6).toFixed(1)}M+`;
  if (count >= 1e3) return `${+(count / 1e3).toFixed(1)}K+`;
  return `${count}+`;
}

export function getPlayStoreId(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname === "play.google.com" ? u.searchParams.get("id") : null;
  } catch {
    return null;
  }
}

async function fetchPlayDownloads(id: string): Promise<string | null> {
  const res = await fetch(`https://play.google.com/store/apps/details?id=${encodeURIComponent(id)}&hl=en&gl=US`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-downloads/1.0)" },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const html = await res.text();
  const m = html.match(/([\d.,]+[KMB]?\+)\s*<\/div>\s*<div[^>]*>\s*Downloads/i);
  if (!m) {
    // Google changed the markup (or served a consent page); the UI hides the stat when this happens.
    console.warn(`[play-store] Could not find the download count for ${id}; the page markup may have changed.`);
  }
  return m ? m[1] : null;
}

/** Download buckets for every showcase project that links to Google Play. */
export async function getAppDownloads(): Promise<AppDownloads[]> {
  const apps = portfolio.showcaseProjects
    .map((p) => ({ title: p.title, id: getPlayStoreId(p.demoUrl) }))
    .filter((p): p is { title: string; id: string } => !!p.id);

  const results = await Promise.all(
    apps.map(async (app) => {
      try {
        const label = await fetchPlayDownloads(app.id);
        return label ? { title: app.title, label, count: parseBucket(label) } : null;
      } catch (error) {
        console.warn(`[play-store] Failed to fetch downloads for ${app.id}:`, error);
        return null;
      }
    }),
  );
  return results.filter((r): r is AppDownloads => r !== null);
}
