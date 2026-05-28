"use server";

import { adminIdeaService } from "@/services/idea/admin-idea.service";
import { GetAdminIdeasParams } from "@/types/idea/admin-idea.type";
import { updateTag } from "next/cache";

export const getAdminIdeas = async (params?: GetAdminIdeasParams) => {
    return await adminIdeaService.getAdminIdeas(params);
};

export const approveIdea = async (ideaId: string) => {
    const result = await adminIdeaService.approveIdea(ideaId);
    if (result.success) {
        updateTag("admin-ideas");
        updateTag("ideas");
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

export const rejectIdea = async (ideaId: string, feedback: string) => {
    const result = await adminIdeaService.rejectIdea(ideaId, feedback);
    if (result.success) {
        updateTag("admin-ideas");
        updateTag("ideas");
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

export const deleteIdea = async (ideaId: string) => {
    console.log('----------', ideaId);
    const result = await adminIdeaService.deleteIdea(ideaId);
    if (result.success) {
        updateTag("admin-ideas");
        updateTag("ideas");
    }
    return result;
};