import { NextRequest } from 'next/server';
import { addConnection, removeConnection } from '@/lib/sse-broadcast';

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      // Add this connection to the set
      addConnection(controller);
      
      // Send initial connection message
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));
    },
    cancel(controller) {
      // Remove connection when client disconnects
      removeConnection(controller);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}
