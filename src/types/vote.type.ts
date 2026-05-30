export interface UserVote {
    id: string;
    voteType: "UP" | "DOWN";
    createdAt: string;
    idea: {
        id: string;
        title: string;
        description: string;
        imageUrl: string | null;
        voteScore: number;
        status: string;
        categories: {
            id: string;
            name: string;
            slug: string;
        }[];
        author: {
            id: string;
            name: string;
            image: string | null;
        };
    };
}

export interface UserVotesResponse {
    success: boolean;
    data?: {
        votes: UserVote[];
        stats: {
            totalVotes: number;
            upvotes: number;
            downvotes: number;
        };
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface VoteFilters {
    type?: "UP" | "DOWN" | "all";
    sortBy?: "newest" | "oldest" | "mostVoted" | "title";
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
}