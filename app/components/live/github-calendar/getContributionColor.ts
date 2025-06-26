// components/github-calendar/getContributionColor.ts
export const getContributionColor = (level: number, isDark: boolean) => {
    if (isDark) {
        switch (level) {
            case 0: return 'bg-gray-800';
            case 1: return 'bg-green-900';
            case 2: return 'bg-green-700';
            case 3: return 'bg-green-500';
            case 4: return 'bg-green-300';
            default: return 'bg-gray-800';
        }
    } else {
        switch (level) {
            case 0: return 'bg-gray-200';
            case 1: return 'bg-green-200';
            case 2: return 'bg-green-400';
            case 3: return 'bg-green-600';
            case 4: return 'bg-green-800';
            default: return 'bg-gray-200';
        }
    }
};
