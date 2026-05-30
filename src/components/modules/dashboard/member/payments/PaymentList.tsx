import { Payment } from "@/types/payment.type";
import { PaymentCard } from "./PaymentCard";
import { EmptyState } from "./EmptyState";

interface PaymentListProps {
    payments: Payment[];
}

export function PaymentList({ payments }: PaymentListProps) {
    if (payments.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            {payments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
            ))}
        </div>
    );
}