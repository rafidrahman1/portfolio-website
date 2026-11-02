import type { ContributionDay } from "@/lib/github-data";

export type { ContributionDay, ContributionLevel } from "@/lib/github-data";

/** Contributions are fetched server-side (and cached) so no token reaches the browser. */
export const fetchGitHubContributions = async (): Promise<ContributionDay[]> => {
  const response = await fetch("/api/github-contributions");
  if (!response.ok) throw new Error(`Failed to fetch contributions: ${response.status}`);
  const data = (await response.json()) as { contributions: ContributionDay[] };
  return data.contributions;
};
