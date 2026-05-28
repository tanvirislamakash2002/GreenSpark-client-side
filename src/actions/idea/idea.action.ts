'use server';

import { updateTag } from 'next/cache';
import { ideaService } from '@/services/idea/idea.service';
import { GetIdeasParams } from '@/types/idea/idea.type';

export const getIdeas = async (params?: GetIdeasParams) => {
    return await ideaService.getIdeas(params);
};

export const getIdeaById = async (id: string) => {
    if (!id) {
        return {
            success: false,
            message: 'Idea ID is required',
        };
    }
    return await ideaService.getIdeaById(id);
};

export const getFeaturedIdeas = async (limit?: number) => {
    return await ideaService.getFeaturedIdeas(limit);
};

export const getTopVotedIdeas = async (limit?: number) => {
    return await ideaService.getTopVotedIdeas(limit);
};

