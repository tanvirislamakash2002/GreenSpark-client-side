import { env } from "@/env";
import { cookies } from "next/headers";
import { 
    GetAdminIdeasParams, 
    AdminIdeasResponse,
    ApproveIdeaResponse,
    RejectIdeaResponse,
    DeleteIdeaResponse
} from "@/types/idea/admin-idea.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const adminIdeaService = {
    getAdminIdeas: async (params?: GetAdminIdeasParams): Promise<AdminIdeasResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/ideas/admin/ideas`);
            
            if (params) {
                if (params.page) url.searchParams.set('page', params.page.toString());
                if (params.limit) url.searchParams.set('limit', params.limit.toString());
                if (params.search) url.searchParams.set('search', params.search);
                if (params.category) url.searchParams.set('category', params.category);
                if (params.status) url.searchParams.set('status', params.status);
                if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
            }
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get admin ideas error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    approveIdea: async (ideaId: string): Promise<ApproveIdeaResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/ideas/${ideaId}/approve`, {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to approve idea",
                };
            }

            return data;
        } catch (error) {
            console.error("Approve idea error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    rejectIdea: async (ideaId: string, feedback: string): Promise<RejectIdeaResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/ideas/${ideaId}/reject`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ feedback }),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to reject idea",
                };
            }

            return data;
        } catch (error) {
            console.error("Reject idea error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    deleteIdea: async (ideaId: string): Promise<DeleteIdeaResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/ideas/${ideaId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to delete idea",
                };
            }

            return data;
        } catch (error) {
            console.error("Delete idea error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};