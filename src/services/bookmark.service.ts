import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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

    getUserBookmarks: async (page: number = 1, limit: number = 10) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/bookmarks`);
            url.searchParams.set('page', page.toString());
            url.searchParams.set('limit', limit.toString());

            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["user-bookmarks"] },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Get user bookmarks error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },
};