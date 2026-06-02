"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "@/actions/payment.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaywallProps {
    ideaId: string;
    amount: number;
    ideaTitle: string;
}

export function Paywall({ ideaId, amount, ideaTitle }: PaywallProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInitiatePayment = async () => {
        setIsLoading(true);

        const result = await createPaymentIntent({
            ideaId,
            amount,
            ideaTitle,
        });

        if (!result.success) {
            toast.error(result.message || "Failed to initiate payment");
            setIsLoading(false);
            return;
        }

        if (!result.data) {
            toast.error("Payment data missing");
            setIsLoading(false);
            return;
        }

        setClientSecret(result.data.clientSecret);
        setIsLoading(false);
    };

    const handleSuccess = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        setClientSecret(null);
    };

    if (clientSecret) {
        return (
            <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Complete Your Purchase</h3>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm
                        ideaId={ideaId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel} />
                </Elements>
            </div>
        );
    }

    return (
        <div className="text-center">
            <Button
                onClick={handleInitiatePayment}
                disabled={isLoading}
                className="bg-amber-500 hover:bg-amber-600"
            >
                {isLoading ? "Processing..." : `Unlock for $${amount.toFixed(2)}`}
            </Button>
        </div>
    );
}