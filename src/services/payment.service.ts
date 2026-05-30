import { env } from "@/env";
import { cookies } from "next/headers";
import { 
    CreatePaymentIntentData, 
    CreatePaymentIntentResponse,
    PaymentStatusResponse,
    CheckPaidResponse,
    UserPaymentsResponse
} from "@/types/payment.type";

const API_URL = env.API_URL;

export const paymentService = {
    createPaymentIntent: async (data: CreatePaymentIntentData): Promise<CreatePaymentIntentResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/payments/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: response.message || "Failed to create payment intent",
                };
            }

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error("Create payment intent error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    checkPaymentStatus: async (paymentId: string): Promise<PaymentStatusResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/payments/status/${paymentId}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: [`payment-${paymentId}`] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to check payment status",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Check payment status error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    checkUserPaidForIdea: async (ideaId: string): Promise<CheckPaidResponse> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/payments/check-paid/${ideaId}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: [`user-paid-${ideaId}`] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to check payment status",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Check user paid for idea error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },

    getUserPayments: async (page: number = 1, limit: number = 10): Promise<UserPaymentsResponse> => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/payments/my-payments`);
            url.searchParams.set('page', page.toString());
            url.searchParams.set('limit', limit.toString());
            
            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["user-payments"] },
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to fetch payments",
                };
            }

            return {
                success: true,
                data: data.data,
            };
        } catch (error) {
            console.error("Get user payments error:", error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    },
};