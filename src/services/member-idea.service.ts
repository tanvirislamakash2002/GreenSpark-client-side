import { env } from "@/env";
import { cookies } from "next/headers";
import { GetMemberIdeasParams, MemberIdeasResponse, DeleteIdeaResponse, SubmitIdeaResponse } from "@/types/member-idea.type";

const API_URL = env.API_URL;

export const memberIdeaService = {
    getMemberIdeas: async (params?: GetMemberIdeasParams): Promise<MemberIdeasResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/member/ideas`);
            
            if (params) {
                if (params.page) url.searchParams.set('page', params.page.toString());
                if (params.limit) url.searchParams.set('limit', params.limit.toString());
                if (params.search) url.searchParams.set('search', params.search);
                if (params.status && params.status !== 'all') url.searchParams.set('status', params.status);
                if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
            }
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-ideas"] },
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
            console.error("Get member ideas error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    deleteIdea: async (ideaId: string): Promise<DeleteIdeaResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/member/ideas/${ideaId}`, {
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

    submitIdea: async (ideaId: string): Promise<SubmitIdeaResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/member/ideas/${ideaId}/submit`, {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to submit idea",
                };
            }

            return data;
        } catch (error) {
            console.error("Submit idea error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};