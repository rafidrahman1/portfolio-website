import { NextResponse } from "next/server";
import { getAppDownloads } from "@/lib/play-store";

export const revalidate = 86400;

export async function GET() {
  const apps = await getAppDownloads();
  const total = apps.reduce((sum, a) => sum + a.count, 0);
  return NextResponse.json({ total, apps }, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
