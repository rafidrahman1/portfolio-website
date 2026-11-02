// GitHub API helpers (server-only) and showcase project data (content from content/portfolio.json)
import { portfolio } from "@/lib/portfolio";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

export function calculateContributionLevel(count: number): ContributionLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

interface GraphQLCalendar {
  weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
}

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

async function fetchGraphQLContributions(username: string, token: string): Promise<ContributionDay[] | null> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { username } }),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;

  const json = (await response.json()) as {
    data?: { user?: { contributionsCollection?: { contributionCalendar?: GraphQLCalendar } } };
  };
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: calculateContributionLevel(day.contributionCount),
    })),
  );
}

async function fetchPublicContributions(username: string): Promise<ContributionDay[]> {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`Failed to fetch contributions: ${response.status}`);

  const data = (await response.json()) as { contributions?: { date: string; count: number }[] };
  return (data.contributions ?? []).map((day) => ({
    date: day.date,
    count: day.count,
    level: calculateContributionLevel(day.count),
  }));
}

/** Uses the GitHub GraphQL API when `GITHUB_TOKEN` is set, else a public mirror. */
export async function getGitHubContributions(username: string): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const result = await fetchGraphQLContributions(username, token);
      if (result) return result;
    } catch (error) {
      console.error("GitHub GraphQL contributions failed, using public API:", error);
    }
  }
  return fetchPublicContributions(username);
}

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  demoUrl: string;
  deviceType: "laptop" | "mobile";
  featured: boolean;
  codeUrl: string;
  codeButton: boolean;
  demoButton: boolean;
}

export const getStaticProjects = (): ProjectData[] => portfolio.showcaseProjects;
