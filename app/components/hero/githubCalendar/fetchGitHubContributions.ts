export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
    date: string;
    count: number;
    level: ContributionLevel;
}

function calculateContributionLevel(count: number): ContributionLevel {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
}

function mapCalendarToContributions(calendar: any): ContributionDay[] {
    const contributions: ContributionDay[] = [];
    calendar.weeks.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
            const count = day.contributionCount;
            contributions.push({
                date: day.date,
                count,
                level: calculateContributionLevel(count)
            });
        });
    });
    return contributions;
}

async function fetchGraphQLContributions(username: string, githubToken: string): Promise<ContributionDay[] | null> {
    const graphqlQuery = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: { username }
        })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;
    return mapCalendarToContributions(calendar);
}

async function fetchPublicContributions(username: string): Promise<ContributionDay[]> {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!response.ok) throw new Error(`Failed to fetch contributions: ${response.status}`);
    const data = await response.json();
    const contributions: ContributionDay[] = data.contributions.map((day: any) => {
        const count = day.count;
        return {
            date: day.date,
            count,
            level: calculateContributionLevel(count)
        };
    });
    console.log('GitHub contributions fetched:', contributions.length, 'days');
    console.log('Sample contributions:', contributions.slice(0, 5));
    return contributions;
}

function generateMockContributions(): ContributionDay[] {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseActivity = isWeekend ? 0.3 : 0.7;
        const randomFactor = Math.random();
        const count = randomFactor < baseActivity ? Math.floor(Math.random() * 8) : 0;
        contributions.push({
            date: date.toISOString().split('T')[0],
            count,
            level: calculateContributionLevel(count)
        });
    }
    return contributions;
}

export const fetchGitHubContributions = async (username: string): Promise<ContributionDay[]> => {
    try {
        const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (githubToken) {
            const graphQlResult = await fetchGraphQLContributions(username, githubToken);
            if (graphQlResult) return graphQlResult;
        }

        // Fallback to public contributions API
        return await fetchPublicContributions(username);
    } catch (error) {
        // Fallback to mock data
        return generateMockContributions();
    }
};
