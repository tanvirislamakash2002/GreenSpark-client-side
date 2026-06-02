"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaymentFormProps {
    ideaId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export function PaymentForm({ ideaId, onSuccess, onCancel }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const returnUrl = `${window.location.origin}/ideas/${ideaId}?payment_success=true`;
    console.log("Return URL being sent to Stripe:", returnUrl);
    console.log("Window origin:", window.location.origin);
    console.log("Idea ID from prop:", ideaId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe not initialized");
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: returnUrl
            },
            redirect: "if_required",
        });

        if (error) {
            toast.error(error.message || "Payment failed");
            setIsLoading(false);
        } else {
            toast.success("Payment successful! You now have access.");
            onSuccess();
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
                <PaymentElement />
            </div>
            <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!stripe || !elements || isLoading} className="bg-amber-500 hover:bg-amber-600">
                    {isLoading ? "Processing..." : "Confirm Payment"}
                </Button>
            </div>
        </form>
    );
}