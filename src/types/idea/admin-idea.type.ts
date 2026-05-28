export interface AdminIdea {
    id: string;
    title: string;
    problemStatement: string;
    solution: string;
    description: string;
    imageUrl: string | null;
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    isPaid: boolean;
    price: number | null;
    feedback: string | null;
    voteScore: number;
    viewCount: number;
    commentCount: number;
    author: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface AdminIdeasStats {
    total: number;
    draft: number;
    pending: number;
    approved: number;
    rejected: number;
}

export interface GetAdminIdeasParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    sortBy?: 'newest' | 'oldest' | 'votes' | 'views';
}

export interface AdminIdeasResponse {
    success: boolean;
    data?: {
        ideas: AdminIdea[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
        stats: AdminIdeasStats;
    };
    message?: string;
}

export interface ApproveIdeaResponse {
    success: boolean;
    message: string;
}

export interface RejectIdeaResponse {
    success: boolean;
    message: string;
}

export interface DeleteIdeaResponse {
    success: boolean;
    message: string;
}