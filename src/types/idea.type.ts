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
    viewCount: number;
    voteScore: number;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
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
}

export interface GetIdeasParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: 'free' | 'paid';
    sortBy?: 'recent' | 'topVoted' | 'mostCommented' | 'mostViewed';
    sortOrder?: 'asc' | 'desc';
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