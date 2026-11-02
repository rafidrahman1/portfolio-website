import { NextResponse } from "next/server";
import { getGitHubContributions } from "@/lib/github-data";
import { portfolio } from "@/lib/portfolio";

export const revalidate = 3600;

export async function GET() {
  try {
    const contributions = await getGitHubContributions(portfolio.github.calendarUsername);
    return NextResponse.json(
      { contributions },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    console.error("GitHub contributions failed:", error);
    return NextResponse.json({ error: "Failed to load contributions" }, { status: 502 });
  }
}
