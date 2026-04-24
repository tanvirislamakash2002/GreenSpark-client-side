export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string | null;
    category: BlogCategory;
    author: {
        name: string;
        avatar: string | null;
        bio?: string;
    };
    publishedAt: string;
    readTime: number;
    viewCount: number;
    tags: string[];
    isFeatured: boolean;
}

export type BlogCategory = 'all' | 'tips' | 'success-stories' | 'innovations' | 'news' | 'guest-posts';

export interface GetBlogPostsParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: BlogCategory;
}

export interface BlogPostsResponse {
    success: boolean;
    data?: {
        posts: BlogPost[];
        featuredPost?: BlogPost;
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface PopularPost {
    id: string;
    slug: string;
    title: string;
    viewCount: number;
}

export interface CategoryCount {
    name: string;
    slug: BlogCategory;
    count: number;
}