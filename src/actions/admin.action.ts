"use server";

import { adminService } from "@/services/admin.service";
import { updateTag } from "next/cache";

export const getAdminDashboardData = async () => {
    return await adminService.getDashboardData();
};

export const getAdminStats = async () => {
    return await adminService.getStats();
};

export const getPendingIdeas = async (limit: number = 10) => {
    return await adminService.getPendingIdeas(limit);
};

export const getRecentActivity = async (limit: number = 10) => {
    return await adminService.getRecentActivity(limit);
};

export const revalidateAdminDashboard = async () => {
    updateTag("admin-dashboard");
    updateTag("admin-stats");
    updateTag("admin-pending-ideas");
    updateTag("admin-activity");
};