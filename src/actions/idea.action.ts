'use server';

import { updateTag } from 'next/cache';
import { ideaService } from '@/services/idea.service';
import { GetIdeasParams } from '@/types/idea.type';

export const getIdeas = async (params?: GetIdeasParams) => {
    return await ideaService.getIdeas(params);
};

export const getIdeaById = async (id: string) => {
    return await ideaService.getIdeaById(id);
};

// Vote on an idea
export const voteIdea = async (ideaId: string, voteType: 'UP' | 'DOWN') => {
    // This will be implemented when backend is ready
    // After successful API call:
    updateTag('ideas');           // Revalidate public ideas list
    updateTag(`idea-${ideaId}`);  // Revalidate single idea page
    return { success: true, message: 'Vote recorded' };
};

// Bookmark an idea
export const bookmarkIdea = async (ideaId: string) => {
    // This will be implemented when backend is ready
    // After successful API call:
    updateTag('ideas');           // Revalidate public ideas list
    updateTag(`idea-${ideaId}`);  // Revalidate single idea page
    return { success: true, message: 'Bookmark added' };
};