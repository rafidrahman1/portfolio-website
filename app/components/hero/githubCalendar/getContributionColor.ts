// components/githubCalendar/getContributionColor.ts

// Color level type
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

// Dark theme colors (always used since we only support dark mode)
export const getContributionColor = (level: ContributionLevel): string => {
    switch (level) {
        case 0: return 'bg-white/10';
        case 1: return 'bg-[#2c3b14]';
        case 2: return 'bg-[#587a1e]';
        case 3: return 'bg-[#8fc13f]';
        case 4: return 'bg-[#C5F467]';
        default: return 'bg-white/10';
    }
};

// Object-based approach for consistency
export const contributionColors = {
    0: 'bg-white/10',
    1: 'bg-[#2c3b14]',
    2: 'bg-[#587a1e]',
    3: 'bg-[#8fc13f]',
    4: 'bg-[#C5F467]',
} as const;
