import { env } from "@/env";
import { cookies } from "next/headers";
import { AdminDashboardData, AdminStats, PendingIdea, ActivityItem, TopContributor, RecentUser, ChartData } from "@/types/admin.type";

const API_URL = env.API_URL;

export const adminService = {
    getDashboardData: async (): Promise<{ success: boolean; data?: AdminDashboardData; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/dashboard`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-dashboard"] },
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

    getStats: async (): Promise<{ success: boolean; data?: AdminStats; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-stats"] },
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
            console.error("Get admin stats error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getPendingIdeas: async (limit: number = 10): Promise<{ success: boolean; data?: PendingIdea[]; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/ideas/pending?limit=${limit}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-pending-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch pending ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get pending ideas error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getRecentActivity: async (limit: number = 10): Promise<{ success: boolean; data?: ActivityItem[]; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/activity/recent?limit=${limit}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-activity"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch recent activity",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get recent activity error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};