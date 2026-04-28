import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

const statusConfig = {
    DRAFT: { label: "Draft", className: "bg-gray-500 hover:bg-gray-600" },
    PENDING: { label: "Pending", className: "bg-amber-500 hover:bg-amber-600" },
    APPROVED: { label: "Approved", className: "bg-green-500 hover:bg-green-600" },
    REJECTED: { label: "Rejected", className: "bg-red-500 hover:bg-red-600" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];
    return (
        <Badge className={config.className}>
            {config.label}
        </Badge>
    );
}