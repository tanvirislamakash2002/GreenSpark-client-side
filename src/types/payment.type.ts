export interface CreatePaymentIntentData {
    ideaId: string;
    amount: number;
    ideaTitle: string;
}

export interface CreatePaymentIntentResponse {
    success: boolean;
    data?: {
        clientSecret: string;
        paymentId: string;
    };
    message?: string;
}

export interface PaymentStatusResponse {
    success: boolean;
    data?: {
        status: string;
        paidAt: string | null;
        receiptUrl: string | null;
    };
    message?: string;
}

export interface CheckPaidResponse {
    success: boolean;
    data?: {
        hasPaid: boolean;
    };
    message?: string;
}

export interface UserPaymentsResponse {
    success: boolean;
    data?: {
        payments: Payment[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface Payment {
    id: string;
    amount: number;
    status: string;
    paymentMethod: string;
    paidAt: string | null;
    receiptUrl: string | null;
    createdAt: string;
    idea: {
        id: string;
        title: string;
        imageUrl: string | null;
    };
}