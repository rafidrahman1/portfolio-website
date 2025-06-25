import React from "react";
import { getContributionColor } from "./getContributionColor";

interface Props {
    isDark: boolean;
    animatedCells: number;
    legendThresholds: number[];
}

export const CalendarLegend: React.FC<Props> = ({ isDark, animatedCells, legendThresholds }) => (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level, i) => (
                <div
                    key={level}
                    className={`
            w-3 h-3 rounded-sm ${getContributionColor(level, isDark)}
            transition-all duration-700
            ${animatedCells >= legendThresholds[i] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
                    style={{ transitionDelay: `${i * 80}ms` }}
                />
            ))}
        </div>
        <span>More</span>
    </div>
);
