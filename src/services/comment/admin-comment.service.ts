import { env } from "@/env";
import { cookies } from "next/headers";
import { AdminCommentsResponse, AdminCommentFilters } from "@/types/comment/admin-comment.type";

const API_URL = env.API_URL;

export const adminCommentService = {
    getComments: async (params?: AdminCommentFilters): Promise<AdminCommentsResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/comments/admin/comments`);
            
            if (params?.search) url.searchParams.set('search', params.search);
            if (params?.status && params.status !== 'all') url.searchParams.set('status', params.status);
            if (params?.reportStatus && params.reportStatus !== 'all') url.searchParams.set('reportStatus', params.reportStatus);
            if (params?.sortBy) url.searchParams.set('sortBy', params.sortBy);
            if (params?.page) url.searchParams.set('page', params.page.toString());
            if (params?.limit) url.searchParams.set('limit', params.limit.toString());
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-comments"] },
            });

            const data = await res.json();
            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch comments",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get admin comments error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getCommentReports: async (commentId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/admin/comments/${commentId}/reports`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Get comment reports error:", error);
            return { success: false, message: "Failed to fetch reports" };
        }
    },

    deleteComment: async (commentId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/admin/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Delete comment error:", error);
            return { success: false, message: "Failed to delete comment" };
        }
    },

    restoreComment: async (commentId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/admin/comments/${commentId}/restore`, {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Restore comment error:", error);
            return { success: false, message: "Failed to restore comment" };
        }
    },

    resolveReports: async (commentId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/admin/comments/${commentId}/resolve`, {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Resolve reports error:", error);
            return { success: false, message: "Failed to resolve reports" };
        }
    },

    bulkAction: async (action: string, commentIds: string[]) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/admin/comments/bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ action, commentIds }),
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Bulk action error:", error);
            return { success: false, message: "Failed to perform bulk action" };
        }
    },
};