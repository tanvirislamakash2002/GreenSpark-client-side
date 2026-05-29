"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { memberProfileService } from "@/services/profile/member-profile.service";

export const getMemberProfile = async () => {
    return await memberProfileService.getProfile();
};

export const getMemberStats = async () => {
    return await memberProfileService.getStats();
};

export const getMemberActivity = async (limit: number = 10) => {
    return await memberProfileService.getActivity(limit);
};

export const updateMemberProfile = async (data: { name?: string; phone?: string; address?: string }) => {
    const result = await memberProfileService.updateProfile(data);
    if (result.success) {
        updateTag("member-profile");
        updateTag("member-stats");
    }
    return result;
};

export const changeMemberPassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    return await memberProfileService.changePassword(data);
};

export const updateNewsletterSubscription = async (isSubscribed: boolean) => {
    const result = await memberProfileService.updateNewsletter(isSubscribed);
    if (result.success) {
        updateTag("member-profile");
    }
    return result;
};

export const deleteMemberAccount = async () => {
    const result = await memberProfileService.deleteAccount();
    if (result.success) {
        redirect("/logout");
    }
    return result;
};