export interface MemberIdea {
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
    category: {
        id: string;
        name: string;
    };
    categories?: {
        id: string;
        name: string;
        slug: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface GetMemberIdeasParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'all';
    sortBy?: 'newest' | 'oldest' | 'title_asc' | 'title_desc' | 'votes';
}

export interface MemberIdeasResponse {
    success: boolean;
    data?: {
        ideas: MemberIdea[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
        stats: {
            total: number;
            draft: number;
            pending: number;
            approved: number;
            rejected: number;
        };
    };
    message?: string;
}

export interface CreateIdeaData {
    title: string;
    problemStatement: string;
    solution: string;
    description: string;
    imageUrl?: string;
    isPaid: boolean;
    price?: number;
    categoryId: string;
    status?: 'DRAFT' | 'PENDING';
}

export interface UpdateIdeaData {
    title?: string;
    problemStatement?: string;
    solution?: string;
    description?: string;
    imageUrl?: string;
    isPaid?: boolean;
    price?: number | null;
    categoryId?: string;
}

export interface CreateIdeaResponse {
    success: boolean;
    data?: MemberIdea;
    message?: string;
}

export interface UpdateIdeaResponse {
    success: boolean;
    data?: MemberIdea;
    message?: string;
}

export interface DeleteIdeaResponse {
    success: boolean;
    message: string;
}

export interface SubmitIdeaResponse {
    success: boolean;
    message: string;
}