"use client";

import { Download } from "lucide-react";
import { formatCount } from "@/lib/play-store";
import { useDownloads } from "./useDownloads";

export const TotalDownloads = ({ className = "" }: { className?: string }) => {
  const { data } = useDownloads();
  if (!data || data.total <= 0) return null;

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border bg-card/50 px-4 py-2 backdrop-blur-sm ${className}`}>
      <Download className="h-4 w-4 text-primary" aria-hidden />
      <span className="font-semibold">{formatCount(data.total)}</span>
      <span className="text-sm text-muted-foreground">total app downloads</span>
    </div>
  );
};

export const AppDownloadsBadge = ({ title }: { title: string }) => {
  const { data } = useDownloads();
  const app = data?.apps.find((a) => a.title === title);
  if (!app) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Download className="h-3 w-3" aria-hidden />
      {app.label} downloads
    </span>
  );
};
