"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { fetchGitHubContributions, ContributionDay } from "./fetchGitHubContributions";
import { ContributionCell } from "./ContributionCell";
import { CalendarLegend } from "./CalendarLegend";

export const GitHubCalendar = ({ username = "rafidrahman1" }: { username?: string }) => {
  const [isDark, setIsDark] = useState(false);
  const [animatedCells, setAnimatedCells] = useState(0);
  const prevAnimatedCells = useRef(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { data: contributions, isLoading, error } = useQuery({
    queryKey: ['github-contributions', username],
    queryFn: () => fetchGitHubContributions(username),
    staleTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Arrange contributions into columns (weeks)
  const weeks: ContributionDay[][] = [];
  if (contributions) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
  }

  // Animate cells column by column (Tetris style)
  useEffect(() => {
    if (!contributions) return;
    setAnimatedCells(0);
    let totalCells = contributions.length;
    let col = 0;
    const maxCols = weeks.length;
    const maxRows = 7;
    function animateColumn() {
      for (let row = 0; row < maxRows; row++) {
        const cellIndex = col * 7 + row;
        if (cellIndex < totalCells) {
          setTimeout(() => {
            setAnimatedCells(prev => Math.max(prev, cellIndex + 1));
          }, row * 30);
        }
      }
      col++;
      if (col < maxCols) {
        setTimeout(animateColumn, 60);
      }
    }
    animateColumn();
    return () => setAnimatedCells(totalCells);
  }, [contributions]);

  useEffect(() => {
    if (contributions && animatedCells >= contributions.length && prevAnimatedCells.current < contributions.length) {
      setTimeout(() => setShowStats(true), 200);
    }
    prevAnimatedCells.current = animatedCells;
  }, [animatedCells, contributions]);

  // Legend fade-in thresholds
  const legendSteps = 5;
  const legendThresholds = Array.from({ length: legendSteps }, (_, i) =>
      Math.floor((contributions?.length || 365) * ((i + 1) / legendSteps))
  );

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-4 bg-card/50 backdrop-blur-sm rounded-lg border-gray-300 dark:border-gray-700 min-h-56">
            <div className="w-full max-w-4xl mx-auto p-4">
                <h3 className="text-lg font-semibold mb-2 text-center">GitHub Contributions</h3>
                <div className="grid grid-flow-col gap-1 min-w-fit mx-auto opacity-50"
                     style={{
                       gridTemplateRows: 'repeat(7, 1fr)',
                       minWidth: '212px'
                }}>
                    {Array.from({ length: 53 }).map((_, weekIdx) =>
                        Array.from({ length: 7 }).map((_, dayIdx) => (
                            <div key={`${weekIdx}-${dayIdx}`} className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-sm border border-gray-400 dark:border-gray-700 animate-pulse" />
                        ))
                    )}
                </div>
            </div>
            </div>
        );
    }

  if (error) {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-card/50 backdrop-blur-sm rounded-lg border-gray-300 dark:border-gray-700 min-h-56">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">GitHub Contributions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Unable to load contribution data for @{username}
            </p>
            <div className="grid grid-flow-col gap-1 min-w-fit mx-auto opacity-50" style={{ gridTemplateRows: 'repeat(7, 1fr)', minWidth: '212px' }}>
              {Array.from({ length: 53 }).map((_, weekIdx) =>
                  Array.from({ length: 7 }).map((_, dayIdx) => {
                    const cellIndex = weekIdx * 7 + dayIdx;
                    if (cellIndex >= 365) return null;
                    return (
                        <div key={`${weekIdx}-${dayIdx}`} className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-sm border border-gray-400 dark:border-gray-700 transition-all duration-500 opacity-50" />
                    );
                  })
              )}
            </div>
          </div>
        </div>
        </div>
    );
  }

  if (!contributions) return null;

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center min-h-[2.5em] flex items-center justify-center">
            {!showStats ? (
                <p className="text-lg font-semibold mb-2 text-center animate-fade-in">GitHub Contributions</p>
            ) : (
                <p className="text-sm text-muted-foreground animate-fade-in-up">{totalContributions} contributions in the last year</p>
            )}
          </div>

          <div className="overflow-x-auto w-full scrollbar-hide">
            <div
                className="grid grid-flow-col gap-1 min-w-fit mx-auto"
                style={{
                  gridTemplateRows: 'repeat(7, 1fr)',
                  minWidth: '212px'
                }}
            >
              {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    const cellIndex = weekIndex * 7 + dayIndex;
                    if (cellIndex >= contributions.length) return null;
                    const isAnimated = cellIndex < animatedCells;
                    return (
                        <ContributionCell
                            key={`${weekIndex}-${dayIndex}`}
                            level={day.level}
                            isDark={isDark}
                            isAnimated={isAnimated}
                            count={day.count}
                            date={day.date}
                        />
                    );
                  })
              )}
            </div>
          </div>

          <CalendarLegend isDark={isDark} animatedCells={animatedCells} legendThresholds={legendThresholds} />
        </div>
      </div>
  );
};
