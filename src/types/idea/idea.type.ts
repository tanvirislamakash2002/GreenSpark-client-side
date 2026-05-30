export interface Idea {
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
        createdAt?: string;
    };
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
    createdAt: string;
    updatedAt: string;
    hasFullAccess?: boolean;
    requiresPayment?: boolean; 
}

export interface GetIdeasParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: 'free' | 'paid';
    sortBy?: 'recent' | 'topVoted' | 'mostCommented' | 'mostViewed';
}

export interface IdeasResponse {
    success: boolean;
    data?: {
        ideas: Idea[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface IdeaResponse {
    success: boolean;
    data?: Idea;
    message?: string;
}

export interface TopVotedIdeasResponse {
    success: boolean;
    data?: Idea[];
    message?: string;
}