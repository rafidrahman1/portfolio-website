"use client";

import { useQuery } from "@tanstack/react-query";
import type { AppDownloads } from "@/lib/play-store";

interface DownloadsResponse {
  total: number;
  apps: AppDownloads[];
}

export function useDownloads() {
  return useQuery<DownloadsResponse>({
    queryKey: ["downloads"],
    queryFn: async () => {
      const res = await fetch("/api/downloads");
      if (!res.ok) throw new Error("Failed to load downloads");
      return res.json();
    },
    staleTime: 60 * 60 * 1000,
  });
}
