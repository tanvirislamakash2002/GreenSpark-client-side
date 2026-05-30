"use server";

import { commentService } from "@/services/comment.service";
import { CreateCommentData } from "@/types/comment.type";
import { updateTag } from "next/cache";

export const getComments = async (ideaId: string, page: number = 1, limit: number = 10) => {
    return await commentService.getComments(ideaId, page, limit);
};

export const getUserComments = async (params?: {
    search?: string;
    sortBy?: string;
    dateRange?: string;
    page?: number;
    limit?: number;
}) => {
    return await commentService.getUserComments(params);
};

export const createComment = async (ideaId: string, data: CreateCommentData) => {
    const result = await commentService.createComment(ideaId, data);
    if (result.success) {
        updateTag(`comments-${ideaId}`);
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

export const updateComment = async (commentId: string, content: string) => {
    const result = await commentService.updateComment(commentId, content);
    if (result.success) {
        updateTag(`comments-${result.data?.ideaId}`);
    }
    return result;
};

export const deleteComment = async (commentId: string) => {
    const result = await commentService.deleteComment(commentId);
    if (result.success) {
        updateTag(`comments-${result.data?.ideaId}`);
        updateTag(`idea-${result.data?.ideaId}`);
    }
    return result;
};

export const reportComment = async (commentId: string, reason: string) => {
    return await commentService.reportComment(commentId, reason);
};