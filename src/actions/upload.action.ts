"use server";

import { uploadService } from "@/services/upload.service";
import { updateTag } from "next/cache";

// Upload temp avatar (for registration - no auth required)
export const uploadTempAvatar = async (formData: FormData) => {
    const result = await uploadService.uploadPublic(formData, "avatar/temp");
    return result;
};

// Upload permanent avatar (authenticated users)
export const uploadAvatar = async (formData: FormData) => {
    const result = await uploadService.upload(formData, "avatar");
    if (result.success) {
        updateTag("profile");
        updateTag("user");
    }
    return result;
};

// Delete avatar
export const deleteAvatar = async () => {
    const result = await uploadService.deleteAvatar();
    if (result.success) {
        updateTag("profile");
        updateTag("user");
    }
    return result;
};

// Upload idea image
export const uploadIdeaImage = async (ideaId: string, formData: FormData) => {
    const result = await uploadService.upload(formData, `idea-image/${ideaId}`);
    if (result.success) {
        updateTag("idea");
        updateTag(`idea-${ideaId}`);
    }
    return result;
};

// Upload category image (admin only)
export const uploadCategoryImage = async (categoryId: string, formData: FormData) => {
    const result = await uploadService.upload(formData, `category-image/${categoryId}`);
    if (result.success) {
        updateTag("categories");
        updateTag(`category-${categoryId}`);
    }
    return result;
};