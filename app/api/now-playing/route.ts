import { NextRequest, NextResponse } from 'next/server';
import { broadcastUpdate } from './stream/route';

type GameData = {
  app: string;
  title: string;
};

let currentGame: GameData | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    currentGame = body;
    
    // Broadcast the update to all connected SSE clients
    broadcastUpdate(body);
    
    return NextResponse.json({ status: "updated" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(currentGame || { app: "None", title: "Idle" });
}
