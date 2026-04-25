import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PendingApprovalAlertProps {
    pendingCount: number;
}

export function PendingApprovalAlert({ pendingCount }: PendingApprovalAlertProps) {
    if (pendingCount === 0) return null;

    return (
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">
                Ideas Pending Review
            </AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-amber-700 dark:text-amber-500">
                    You have {pendingCount} idea{pendingCount !== 1 ? "s" : ""} waiting for admin approval.
                </span>
                <Button asChild variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    <Link href="/dashboard/member/ideas?status=pending">
                        View Pending Ideas
                    </Link>
                </Button>
            </AlertDescription>
        </Alert>
    );
}