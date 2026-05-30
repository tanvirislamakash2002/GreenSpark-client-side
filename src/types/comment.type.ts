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