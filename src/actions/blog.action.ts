'use server';

import { blogService } from '@/services/blog.service';
import { GetBlogPostsParams } from '@/types/blog.type';
import { updateTag } from 'next/cache';

export const getBlogPosts = async (params?: GetBlogPostsParams) => {
    return await blogService.getBlogPosts(params);
};

export const getPopularPosts = async (limit?: number) => {
    return await blogService.getPopularPosts(limit);
};

export const getRecentPosts = async (limit?: number) => {
    return await blogService.getRecentPosts(limit);
};

export const getCategoryCounts = async () => {
    return await blogService.getCategoryCounts();
};

// For future use when subscribing to newsletter
export const subscribeToNewsletter = async (email: string) => {
    'use server';
    // This will be implemented when backend is ready
    updateTag('newsletter');
    return { success: true, message: 'Subscribed successfully!' };
};