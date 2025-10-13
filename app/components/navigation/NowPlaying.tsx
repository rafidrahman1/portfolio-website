import React, { useEffect, useState } from "react";
import { Play, Square } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type GameData = {
  app: string;
  title: string;
};

export function NowPlaying() {
  const [gameData, setGameData] = useState<GameData>({ app: "None", title: "Idle" });
  const [loading, setLoading] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/now-playing");
      const data = await res.json();
      setGameData(data);
    } catch (error) {
      console.error("Failed to fetch now playing status:", error);
      setGameData({ app: "None", title: "Idle" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNowPlaying();

    // Set up Server-Sent Events for real-time updates
    const eventSource = new EventSource("/api/now-playing/stream");
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'connected') {
          console.log('Connected to now playing stream');
        } else {
          // Update the game data immediately
          setGameData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to parse SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      // Fallback to polling if SSE fails
      const interval = setInterval(fetchNowPlaying, 5000);
      return () => clearInterval(interval);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getStatusIcon = () => {
    if (gameData.app === "None") {
      return <Square className="w-3 h-3" />;
    }
    return <Play className="w-3 h-3" />;
  };

  const getStatusColor = () => {
    if (gameData.app === "None") {
      return "bg-gray-400";
    }
    return "bg-green-500";
  };

  const getDisplayText = () => {
    const app = gameData.app.toLowerCase();
    if (app.includes("vscode") || app.includes("cursor") || app.includes("visual studio code")) {
      return "Now Coding";
    }
    return gameData.app;
  };

  // Don't show anything if no activity or still loading
  if (gameData.app === "none" || gameData.app === "None" || loading) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 relative min-w-[140px]">
            <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} transition-colors`} />
            {getStatusIcon()}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0.5">
                {getDisplayText()}
              </Badge>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                {gameData.title}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <div className="font-medium">{gameData.app}</div>
            <div className="text-muted-foreground">{gameData.title}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
