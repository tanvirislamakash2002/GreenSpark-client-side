'use server';

import { ideaService } from '@/services/idea.service';
import { GetIdeasParams } from '@/types/idea.type';
import { updateTag } from 'next/cache';

export const getIdeas = async (params?: GetIdeasParams) => {
    return await ideaService.getIdeas(params);
};

export const getIdeaById = async (id: string) => {
    return await ideaService.getIdeaById(id);
};

// For future use when you have real API
export const voteIdea = async (ideaId: string, voteType: 'UP' | 'DOWN') => {
    // This will be implemented when backend is ready
    updateTag('ideas');
    return { success: true, message: 'Vote recorded' };
};

export const bookmarkIdea = async (ideaId: string) => {
    // This will be implemented when backend is ready
    updateTag('ideas');
    return { success: true, message: 'Bookmark added' };
};