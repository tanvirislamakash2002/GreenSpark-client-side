import { env } from "@/env";
import { cookies } from "next/headers";
import { CommentsResponse, CreateCommentData } from "@/types/comment.type";

const API_URL = env.API_URL;

export const commentService = {
    getComments: async (ideaId: string, page: number = 1, limit: number = 10): Promise<CommentsResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/comments/idea/${ideaId}`);
            url.searchParams.set('page', page.toString());
            url.searchParams.set('limit', limit.toString());
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: [`comments-${ideaId}`] },
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
            console.error("Get comments error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    createComment: async (ideaId: string, data: CreateCommentData) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/idea/${ideaId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Create comment error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    updateComment: async (commentId: string, content: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ content }),
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Update comment error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    deleteComment: async (commentId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Delete comment error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    reportComment: async (commentId: string, reason: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/comments/${commentId}/report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ reason }),
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Report comment error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },
};