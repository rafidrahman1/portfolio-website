// GitHub API helpers and showcase project data (content from content/portfolio.json)
import { portfolio } from "@/lib/portfolio";

export interface GitHubContribution {
  level: number;
  count: number;
  date: string;
}

export async function getGitHubContributions(username: string): Promise<GitHubContribution[]> {
  try {
    const response = await fetch(`https://github-contributions-api.vercel.app/api/v1/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    const data = await response.json();
    return data.contributions || [];
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return [];
  }
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
