export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    totalIdeas: number;
    pendingIdeas: number;
    approvedIdeas: number;
    rejectedIdeas: number;
    totalVotes: number;
    totalComments: number;
    totalBookmarks: number;
}

export interface PendingIdea {
    id: string;
    title: string;
    problemStatement: string;
    author: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    category: {
        id: string;
        name: string;
    };
    createdAt: string;
    voteScore: number;
}

export interface ActivityItem {
    id: string;
    type: 'SUBMIT_IDEA' | 'USER_REGISTER' | 'APPROVE_IDEA' | 'REJECT_IDEA' | 'NEW_COMMENT' | 'VOTE';
    message: string;
    userId?: string;
    userName?: string;
    ideaId?: string;
    ideaTitle?: string;
    createdAt: string;
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

export interface RecentUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    accountStatus: string;
    createdAt: string;
}

export interface ChartData {
    ideasOverTime: { date: string; count: number }[];
    usersOverTime: { date: string; count: number }[];
    ideasByCategory: { categoryId: string; categoryName: string; count: number }[];
    ideasByStatus: { status: string; count: number }[];
}

export interface AdminDashboardData {
    stats: AdminStats;
    pendingIdeas: PendingIdea[];
    recentActivity: ActivityItem[];
    topContributors: TopContributor[];
    recentUsers: RecentUser[];
    reportedCommentsCount: number;
    chartData: ChartData;
}