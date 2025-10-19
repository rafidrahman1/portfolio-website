import { NextRequest, NextResponse } from 'next/server';
import { broadcastUpdate } from '@/lib/sse-broadcast';

type GameData = {
  app: string;
  title: string;
};

let currentGame: GameData | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;

    // Validate the request payload before using it
    if (!isValidGameData(body)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    currentGame = body;

    // Broadcast the update to all connected SSE clients
    broadcastUpdate(body);

    return NextResponse.json({ status: "updated" });
  } catch (error) {
    // Handle parse errors as a bad request; rethrow others to surface 500s
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON in /api/now-playing POST", error);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    console.error("Unhandled error in /api/now-playing POST", error);
    throw error;
  }
}

export async function GET() {
  return NextResponse.json(currentGame || { app: "None", title: "Idle" });
}

function isValidGameData(value: unknown): value is GameData {
  if (value === null || typeof value !== "object") return false;
  const maybe = value as Record<string, unknown>;
  return typeof maybe.app === "string" && typeof maybe.title === "string";
}
