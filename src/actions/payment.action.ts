"use server";

import { paymentService } from "@/services/payment.service";
import { CreatePaymentIntentData } from "@/types/payment.type";
import { updateTag } from "next/cache";

export const createPaymentIntent = async (data: CreatePaymentIntentData) => {
    return await paymentService.createPaymentIntent(data);
};

export const checkPaymentStatus = async (paymentId: string) => {
    return await paymentService.checkPaymentStatus(paymentId);
};

export const checkUserPaidForIdea = async (ideaId: string) => {
    const result = await paymentService.checkUserPaidForIdea(ideaId);
    if (result.success && result.data) {
        // Revalidate idea cache if user has paid
        if (result.data.hasPaid) {
            updateTag(`idea-${ideaId}`);
            updateTag("ideas");
        }
    }
    return result;
};

export const getUserPayments = async (page: number = 1, limit: number = 10) => {
    return await paymentService.getUserPayments(page, limit);
};