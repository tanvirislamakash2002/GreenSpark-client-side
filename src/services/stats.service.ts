import { env } from "@/env";

const API_URL = env.API_URL ;

export const statsService = {
    getPlatformStats: async () => {
        try {
            const res = await fetch(`${API_URL}/stats/platform`, {
                next: { tags: ["platform-stats"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch platform stats",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get platform stats error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};