'use server';

import { newsletterService } from '@/services/newsletter.service';
import { updateTag } from 'next/cache';

export const subscribeToNewsletter = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            success: false,
            message: 'Please enter a valid email address',
        };
    }

    const result = await newsletterService.subscribe(email);
    if (result.success) {
        updateTag('newsletter');
    }
    return result;
};