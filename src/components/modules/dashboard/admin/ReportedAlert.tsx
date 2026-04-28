import Link from "next/link";
import { AlertTriangle, Flag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ReportedAlertProps {
    count: number;
}

export function ReportedAlert({ count }: ReportedAlertProps) {
    if (count === 0) return null;

    return (
        <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800 dark:text-red-400">
                Reported Content
            </AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-red-700 dark:text-red-500">
                    You have {count} reported comment{count !== 1 ? "s" : ""} pending review.
                </span>
                <Button asChild variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                    <Link href="/dashboard/admin/comments/reported">
                        <Flag className="h-4 w-4 mr-1" />
                        Review Reports
                    </Link>
                </Button>
            </AlertDescription>
        </Alert>
    );
}