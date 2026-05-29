export interface Bookmark {
    id: string;
    ideaId: string;
    ideaTitle: string;
    ideaDescription: string;
    ideaImage: string | null;
    ideaStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    ideaVoteScore: number;
    ideaViewCount: number;
    ideaCommentCount: number;
    authorName: string;
    authorImage: string | null;
    categoryName: string;
    categorySlug: string;
    bookmarkedAt: string;
}

export interface GetBookmarksParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: 'recent' | 'oldest' | 'votes' | 'views' | 'title';
}

export interface BookmarksResponse {
    success: boolean;
    data?: {
        bookmarks: Bookmark[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface RemoveBookmarkResponse {
    success: boolean;
    message: string;
}

export interface CheckBookmarkResponse {
    success: boolean;
    data?: {
        isBookmarked: boolean;
    };
    message?: string;
}