import { env } from "@/env";
import { cookies } from "next/headers";
import { AnalyticsResponse, TimeRange } from "@/types/analytics.type";

const API_URL = env.API_URL;

export const adminAnalyticsService = {
    getAnalytics: async (range?: string): Promise<AnalyticsResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/analytics`);
            if (range) url.searchParams.set('range', range);

            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["admin-analytics"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch analytics",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get analytics error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    exportAnalytics: async (format: string = "csv", range?: string) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/analytics/export`);
            url.searchParams.set('format', format);
            if (range) url.searchParams.set('range', range);


            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });


            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to export data" };
            }

            // For CSV, get the text response
            const data = await res.text();

            return { success: true, data };
        } catch (error) {
            return { success: false, message: "Something went wrong" };
        }
    },
};