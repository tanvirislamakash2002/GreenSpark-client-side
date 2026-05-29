"use server";

import { updateTag } from "next/cache";
import { adminSettingsService } from "@/services/settings/admin-settings.service";
import { ActivityLogResponse, NotificationPreferences } from "@/types/settings/admin-settings.type";

export const getAdminProfile = async () => {
    return await adminSettingsService.getProfile();
};

export const updateAdminProfile = async (data: { name?: string; image?: string }) => {
    const result = await adminSettingsService.updateProfile(data);
    if (result.success) {
        updateTag("admin-profile");
    }
    return result;
};

export const changeAdminPassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    return await adminSettingsService.changePassword(data);
};

export const getNotificationPreferences = async () => {
    return await adminSettingsService.getNotificationPreferences();
};

export const updateNotificationPreferences = async (preferences: NotificationPreferences) => {
    const result = await adminSettingsService.updateNotificationPreferences(preferences);
    if (result.success) {
        updateTag("admin-notifications");
    }
    return result;
};

export const getAdminSessions = async () => {
    return await adminSettingsService.getSessions();
};

export const revokeAdminSession = async (sessionId: string) => {
    const result = await adminSettingsService.revokeSession(sessionId);
    if (result.success) {
        updateTag("admin-sessions");
    }
    return result;
};

export const revokeAllAdminSessions = async () => {
    const result = await adminSettingsService.revokeAllSessions();
    if (result.success) {
        updateTag("admin-sessions");
    }
    return result;
};

export const getAdminActivityLog = async (limit: number = 20): Promise<{ success: boolean; data?: ActivityLogResponse; message?: string }> => {
    return await adminSettingsService.getActivityLog(limit);
};

export const clearAdminCache = async () => {
    const result = await adminSettingsService.clearCache();
    if (result.success) {
        updateTag("admin-profile");
        updateTag("admin-notifications");
        updateTag("admin-sessions");
        updateTag("admin-activity");
        updateTag("admin-dashboard");
        updateTag("admin-stats");
        updateTag("admin-ideas");
    }
    return result;
};