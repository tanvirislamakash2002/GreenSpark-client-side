import { env } from "@/env";
import { cookies } from "next/headers";
import { DashboardData, MemberStats, MemberIdea, MemberActivity, MemberBookmark, MemberVote } from "@/types/member.type";

const API_URL = env.API_URL ;

export const memberService = {
    getDashboardData: async (): Promise<{ success: boolean; data?: DashboardData; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/member/dashboard`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-dashboard"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch dashboard data",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get dashboard data error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getMemberStats: async (): Promise<{ success: boolean; data?: MemberStats; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/member/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-stats"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch stats",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get member stats error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getRecentIdeas: async (limit: number = 5): Promise<{ success: boolean; data?: MemberIdea[]; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/member/ideas/recent?limit=${limit}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-recent-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch recent ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get recent ideas error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};