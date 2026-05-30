import { env } from "@/env";
import { cookies } from "next/headers";
import { GetIdeasParams, IdeasResponse, IdeaResponse, TopVotedIdeasResponse } from "@/types/idea/idea.type";

const API_URL = env.API_URL ;

export const ideaService = {
    getIdeas: async (params?: GetIdeasParams): Promise<IdeasResponse> => {
        try {
            const url = new URL(`${API_URL}/ideas`);
            
            if (params) {
                if (params.page) url.searchParams.set('page', params.page.toString());
                if (params.limit) url.searchParams.set('limit', params.limit.toString());
                if (params.search) url.searchParams.set('search', params.search);
                if (params.category) url.searchParams.set('category', params.category);
                if (params.status) url.searchParams.set('status', params.status);
                if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
            }
            
            const res = await fetch(url.toString(), {
                next: { tags: ["ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getIdeaById: async (id: string, cookieHeader?: string): Promise<IdeaResponse> => {
    try {
        if (!id) {
            return {
                success: false,
                message: "Idea ID is required",
            };
        }

        const headers: HeadersInit = {};
        
        // Forward cookies if provided (for server-side requests)
        if (cookieHeader) {
            headers.Cookie = cookieHeader;
        }

        const res = await fetch(`${API_URL}/ideas/${id}`, {
            headers,
            credentials: "include", // This works for client-side
            next: { tags: [`idea-${id}`] },
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch idea",
            };
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
},  

    getFeaturedIdeas: async (limit: number = 3): Promise<{ success: boolean; data?: any[]; message?: string }> => {
        try {
            const url = new URL(`${API_URL}/ideas/featured`);
            url.searchParams.set('limit', limit.toString());
            
            const res = await fetch(url.toString(), {
                next: { tags: ["featured-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch featured ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getTopVotedIdeas: async (limit: number = 3): Promise<TopVotedIdeasResponse> => {
        try {
            const url = new URL(`${API_URL}/ideas/top-voted`);
            url.searchParams.set('limit', limit.toString());
            
            const res = await fetch(url.toString(), {
                next: { tags: ["top-voted-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch top voted ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getRecentIdeas: async (limit: number = 6): Promise<{ success: boolean; data?: any[]; message?: string }> => {
        try {
            const url = new URL(`${API_URL}/ideas/recent`);
            url.searchParams.set('limit', limit.toString());
            
            const res = await fetch(url.toString(), {
                next: { tags: ["recent-ideas"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch recent ideas",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};