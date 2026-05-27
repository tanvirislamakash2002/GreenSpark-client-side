"use server";

import { categoryService } from "@/services/category.service";
import { GetCategoriesParams, CreateCategoryData, UpdateCategoryData } from "@/types/category.type";
import { updateTag } from "next/cache";

export const getCategories = async (params?: GetCategoriesParams) => {
    return await categoryService.getCategories(params);
};

export const getAllCategories = async () => {
    return await categoryService.getAllCategories();
};

// ✅ Add this function
export const getCategoryCounts = async () => {
    return await categoryService.getCategoryCounts();
};

export const createCategory = async (data: CreateCategoryData) => {
    const result = await categoryService.createCategory(data);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const updateCategory = async (id: string, data: UpdateCategoryData) => {
    const result = await categoryService.updateCategory(id, data);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const deleteCategory = async (id: string) => {
    const result = await categoryService.deleteCategory(id);
    if (result.success) {
        updateTag("categories");
    }
    return result;
};

export const checkSlug = async (slug: string, excludeId?: string) => {
    return await categoryService.checkSlug(slug, excludeId);
};