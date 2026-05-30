'use server';

import { updateTag } from 'next/cache';
import { ideaService } from '@/services/idea/idea.service';
import { GetIdeasParams } from '@/types/idea/idea.type';
import { cookies } from 'next/headers';

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
    
    // Get cookies from the incoming request (for server-side)
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    
    return await ideaService.getIdeaById(id, cookieHeader);
};

export const getFeaturedIdeas = async (limit?: number) => {
    return await ideaService.getFeaturedIdeas(limit);
};

export const getTopVotedIdeas = async (limit?: number) => {
    return await ideaService.getTopVotedIdeas(limit);
};

