import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const uploadService = {
    // Public upload (no authentication required) - for temp avatar during registration
    uploadPublic: async (formData: FormData, endpoint: string) => {
        try {
            const res = await fetch(`${API_URL}/upload/${endpoint}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || `Failed to upload to ${endpoint}`,
                };
            }

            return data;
        } catch (error) {
            console.error(`Public upload to ${endpoint} error:`, error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    // Authenticated upload (requires login)
    upload: async (formData: FormData, endpoint: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/upload/${endpoint}`, {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || `Failed to upload to ${endpoint}`,
                };
            }

            return data;
        } catch (error) {
            console.error(`Upload to ${endpoint} error:`, error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    // Delete avatar
    deleteAvatar: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/upload/avatar`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to delete avatar",
                };
            }

            return data;
        } catch (error) {
            console.error("Delete avatar error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};