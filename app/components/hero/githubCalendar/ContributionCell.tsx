import React from "react";
import { getContributionColor, ContributionLevel } from "./getContributionColor";

interface Props {
    level: number;
    isAnimated: boolean;
    count: number;
    date: string;
}

export const ContributionCell: React.FC<Props> = ({ level, isAnimated, count, date }) => {
    // Debug logging for first few cells
    if (count > 0) {
        console.log('ContributionCell:', { level, isAnimated, count, date });
    }
    
    return (
        <div
            className={
            `w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border border-gray-700 transition-all duration-500
          ${isAnimated
                ? `${getContributionColor(level as ContributionLevel)} opacity-100 animate-tetris-drop`
                : 'bg-transparent opacity-30 invisible'
            }
        `}
            style={{
                transitionProperty: 'background-color, border-color, opacity, transform',
                transitionDuration: isAnimated ? '400ms' : '300ms',
                transitionTimingFunction: 'cubic-bezier(.68,-0.55,.27,1.55)',
            }}
            title={isAnimated ? `${count} contributions on ${new Date(date).toLocaleDateString()}` : undefined}
        />
    );
};
