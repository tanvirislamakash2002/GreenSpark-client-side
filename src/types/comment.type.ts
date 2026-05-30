export interface Comment {
    id: string;
    content: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    replies: Comment[];
    replyCount: number;
    parentId: string | null;
}

export interface CommentsResponse {
    success: boolean;
    data?: {
        comments: Comment[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface CreateCommentData {
    content: string;
    parentId?: string | null;
}

export interface UserComment {
    id: string;
    content: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    idea: {
        id: string;
        title: string;
        imageUrl: string | null;
        voteScore: number;
    };
    replyCount: number;
    upvoteCount?: number;
}

export interface UserCommentsResponse {
    success: boolean;
    data?: {
        comments: UserComment[];
        stats: {
            totalComments: number;
            mostActiveIdea: string | null;
            lastCommentDate: string | null;
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

export interface CommentFilters {
    search?: string;
    sortBy?: 'newest' | 'oldest' | 'mostVoted';
    dateRange?: 'week' | 'month' | 'all';
    page?: number;
    limit?: number;
}