"use server";

import { adminAnalyticsService } from "@/services/analytics.service";
import { updateTag } from "next/cache";

export const getAdminAnalytics = async (range?: string) => {
    return await adminAnalyticsService.getAnalytics(range);
};

export const exportAnalytics = async (format: string = "csv", range?: string) => {
    
    const result = await adminAnalyticsService.exportAnalytics(format, range);
    
    
    if (!result.success) {
        return { success: false, message: result.message };
    }
    
    // Return the data directly
    return result;
};

export const revalidateAnalytics = async () => {
    updateTag("admin-analytics");
};