import { env } from "@/env";

const API_URL = env.API_URL ;

export const newsletterService = {
    subscribe: async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/newsletter/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to subscribe",
                };
            }

            return {
                success: true,
                message: "Successfully subscribed to newsletter!",
            };
        } catch (error) {
            console.error("Subscribe error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};