export interface PricingPlan {
    id: string;
    name: string;
    slug: string;
    priceMonthly: number;
    priceYearly: number;
    description: string;
    features: string[];
    notIncluded?: string[];
    isPopular?: boolean;
    buttonText: string;
    buttonLink: string;
}

export interface PricingFeature {
    feature: string;
    free: boolean | string;
    premium: boolean | string;
    enterprise: boolean | string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface CreatePaymentRequest {
    planId: string;
    billingCycle: 'monthly' | 'yearly';
    userId: string;
    userEmail: string;
    userName: string;
}

export interface PaymentResponse {
    success: boolean;
    data?: {
        transactionId: string;
        paymentUrl: string;
        amount: number;
    };
    message?: string;
}