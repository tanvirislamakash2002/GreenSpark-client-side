"use server";

import { adminNewsletterService } from "@/services/newsletter/admin-newsletter.service";
import { SendNewsletterData } from "@/types/newsletter.type";
import { updateTag } from "next/cache";

export const getSubscribers = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
    return await adminNewsletterService.getSubscribers(params);
};

export const sendNewsletter = async (data: SendNewsletterData) => {
    const result = await adminNewsletterService.sendNewsletter(data);
    if (result.success) {
        updateTag("admin-newsletter");
        updateTag("newsletter-campaigns");
    }
    return result;
};

export const sendTestEmail = async (email: string, subject: string, content: string) => {
    return await adminNewsletterService.sendTestEmail(email, subject, content);
};

export const exportSubscribers = async (format: string = "csv") => {
    return await adminNewsletterService.exportSubscribers(format);
};

export const deleteSubscriber = async (subscriberId: string) => {
    const result = await adminNewsletterService.deleteSubscriber(subscriberId);
    if (result.success) {
        updateTag("admin-newsletter");
    }
    return result;
};

export const getCampaigns = async () => {
    return await adminNewsletterService.getCampaigns();
};