export interface MemberStats {
    totalIdeas: number;
    draftIdeas: number;
    pendingIdeas: number;
    approvedIdeas: number;
    rejectedIdeas: number;
    totalVotes: number;
    totalComments: number;
    totalBookmarks: number;
    memberSince: string;
}

export interface MemberIdea {
    id: string;
    title: string;
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    voteScore: number;
    viewCount: number;
    commentCount: number;
    createdAt: string;
}

export interface MemberActivity {
    id: string;
    type: 'SUBMIT_IDEA' | 'VOTE' | 'COMMENT' | 'BOOKMARK';
    ideaId: string;
    ideaTitle: string;
    voteType?: 'UP' | 'DOWN';
    commentExcerpt?: string;
    createdAt: string;
}

export interface MemberBookmark {
    id: string;
    ideaId: string;
    ideaTitle: string;
    ideaImage: string | null;
    authorName: string;
    voteScore: number;
    bookmarkedAt: string;
}

export interface MemberVote {
    id: string;
    ideaId: string;
    ideaTitle: string;
    voteType: 'UP' | 'DOWN';
    voteScore: number;
    votedAt: string;
}

export interface DashboardData {
    stats: MemberStats;
    recentIdeas: MemberIdea[];
    recentActivity: MemberActivity[];
    recentBookmarks: MemberBookmark[];
    recentVotes: MemberVote[];
    pendingCount: number;
}