'use server';

import { paymentService } from '@/services/payment.service';
import { CreatePaymentRequest } from '@/types/pricing.type';
import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createPayment = async (request: CreatePaymentRequest) => {
    const result = await paymentService.createPayment(request);

    if (result.success && result.data?.paymentUrl) {
        // In real app, store transaction in database
        updateTag('payment');
    }

    return result;
};

export const verifyPayment = async (transactionId: string) => {
    const result = await paymentService.verifyPayment(transactionId);
    updateTag('subscription');
    return result;
};

export const getSubscriptionStatus = async (userId: string) => {
    return await paymentService.getSubscriptionStatus(userId);
};

// For the pricing page to get session user
export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        // This would fetch user from session in real app
        // For now, return null (not logged in)
        return { success: true, data: null };
    } catch (error) {
        return { success: false, data: null };
    }
};