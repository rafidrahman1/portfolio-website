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
  const gridContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (showStats && gridContainerRef.current) {
      gridContainerRef.current.scrollTo({
        left: gridContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [showStats]);

  // Legend fade-in thresholds
  const legendSteps = 5;
  const legendThresholds = Array.from({ length: legendSteps }, (_, i) =>
      Math.floor((contributions?.length || 365) * ((i + 1) / legendSteps))
  );

    if (isLoading) {
        // Create placeholder weeks array (same as loaded state)
        const placeholderDays = Array.from({ length: 365 }, (_, i) => ({
            level: 0,
            count: 0,
            date: '',
        }));
        const weeks = [];
        for (let i = 0; i < placeholderDays.length; i += 7) {
            weeks.push(placeholderDays.slice(i, i + 7));
        }
        return (
            <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-card/50 backdrop-blur-sm rounded-lg border-gray-300 dark:border-gray-700 min-h-[14rem]">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="text-center min-h-[2rem] sm:min-h-[2.5em] flex items-center justify-center">
                        <p className="text-base sm:text-lg font-semibold mb-2 text-center animate-fade-in">GitHub Contributions</p>
                    </div>
                    <div className="group w-full">
                        <div className="scrollbar-hover-show w-full" ref={gridContainerRef}>
                            <div
                                className="grid grid-flow-col gap-0.5 sm:gap-1 min-w-fit mx-auto"
                                style={{
                                    gridTemplateRows: 'repeat(7, 1fr)',
                                    minWidth: '180px'
                                }}
                            >
                                {weeks.map((week, weekIndex) =>
                                    week.map((_, dayIndex) => {
                                        const cellIndex = weekIndex * 7 + dayIndex;
                                        if (cellIndex >= placeholderDays.length) return null;
                                        return (
                                            <div
                                                key={`${weekIndex}-${dayIndex}`}
                                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 dark:bg-gray-600 rounded-sm border border-gray-400 dark:border-gray-700 animate-pulse"
                                                style={{
                                                    animationDelay: `${cellIndex * 0.025}s`,
                                                    animationDuration: '1.2s',
                                                }}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Optionally, show a placeholder legend for consistency */}
                    <div className="w-full flex justify-center mt-2">
                        <div className="flex space-x-2 opacity-60">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="w-6 h-3 rounded-sm bg-gray-300 dark:bg-gray-700 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  if (error) {
    return (
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-card/50 backdrop-blur-sm rounded-lg border-gray-300 dark:border-gray-700 min-h-48 sm:min-h-56">
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">GitHub Contributions</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Unable to load contribution data for @{username}
            </p>
            <div className="grid grid-flow-col gap-0.5 sm:gap-1 min-w-fit mx-auto opacity-50" style={{ gridTemplateRows: 'repeat(7, 1fr)', minWidth: '180px' }}>
              {Array.from({ length: 53 }).map((_, weekIdx) =>
                  Array.from({ length: 7 }).map((_, dayIdx) => {
                    const cellIndex = weekIdx * 7 + dayIdx;
                    if (cellIndex >= 365) return null;
                    return (
                        <div key={`${weekIdx}-${dayIdx}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-300 dark:bg-gray-600 rounded-sm border border-gray-400 dark:border-gray-700 transition-all duration-500 opacity-50" />
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
      <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="text-center min-h-[2rem] sm:min-h-[2.5em] flex items-center justify-center">
            {!showStats ? (
                <p className="text-base sm:text-lg font-semibold mb-2 text-center animate-fade-in">GitHub Contributions</p>
            ) : (
                <p className="text-xs sm:text-sm text-muted-foreground animate-fade-in-up">{totalContributions} contributions in the last year</p>
            )}
          </div>

          <div className="group w-full">
            <div className="scrollbar-hover-show w-full" ref={gridContainerRef}>
              <div
                  className="grid grid-flow-col gap-0.5 sm:gap-1 min-w-fit mx-auto"
                  style={{
                    gridTemplateRows: 'repeat(7, 1fr)',
                    minWidth: '180px'
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
          </div>

          <CalendarLegend isDark={isDark} animatedCells={animatedCells} legendThresholds={legendThresholds} />
        </div>
      </div>
  );
};
