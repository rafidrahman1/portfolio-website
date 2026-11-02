"use client";

import { formatCount } from "@/lib/play-store";
import { useDownloads } from "./useDownloads";

/** Total Play Store downloads, shown only once real data has loaded. */
export const TotalDownloads = ({ className = "" }: { className?: string }) => {
  const { data } = useDownloads();
  if (!data || data.total <= 0) return null;

  return (
    <div className={className}>
      <div className="text-2xl font-semibold tracking-tight tabular-nums">{formatCount(data.total)}</div>
      <div className="mt-1 text-sm text-muted-foreground">Total app downloads</div>
    </div>
  );
};

export const AppDownloadsBadge = ({ title }: { title: string }) => {
  const { data } = useDownloads();
  const app = data?.apps.find((a) => a.title === title);
  if (!app) return null;

  return <span className="text-sm text-muted-foreground tabular-nums">{app.label} downloads</span>;
};
