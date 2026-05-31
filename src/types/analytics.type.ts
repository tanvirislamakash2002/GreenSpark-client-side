export interface OverviewStats {
    totalUsers: number;
    activeUsers: number;
    totalIdeas: number;
    approvedIdeas: number;
    pendingIdeas: number;
    rejectedIdeas: number;
    totalVotes: number;
    totalComments: number;
    paidIdeasSold: number;
    totalRevenue: number;
    userGrowth: number;
    ideaGrowth: number;
    revenueGrowth: number;
}

export interface TimeSeriesData {
    labels: string[];
    users: number[];
    ideas: number[];
    votes: number[];
    revenue: number[];
}

export interface CategoryDistribution {
    name: string;
    count: number;
    percentage: number;
}

export interface StatusDistribution {
    status: string;
    count: number;
    color: string;
}

export interface TopContributor {
    userId: string;
    name: string;
    email: string;
    image: string | null;
    approvedIdeas: number;
    upvotesReceived: number;
    totalComments: number;
}

export interface TopIdea {
    id: string;
    title: string;
    voteScore: number;
    commentCount: number;
    viewCount: number;
    author: string;
}

export interface EngagementMetrics {
    voteToViewRatio: number;
    commentToViewRatio: number;
    approvalRate: number;
    conversionRate: number;
    userRetention7d: number;
    userRetention30d: number;
    avgResponseTime: number;
    pendingReports: number;
}

export interface TimeRange {
    start: Date;
    end: Date;
    label: string;
}

export interface AnalyticsResponse {
    success: boolean;
    data?: {
        overview: OverviewStats;
        timeSeries: TimeSeriesData;
        categoryDistribution: CategoryDistribution[];
        statusDistribution: StatusDistribution[];
        topContributors: TopContributor[];
        topIdeas: TopIdea[];
        engagement: EngagementMetrics;
    };
    message?: string;
}