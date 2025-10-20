// Store active SSE connections
const connections = new Set<ReadableStreamDefaultController>();

// Function to broadcast updates to all connected clients
export function broadcastUpdate(data: any) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  for (const controller of Array.from(connections)) {
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch (error) {
      console.warn("Removing dead SSE connection:", error);
      connections.delete(controller);
    }
  }
}

// Function to add a new connection
export function addConnection(controller: ReadableStreamDefaultController) {
  connections.add(controller);
}

// Function to remove a connection
export function removeConnection(controller: ReadableStreamDefaultController) {
  connections.delete(controller);
}
