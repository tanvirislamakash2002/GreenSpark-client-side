import { env } from "@/env";
import { cookies } from "next/headers";
import { GetCategoriesParams, CategoriesResponse, CreateCategoryData, UpdateCategoryData, CategoryResponse, DeleteCategoryResponse, CheckSlugResponse } from "@/types/admin-category.type";

const API_URL = env.API_URL;

export const adminCategoryService = {
    getCategories: async (params?: GetCategoriesParams): Promise<CategoriesResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/categories`);
            
            if (params) {
                if (params.page) url.searchParams.set('page', params.page.toString());
                if (params.limit) url.searchParams.set('limit', params.limit.toString());
                if (params.search) url.searchParams.set('search', params.search);
                if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
                if (params.sortOrder) url.searchParams.set('sortOrder', params.sortOrder);
            }
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-categories"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch categories",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get categories error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    createCategory: async (data: CreateCategoryData): Promise<CategoryResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: response.message || "Failed to create category",
                };
            }

            return response;
        } catch (error) {
            console.error("Create category error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    updateCategory: async (id: string, data: UpdateCategoryData): Promise<CategoryResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: response.message || "Failed to update category",
                };
            }

            return response;
        } catch (error) {
            console.error("Update category error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    deleteCategory: async (id: string): Promise<DeleteCategoryResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to delete category",
                };
            }

            return data;
        } catch (error) {
            console.error("Delete category error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    checkSlug: async (slug: string, excludeId?: string): Promise<CheckSlugResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/categories/check-slug`);
            url.searchParams.set('slug', slug);
            if (excludeId) url.searchParams.set('excludeId', excludeId);
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to check slug",
                };
            }

            return data;
        } catch (error) {
            console.error("Check slug error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};