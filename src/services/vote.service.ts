import { env } from "@/env";
import { UserVotesResponse } from "@/types/vote.type";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const voteService = {
    castVote: async (ideaId: string, voteType: 'UP' | 'DOWN') => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/votes/${ideaId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ voteType }),
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Cast vote error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    removeVote: async (ideaId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/votes/${ideaId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Remove vote error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    getUserVote: async (ideaId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/votes/${ideaId}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Get user vote error:", error);
            return { success: false, data: { userVote: null } };
        }
    },
    getUserVotes: async (params?: {
        voteType?: string;
        sortBy?: string;
        search?: string;
        category?: string;
        page?: number;
        limit?: number;
    }): Promise<UserVotesResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/votes/user/votes`);

            if (params?.voteType && params.voteType !== 'all') {
                url.searchParams.set('voteType', params.voteType);
            }
            if (params?.sortBy) url.searchParams.set('sortBy', params.sortBy);
            if (params?.search) url.searchParams.set('search', params.search);
            if (params?.category) url.searchParams.set('category', params.category);
            if (params?.page) url.searchParams.set('page', params.page.toString());
            if (params?.limit) url.searchParams.set('limit', params.limit.toString());

            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["user-votes"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch votes",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get user votes error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    }
};