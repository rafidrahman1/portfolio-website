import React from "react";
import { getContributionColor, ContributionLevel } from "./getContributionColor";

interface Props {
    animatedCells: number;
    legendThresholds: number[];
}

export const CalendarLegend: React.FC<Props> = ({ animatedCells, legendThresholds }) => (
    <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-muted-foreground">
        <span className="text-xs">Less</span>
        <div className="flex space-x-0.5 sm:space-x-1">
            {[0, 1, 2, 3, 4].map((level, i) => (
                <div
                    key={level}
                    className={`
            w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${getContributionColor(level as ContributionLevel)}
            transition-all duration-700
            ${animatedCells >= legendThresholds[i] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
                    style={{ transitionDelay: `${i * 80}ms` }}
                />
            ))}
        </div>
        <span className="text-xs">More</span>
    </div>
);
