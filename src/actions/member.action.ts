"use server";

import { memberService } from "@/services/member.service";
import { updateTag } from "next/cache";

export const getDashboardData = async () => {
    return await memberService.getDashboardData();
};

export const getMemberStats = async () => {
    return await memberService.getMemberStats();
};

export const getRecentIdeas = async (limit: number = 5) => {
    return await memberService.getRecentIdeas(limit);
};

// For revalidating dashboard data after actions
export const revalidateDashboard = async () => {
    updateTag("member-dashboard");
    updateTag("member-stats");
    updateTag("member-recent-ideas");
};