import { CreatePaymentRequest, PaymentResponse } from '@/types/pricing.type';
import { pricingPlans } from '@/constants/pricing';

// Dummy transaction storage (in real app, this would be in database)
const generateTransactionId = (): string => {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const paymentService = {
    createPayment: async (request: CreatePaymentRequest): Promise<PaymentResponse> => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const plan = pricingPlans.find(p => p.id === request.planId);
            
            if (!plan) {
                return {
                    success: false,
                    message: 'Invalid plan selected',
                };
            }

            // Calculate amount based on billing cycle
            const amount = request.billingCycle === 'monthly' 
                ? plan.priceMonthly 
                : plan.priceYearly;

            if (amount === 0) {
                // Free plan - no payment needed
                return {
                    success: true,
                    data: {
                        transactionId: 'FREE_PLAN',
                        paymentUrl: '/dashboard/member',
                        amount: 0,
                    },
                };
            }

            // Generate dummy payment URL
            const transactionId = generateTransactionId();
            const paymentUrl = `/api/payment/checkout?transactionId=${transactionId}&plan=${request.planId}&cycle=${request.billingCycle}`;

            return {
                success: true,
                data: {
                    transactionId,
                    paymentUrl,
                    amount,
                },
            };
        } catch (error) {
            console.error('Create payment error:', error);
            return {
                success: false,
                message: 'Failed to create payment. Please try again.',
            };
        }
    },

    verifyPayment: async (transactionId: string): Promise<{ success: boolean; message: string }> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // In real implementation, verify with payment gateway
            // For dummy data, always return success
            return {
                success: true,
                message: 'Payment verified successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Payment verification failed',
            };
        }
    },

    getSubscriptionStatus: async (userId: string): Promise<{ isPremium: boolean; plan: string; expiresAt: string | null }> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // For demo, return false (not premium)
            // In real app, fetch from database
            return {
                isPremium: false,
                plan: 'free',
                expiresAt: null,
            };
        } catch (error) {
            return {
                isPremium: false,
                plan: 'free',
                expiresAt: null,
            };
        }
    },
};