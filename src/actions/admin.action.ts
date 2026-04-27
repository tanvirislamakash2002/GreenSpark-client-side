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

export const approveIdea = async (ideaId: string) => {
    // This will be implemented with actual API call
    updateTag("admin-dashboard");
    updateTag("admin-pending-ideas");
    return { success: true, message: "Idea approved successfully" };
};

export const rejectIdea = async (ideaId: string, feedback: string) => {
    // This will be implemented with actual API call
    updateTag("admin-dashboard");
    updateTag("admin-pending-ideas");
    return { success: true, message: "Idea rejected with feedback" };
};

export const revalidateAdminDashboard = async () => {
    updateTag("admin-dashboard");
    updateTag("admin-stats");
    updateTag("admin-pending-ideas");
    updateTag("admin-activity");
};