"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Flag, Trash2, RotateCcw, CheckCircle, Eye, AlertTriangle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminComment } from "@/types/comment/admin-comment.type";
import { ReportDetailsModal } from "./ReportDetailsModal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteComment, restoreComment, resolveReports } from "@/actions/comment/admin-comment.action";
import { toast } from "sonner";

interface AdminCommentRowProps {
    comment: AdminComment;
    onUpdate: () => void;
}

export function AdminCommentRow({ comment, onUpdate }: AdminCommentRowProps) {
    const [showReportModal, setShowReportModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showRestoreDialog, setShowRestoreDialog] = useState(false);
    const [showResolveDialog, setShowResolveDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        const result = await deleteComment(comment.id);
        if (result.success) {
            toast.success("Comment deleted");
            onUpdate();
        } else {
            toast.error(result.message || "Failed to delete comment");
        }
        setIsLoading(false);
        setShowDeleteDialog(false);
    };

    const handleRestore = async () => {
        setIsLoading(true);
        const result = await restoreComment(comment.id);
        if (result.success) {
            toast.success("Comment restored");
            onUpdate();
        } else {
            toast.error(result.message || "Failed to restore comment");
        }
        setIsLoading(false);
        setShowRestoreDialog(false);
    };

    const handleResolve = async () => {
        setIsLoading(true);
        const result = await resolveReports(comment.id);
        if (result.success) {
            toast.success("Reports resolved");
            onUpdate();
        } else {
            toast.error(result.message || "Failed to resolve reports");
        }
        setIsLoading(false);
        setShowResolveDialog(false);
    };

    const statusBadge = () => {
        if (comment.isDeleted) {
            return <Badge variant="destructive">Deleted</Badge>;
        }
        if (comment.reportCount > 0) {
            return <Badge className="bg-red-100 text-red-700">Reported ({comment.reportCount})</Badge>;
        }
        return <Badge variant="outline">Active</Badge>;
    };

    return (
        <>
            <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            {statusBadge()}
                            <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={comment.user.image || undefined} />
                                <AvatarFallback className="text-xs">{getInitials(comment.user.name)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">({comment.user.email})</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                            {comment.content}
                        </p>
                        
                        <div className="mt-2">
                            <Link 
                                href={`/ideas/${comment.idea.id}`}
                                className="text-xs text-green-600 hover:underline"
                                target="_blank"
                            >
                                On idea: {comment.idea.title}
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2">
                        {comment.reportCount > 0 && (
                            <Button variant="outline" size="sm" onClick={() => setShowReportModal(true)}>
                                <Flag className="h-4 w-4 mr-1" />
                                Reports ({comment.reportCount})
                            </Button>
                        )}
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/ideas/${comment.idea.id}`} target="_blank">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View in Context
                                    </Link>
                                </DropdownMenuItem>
                                {comment.reportCount > 0 && (
                                    <DropdownMenuItem onClick={() => setShowResolveDialog(true)}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Resolve Reports
                                    </DropdownMenuItem>
                                )}
                                {!comment.isDeleted ? (
                                    <DropdownMenuItem 
                                        onClick={() => setShowDeleteDialog(true)}
                                        className="text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Comment
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => setShowRestoreDialog(true)}>
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Restore Comment
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <ReportDetailsModal
                open={showReportModal}
                onOpenChange={setShowReportModal}
                commentId={comment.id}
            />

            <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Comment"
                description="Are you sure you want to delete this comment? This action can be reversed by restoring it."
                confirmText="Delete"
                onConfirm={handleDelete}
                variant="destructive"
                isLoading={isLoading}
            />

            <ConfirmDialog
                open={showRestoreDialog}
                onOpenChange={setShowRestoreDialog}
                title="Restore Comment"
                description="Are you sure you want to restore this comment? It will become visible again."
                confirmText="Restore"
                onConfirm={handleRestore}
                isLoading={isLoading}
            />

            <ConfirmDialog
                open={showResolveDialog}
                onOpenChange={setShowResolveDialog}
                title="Resolve Reports"
                description="Are you sure you want to mark all reports on this comment as resolved?"
                confirmText="Resolve"
                onConfirm={handleResolve}
                isLoading={isLoading}
            />
        </>
    );
}