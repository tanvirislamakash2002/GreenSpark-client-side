import { env } from "@/env";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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