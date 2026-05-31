export interface AdminComment {
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
    idea: {
        id: string;
        title: string;
        slug: string;
    };
    reportCount: number;
    reports?: CommentReport[];
}

export interface CommentReport {
    id: string;
    reason: string;
    status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
    createdAt: string;
    reporter: {
        id: string;
        name: string;
        email: string;
        image: string;
    };
}

export interface AdminCommentsResponse {
    success: boolean;
    data?: {
        comments: AdminComment[];
        stats: {
            totalComments: number;
            reportedComments: number;
            resolvedReports: number;
            deletedComments: number;
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

export interface AdminCommentFilters {
    search?: string;
    status?: 'all' | 'reported' | 'deleted';
    reportStatus?: 'PENDING' | 'RESOLVED' | 'DISMISSED' | 'all';
    sortBy?: 'newest' | 'oldest' | 'mostReported';
    page?: number;
    limit?: number;
}