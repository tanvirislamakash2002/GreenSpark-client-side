import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
    status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
    COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700" },
    FAILED: { label: "Failed", className: "bg-red-100 text-red-700" },
    REFUNDED: { label: "Refunded", className: "bg-gray-100 text-gray-700" },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const config = statusConfig[status] || statusConfig.PENDING;
    
    return (
        <Badge className={config.className}>
            {config.label}
        </Badge>
    );
}