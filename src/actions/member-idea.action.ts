"use server";

import { memberIdeaService } from "@/services/member-idea.service";
import { GetMemberIdeasParams } from "@/types/member-idea.type";
import { updateTag } from "next/cache";

export const getMemberIdeas = async (params?: GetMemberIdeasParams) => {
    return await memberIdeaService.getMemberIdeas(params);
};

export const deleteIdea = async (ideaId: string) => {
    const result = await memberIdeaService.deleteIdea(ideaId);
    if (result.success) {
        updateTag("member-ideas");
    }
    return result;
};

export const submitIdea = async (ideaId: string) => {
    const result = await memberIdeaService.submitIdea(ideaId);
    if (result.success) {
        updateTag("member-ideas");
    }
    return result;
};