import React, { useEffect, useState } from "react";
import { Play, Pause, Square } from "lucide-react";

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
    fetchNowPlaying();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
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
  if (gameData.app === "None" || loading) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 relative min-w-[120px]">
      <div className={`w-3 h-3 rounded-full ${getStatusColor()} transition-colors`} />
      <div className="flex items-center space-x-1">
        {getStatusIcon()}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground truncate max-w-[80px]">
            {getDisplayText()}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[80px]">
            {gameData.title}
          </span>
        </div>
      </div>
    </div>
  );
}
