export interface MemberProfile {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
    address: string | null;
    role: string;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface MemberStats {
    totalIdeas: number;
    draftIdeas: number;
    pendingIdeas: number;
    approvedIdeas: number;
    rejectedIdeas: number;
    totalUpvotesReceived: number;
    totalComments: number;
    totalBookmarks: number;
    approvalRate: number;
}

export interface MemberActivity {
    id: string;
    type: 'SUBMIT_IDEA' | 'APPROVE_IDEA' | 'REJECT_IDEA' | 'NEW_COMMENT' | 'VOTE';
    message: string;
    ideaId?: string;
    ideaTitle?: string;
    createdAt: string;
}