import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL ;

export const bookmarkService = {
    addBookmark: async (ideaId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/bookmarks/${ideaId}`, {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Add bookmark error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    getUserBookmarks: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        sortBy?: string;
    }) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/bookmarks`);

            if (params) {
                if (params.page) url.searchParams.set('page', params.page.toString());
                if (params.limit) url.searchParams.set('limit', params.limit.toString());
                if (params.search) url.searchParams.set('search', params.search);
                if (params.category) url.searchParams.set('category', params.category);
                if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
            }

            const res = await fetch(url.toString(), {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["user-bookmarks"] },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Get user bookmarks error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    removeBookmark: async (ideaId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/bookmarks/${ideaId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Remove bookmark error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    checkBookmark: async (ideaId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/bookmarks/check/${ideaId}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Check bookmark error:", error);
            return { success: false, data: { isBookmarked: false } };
        }
    },

};