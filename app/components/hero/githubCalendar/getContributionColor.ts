// components/githubCalendar/getContributionColor.ts

// Theme type for better type safety
export type Theme = 'dark' | 'light';

// Color level type
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

// Dark theme colors
export const getDarkContributionColor = (level: ContributionLevel): string => {
    switch (level) {
        case 0: return 'bg-gray-800';
        case 1: return 'bg-green-900';
        case 2: return 'bg-green-700';
        case 3: return 'bg-green-500';
        case 4: return 'bg-green-300';
        default: return 'bg-gray-800';
    }
};

// Light theme colors
export const getLightContributionColor = (level: ContributionLevel): string => {
    switch (level) {
        case 0: return 'bg-gray-200';
        case 1: return 'bg-green-200';
        case 2: return 'bg-green-400';
        case 3: return 'bg-green-600';
        case 4: return 'bg-green-800';
        default: return 'bg-gray-200';
    }
};

// Theme-based color getter
export const getContributionColorByTheme = (level: ContributionLevel, theme: Theme): string => {
    return theme === 'dark' 
        ? getDarkContributionColor(level)
        : getLightContributionColor(level);
};

// Legacy function for backward compatibility
export const getContributionColor = (level: number, isDark: boolean): string => {
    const theme: Theme = isDark ? 'dark' : 'light';
    return getContributionColorByTheme(level as ContributionLevel, theme);
};

// Alternative: Object-based approach
export const contributionColors = {
    dark: {
        0: 'bg-gray-800',
        1: 'bg-green-900',
        2: 'bg-green-700',
        3: 'bg-green-500',
        4: 'bg-green-300',
    },
    light: {
        0: 'bg-gray-200',
        1: 'bg-green-200',
        2: 'bg-green-400',
        3: 'bg-green-600',
        4: 'bg-green-800',
    }
} as const;

// Object-based color getter
export const getContributionColorFromObject = (level: ContributionLevel, theme: Theme): string => {
    return contributionColors[theme][level] || contributionColors[theme][0];
};
