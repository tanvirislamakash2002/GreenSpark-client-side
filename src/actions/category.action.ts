"use server";

import { adminCategoryService } from "@/services/category.service";
import { GetCategoriesParams, CreateCategoryData, UpdateCategoryData } from "@/types/category.type";
import { updateTag } from "next/cache";

export const getCategories = async (params?: GetCategoriesParams) => {
    return await adminCategoryService.getCategories(params);
};

export const createCategory = async (data: CreateCategoryData) => {
    const result = await adminCategoryService.createCategory(data);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const updateCategory = async (id: string, data: UpdateCategoryData) => {
    const result = await adminCategoryService.updateCategory(id, data);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const deleteCategory = async (id: string) => {
    const result = await adminCategoryService.deleteCategory(id);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const checkSlug = async (slug: string, excludeId?: string) => {
    return await adminCategoryService.checkSlug(slug, excludeId);
};