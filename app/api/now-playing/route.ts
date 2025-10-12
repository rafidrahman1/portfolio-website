import { NextRequest, NextResponse } from 'next/server';

type GameData = {
  app: string;
  title: string;
};

let currentGame: GameData | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    currentGame = body;
    return NextResponse.json({ status: "updated" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(currentGame || { app: "None", title: "Idle" });
}
