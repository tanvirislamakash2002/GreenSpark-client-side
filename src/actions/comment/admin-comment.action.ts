"use server";

import { adminCommentService } from "@/services/comment/admin-comment.service";
import { AdminCommentFilters } from "@/types/comment/admin-comment.type";
import { updateTag } from "next/cache";

export const getAdminComments = async (params?: AdminCommentFilters) => {
    return await adminCommentService.getComments(params);
};

export const getCommentReports = async (commentId: string) => {
    return await adminCommentService.getCommentReports(commentId);
};

export const deleteComment = async (commentId: string) => {
    const result = await adminCommentService.deleteComment(commentId);
    if (result.success) {
        updateTag("admin-comments");
    }
    return result;
};

export const restoreComment = async (commentId: string) => {
    const result = await adminCommentService.restoreComment(commentId);
    if (result.success) {
        updateTag("admin-comments");
    }
    return result;
};

export const resolveReports = async (commentId: string) => {
    const result = await adminCommentService.resolveReports(commentId);
    if (result.success) {
        updateTag("admin-comments");
    }
    return result;
};

export const bulkCommentAction = async (action: string, commentIds: string[]) => {
    const result = await adminCommentService.bulkAction(action, commentIds);
    if (result.success) {
        updateTag("admin-comments");
    }
    return result;
};