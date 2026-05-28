'use server';

import { voteService } from "@/services/vote.service";
import { updateTag } from "next/cache";

export const castVote = async (ideaId: string, voteType: 'UP' | 'DOWN') => {
    const result = await voteService.castVote(ideaId, voteType);
    if (result.success) {
        updateTag("ideas");
        updateTag(`idea-${ideaId}`);
        updateTag("top-voted-ideas");
        updateTag("featured-ideas");
    }
    return result;
};

export const removeVote = async (ideaId: string) => {
    const result = await voteService.removeVote(ideaId);
    if (result.success) {
        updateTag("ideas");
        updateTag(`idea-${ideaId}`);
        updateTag("top-voted-ideas");
        updateTag("featured-ideas");
    }
    return result;
};

export const getUserVote = async (ideaId: string) => {
    return await voteService.getUserVote(ideaId);
};