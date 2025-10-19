// components/githubCalendar/getContributionColor.ts

// Color level type
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

// Dark theme colors (always used since we only support dark mode)
export const getContributionColor = (level: ContributionLevel): string => {
    switch (level) {
        case 0: return 'bg-gray-800';
        case 1: return 'bg-green-900';
        case 2: return 'bg-green-700';
        case 3: return 'bg-green-500';
        case 4: return 'bg-green-300';
        default: return 'bg-gray-800';
    }
};

// Object-based approach for consistency
export const contributionColors = {
    0: 'bg-gray-800',
    1: 'bg-green-900',
    2: 'bg-green-700',
    3: 'bg-green-500',
    4: 'bg-green-300',
} as const;
