import { env } from "@/env";
import { cookies } from "next/headers";
import { SubscribersResponse, Campaign, SendNewsletterData } from "@/types/newsletter.type";

const API_URL = env.API_URL;

export const adminNewsletterService = {
    getSubscribers: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<SubscribersResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/newsletter/subscribers`);
            
            if (params?.page) url.searchParams.set('page', params.page.toString());
            if (params?.limit) url.searchParams.set('limit', params.limit.toString());
            if (params?.search) url.searchParams.set('search', params.search);
            if (params?.status && params.status !== 'all') url.searchParams.set('status', params.status);
            
            const res = await fetch(url.toString(), {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-newsletter"] },
            });

            const data = await res.json();
            if (!res.ok) {
                return { success: false, message: data.message || "Failed to fetch subscribers" };
            }

            return { success: true, data: data.data };
        } catch (error) {
            console.error("Get subscribers error:", error);
            return { success: false, message: "Something went wrong" };
        }
    },

    sendNewsletter: async (data: SendNewsletterData) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/newsletter/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Send newsletter error:", error);
            return { success: false, message: "Failed to send newsletter" };
        }
    },

    sendTestEmail: async (email: string, subject: string, content: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/newsletter/test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ email, subject, content }),
            });

            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Send test email error:", error);
            return { success: false, message: "Failed to send test email" };
        }
    },

    exportSubscribers: async (format: string = "csv") => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/newsletter/export?format=${format}`, {
                headers: { Cookie: cookieStore.toString() },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Export subscribers error:", error);
            return { success: false, message: "Failed to export subscribers" };
        }
    },

    deleteSubscriber: async (subscriberId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/newsletter/subscribers/${subscriberId}`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Delete subscriber error:", error);
            return { success: false, message: "Failed to delete subscriber" };
        }
    },

    getCampaigns: async (): Promise<{ success: boolean; data?: Campaign[]; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/newsletter/campaigns`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["newsletter-campaigns"] },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Get campaigns error:", error);
            return { success: false, message: "Failed to fetch campaigns" };
        }
    },
};