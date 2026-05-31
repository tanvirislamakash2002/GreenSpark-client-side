"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, User, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentReport } from "@/types/comment/admin-comment.type";
import { getCommentReports } from "@/actions/comment/admin-comment.action";

interface ReportDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    commentId: string;
}

export function ReportDetailsModal({ open, onOpenChange, commentId }: ReportDetailsModalProps) {
    const [reports, setReports] = useState<CommentReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (open && commentId) {
            const fetchReports = async () => {
                setIsLoading(true);
                const result = await getCommentReports(commentId);
                if (result.success && result.data) {
                    setReports(result.data);
                }
                setIsLoading(false);
            };
            fetchReports();
        }
    }, [open, commentId]);

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-700",
        RESOLVED: "bg-green-100 text-green-700",
        DISMISSED: "bg-gray-100 text-gray-700",
    };

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Report Details
                    </DialogTitle>
                </DialogHeader>
                
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-4 w-48 mb-2" />
                                <Skeleton className="h-3 w-full" />
                            </div>
                        ))}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No reports found for this comment.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div key={report.id} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={report.reporter?.image || undefined} />
                                            <AvatarFallback className="text-xs">
                                                {getInitials(report.reporter.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{report.reporter.name}</span>
                                        <Badge className={statusColors[report.status]}>
                                            {report.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                                    </div>
                                </div>
                                <div className="mt-2 p-2 bg-muted/30 rounded">
                                    <p className="text-sm">{report.reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}