import { env } from "@/env";
import { cookies } from "next/headers";
import { AdminProfile, AdminActivity, NotificationPreferences, Session, ActivityLogResponse } from "@/types/settings/admin-settings.type";

const API_URL = env.API_URL;

export const adminSettingsService = {
    getProfile: async (): Promise<{ success: boolean; data?: AdminProfile; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/profile`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-profile"] },
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            return { success: true, data: data.data };
        } catch (error) {
            return { success: false, message: "Failed to fetch profile" };
        }
    },

    updateProfile: async (data: { name?: string; image?: string }): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/profile`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "Profile updated successfully" };
        } catch (error) {
            return { success: false, message: "Failed to update profile" };
        }
    },

    changePassword: async (data: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "Password changed successfully" };
        } catch (error) {
            return { success: false, message: "Failed to change password" };
        }
    },

    getNotificationPreferences: async (): Promise<{ success: boolean; data?: NotificationPreferences; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/notifications`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-notifications"] },
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            return { success: true, data: data.data };
        } catch (error) {
            return { success: false, message: "Failed to fetch preferences" };
        }
    },

    updateNotificationPreferences: async (preferences: NotificationPreferences): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/notifications`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
                body: JSON.stringify(preferences),
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "Preferences updated" };
        } catch (error) {
            return { success: false, message: "Failed to update preferences" };
        }
    },

    getSessions: async (): Promise<{ success: boolean; data?: Session[]; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/sessions`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-sessions"] },
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            return { success: true, data: data.data };
        } catch (error) {
            return { success: false, message: "Failed to fetch sessions" };
        }
    },

    revokeSession: async (sessionId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/sessions/${sessionId}`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() },
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "Session revoked" };
        } catch (error) {
            return { success: false, message: "Failed to revoke session" };
        }
    },

    revokeAllSessions: async (): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/sessions`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() },
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "All other sessions revoked" };
        } catch (error) {
            return { success: false, message: "Failed to revoke sessions" };
        }
    },

    getActivityLog: async (limit: number = 20): Promise<{ success: boolean; data?: ActivityLogResponse; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/activity?limit=${limit}`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-activity"] },
            });
            const response = await res.json();

            if (!res.ok) return { success: false, message: response.message };

            // The backend already returns { activities: [], pagination: {} }
            return {
                success: true,
                data: response.data, // response.data already has the correct structure
            };
        } catch (error) {
            return { success: false, message: "Failed to fetch activity" };
        }
    },

    clearCache: async (): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/settings/clear-cache`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() },
            });
            const response = await res.json();
            if (!res.ok) return { success: false, message: response.message };
            return { success: true, message: "Cache cleared successfully" };
        } catch (error) {
            return { success: false, message: "Failed to clear cache" };
        }
    },
};