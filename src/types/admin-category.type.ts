export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    ideasCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface GetCategoriesParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'name' | 'ideasCount' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export interface CategoriesResponse {
    success: boolean;
    data?: {
        categories: Category[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface CreateCategoryData {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
}

export interface UpdateCategoryData {
    name?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
}

export interface CategoryResponse {
    success: boolean;
    data?: Category;
    message?: string;
}

export interface DeleteCategoryResponse {
    success: boolean;
    message: string;
    hasIdeas?: boolean;
    ideasCount?: number;
}

export interface CheckSlugResponse {
    success: boolean;
    data?: {
        available: boolean;
        suggestions?: string[];
    };
    message?: string;
}