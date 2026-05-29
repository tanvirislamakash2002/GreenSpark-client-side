"use server";

import { userManagementService } from "@/services/user-management.service";
import { updateTag } from "next/cache";
import { UserFilters } from "@/types/user.type";

export const getAllUsers = async (params?: UserFilters) => {
    return await userManagementService.getAllUsers(params);
};

export const getUserDetails = async (userId: string) => {
    return await userManagementService.getUserDetails(userId);
};

export const banUser = async (userId: string) => {
    const result = await userManagementService.banUser(userId);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const unbanUser = async (userId: string) => {
    const result = await userManagementService.unbanUser(userId);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const suspendUser = async (userId: string) => {
    const result = await userManagementService.suspendUser(userId);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const activateUser = async (userId: string) => {
    const result = await userManagementService.activateUser(userId);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const changeUserRole = async (userId: string, newRole: string) => {
    const result = await userManagementService.changeUserRole(userId, newRole);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const deleteUser = async (userId: string) => {
    const result = await userManagementService.deleteUser(userId);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const bulkAction = async (action: string, userIds: string[]) => {
    const result = await userManagementService.bulkAction(action, userIds);
    if (result.success) {
        updateTag("admin-users");
    }
    return result;
};

export const exportUsers = async (format: string = "csv", filters?: UserFilters) => {
    return await userManagementService.exportUsers(format, filters);
};