import { env } from "@/env";
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
};