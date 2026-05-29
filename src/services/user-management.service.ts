import { env } from "@/env";
import { cookies } from "next/headers";
import { User, UserStats, UsersResponse, UserFilters } from "@/types/user.type";

const API_URL = env.API_URL;

export const userManagementService = {
    // Get all users with filters and pagination
    getAllUsers: async (params?: UserFilters): Promise<{ success: boolean; data?: UsersResponse; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/users`);
            
            if (params?.page) url.searchParams.append("page", params.page.toString());
            if (params?.limit) url.searchParams.append("limit", params.limit.toString());
            if (params?.search) url.searchParams.append("search", params.search);
            if (params?.role && params.role !== "all") url.searchParams.append("role", params.role);
            if (params?.status && params.status !== "all") url.searchParams.append("status", params.status);
            if (params?.verified && params.verified !== "all") url.searchParams.append("verified", params.verified);
            if (params?.sort) url.searchParams.append("sort", params.sort);
            
            const res = await fetch(url.toString(), {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: ["admin-users"] }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to fetch users"
                };
            }
            
            return { 
                success: true,
                data: data.data
            };
        } catch (error) {
            console.error("Get all users error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Get single user details
    getUserDetails: async (userId: string): Promise<{ success: boolean; data?: User; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}`, {
                headers: { Cookie: cookieStore.toString() },
                next: { tags: [`admin-user-${userId}`] }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to fetch user details"
                };
            }
            
            return { 
                success: true,
                data: data.data
            };
        } catch (error) {
            console.error("Get user details error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Ban user
    banUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}/ban`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to ban user"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User banned successfully"
            };
        } catch (error) {
            console.error("Ban user error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Unban user
    unbanUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}/unban`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to unban user"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User unbanned successfully"
            };
        } catch (error) {
            console.error("Unban user error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Suspend user
    suspendUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}/suspend`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to suspend user"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User suspended successfully"
            };
        } catch (error) {
            console.error("Suspend user error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Activate user (unsuspend)
    activateUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}/activate`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to activate user"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User activated successfully"
            };
        } catch (error) {
            console.error("Activate user error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Change user role
    changeUserRole: async (userId: string, newRole: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ role: newRole })
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to change user role"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User role changed successfully"
            };
        } catch (error) {
            console.error("Change user role error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Delete user
    deleteUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || "Failed to delete user"
                };
            }
            
            return { 
                success: true,
                message: data.message || "User deleted successfully"
            };
        } catch (error) {
            console.error("Delete user error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Bulk actions
    bulkAction: async (action: string, userIds: string[]): Promise<{ success: boolean; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ action, userIds })
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    success: false,
                    message: data.message || `Failed to ${action} users`
                };
            }
            
            return { 
                success: true,
                message: data.message || `${userIds.length} user(s) ${action}d successfully`
            };
        } catch (error) {
            console.error("Bulk action error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },

    // Export users
    exportUsers: async (format: string = "csv", filters?: UserFilters): Promise<{ success: boolean; data?: string; message?: string }> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/admin/users/export`);
            
            url.searchParams.append("format", format);
            if (filters?.search) url.searchParams.append("search", filters.search);
            if (filters?.role && filters.role !== "all") url.searchParams.append("role", filters.role);
            if (filters?.status && filters.status !== "all") url.searchParams.append("status", filters.status);
            if (filters?.verified && filters.verified !== "all") url.searchParams.append("verified", filters.verified);
            
            const res = await fetch(url.toString(), {
                headers: { Cookie: cookieStore.toString() }
            });
            
            if (!res.ok) {
                const data = await res.json();
                return { 
                    success: false,
                    message: data.message || "Failed to export users"
                };
            }
            
            const blob = await res.blob();
            const csvText = await blob.text();
            
            return { 
                success: true,
                data: csvText
            };
        } catch (error) {
            console.error("Export users error:", error);
            return { 
                success: false,
                message: "Something went wrong"
            };
        }
    },
};