import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const memberProfileService = {
    getProfile: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/profile`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-profile"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message || "Failed to fetch profile" };
            }

            return { success: true, data: data.data };
        } catch (error) {
            console.error("Get member profile error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    getStats: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-stats"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message || "Failed to fetch stats" };
            }

            return { success: true, data: data.data };
        } catch (error) {
            console.error("Get member stats error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    getActivity: async (limit: number = 10) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/activity?limit=${limit}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["member-activity"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message || "Failed to fetch activity" };
            }

            return { success: true, data: data.data };
        } catch (error) {
            console.error("Get member activity error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    updateProfile: async (data: { name?: string; phone?: string; address?: string }) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (!res.ok) {
                return { success: false, message: response.message || "Failed to update profile" };
            }

            return { success: true, data: response.data, message: "Profile updated successfully" };
        } catch (error) {
            console.error("Update member profile error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    changePassword: async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (!res.ok) {
                return { success: false, message: response.message || "Failed to change password" };
            }

            return { success: true, message: "Password changed successfully" };
        } catch (error) {
            console.error("Change password error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    updateNewsletter: async (isSubscribed: boolean) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/newsletter`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ isSubscribed }),
            });

            const response = await res.json();

            if (!res.ok) {
                return { success: false, message: response.message || "Failed to update subscription" };
            }

            return { success: true, message: isSubscribed ? "Subscribed to newsletter" : "Unsubscribed from newsletter" };
        } catch (error) {
            console.error("Update newsletter error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    deleteAccount: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/members/account`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const response = await res.json();

            if (!res.ok) {
                return { success: false, message: response.message || "Failed to delete account" };
            }

            return { success: true, message: "Account deleted successfully" };
        } catch (error) {
            console.error("Delete account error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },
};