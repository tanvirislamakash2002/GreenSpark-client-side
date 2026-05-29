'use server';

import { bookmarkService } from "@/services/bookmark.service";
import { updateTag } from "next/cache";

export const addBookmark = async (ideaId: string) => {
    const result = await bookmarkService.addBookmark(ideaId);
    if (result.success) {
        updateTag("user-bookmarks");
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

export const getUserBookmarks = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
}) => {
    return await bookmarkService.getUserBookmarks(params);
};

export const removeBookmark = async (ideaId: string) => {
    const result = await bookmarkService.removeBookmark(ideaId);
    if (result.success) {
        updateTag("user-bookmarks");
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

export const checkBookmark = async (ideaId: string) => {
    return await bookmarkService.checkBookmark(ideaId);
};

