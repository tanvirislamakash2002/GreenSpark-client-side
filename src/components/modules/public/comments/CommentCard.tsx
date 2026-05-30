"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Flag, Trash2, Edit2, X, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/comment.type";
import { CommentForm } from "./CommentForm";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { ReportCommentModal } from "./ReportCommentModal";
import { updateComment, deleteComment, reportComment } from "@/actions/comment.action";
import { toast } from "sonner";

interface CommentCardProps {
    comment: Comment;
    ideaId: string;
    isAuthenticated: boolean;
    currentUserId?: string;
    isAdmin?: boolean;
    depth?: number;
    onReply: (parentId: string, content: string) => Promise<void>;
    onCommentUpdate: () => void;
}

export function CommentCard({
    comment,
    ideaId,
    isAuthenticated,
    currentUserId,
    isAdmin = false,
    depth = 0,
    onReply,
    onCommentUpdate
}: CommentCardProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [showReplies, setShowReplies] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const isAuthor = currentUserId === comment.user.id;
    const canDelete = isAdmin || isAuthor;
    const canEdit = isAuthor;
    const canReport = !canDelete && isAuthenticated;
    const maxDepth = 3;
    const indentClass = depth > 0 ? `ml-${Math.min(depth, maxDepth) * 4}` : "";

    const handleReply = async (content: string) => {
        await onReply(comment.id, content);
        setShowReplyForm(false);
        onCommentUpdate();
    };

    const handleEdit = async () => {
        if (!editContent.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
        setIsSubmitting(true);
        const result = await updateComment(comment.id, editContent);
        if (result.success) {
            toast.success("Comment updated");
            setIsEditing(false);
            onCommentUpdate();
        } else {
            toast.error(result.message || "Failed to update comment");
        }
        setIsSubmitting(false);
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        const result = await deleteComment(comment.id);
        if (result.success) {
            toast.success("Comment deleted");
            onCommentUpdate();
        } else {
            toast.error(result.message || "Failed to delete comment");
        }
        setIsSubmitting(false);
        setShowDeleteModal(false);
    };

    const handleReport = async (reason: string) => {
        setIsSubmitting(true);
        const result = await reportComment(comment.id, reason);
        if (result.success) {
            toast.success("Comment reported. Thank you for your feedback.");
            setShowReportModal(false);
        } else {
            toast.error(result.message || "Failed to report comment");
        }
        setIsSubmitting(false);
    };

    if (comment.isDeleted) {
        return (
            <div className="p-4 rounded-lg bg-muted/30 text-center text-muted-foreground">
                <p className="text-sm">[Comment removed by moderator]</p>
            </div>
        );
    }
    return (
        <>
            <div className={`${indentClass} mt-4`}>
                <div className="p-4 rounded-lg border bg-card">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user.image || undefined} />
                                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm">{comment.user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    {comment.updatedAt !== comment.createdAt && " (edited)"}
                                </p>
                            </div>
                        </div>

                        <div>
                            {/* Edit button - only for author */}
                            {!isEditing && canEdit && (
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                            )}

                            {/* Delete button - for author AND admin */}
                            {!isEditing && canDelete && (
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(true)}>
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                            )}

                            {/* Report button - for other users (not author, not admin) */}
                            {canReport && !isEditing && (
                                <Button variant="ghost" size="sm" onClick={() => setShowReportModal(true)}>
                                    <Flag className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    {isEditing ? (
                        <div className="mt-3">
                            <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                            <div className="flex gap-2 mt-2">
                                <Button size="sm" onClick={handleEdit} disabled={isSubmitting}>
                                    <Check className="h-3 w-3 mr-1" />
                                    Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                                    <X className="h-3 w-3 mr-1" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    )}

                    {/* Actions */}
                    {!isEditing && isAuthenticated && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="mt-2"
                        >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Reply
                        </Button>
                    )}

                    {/* Reply Form */}
                    {showReplyForm && (
                        <div className="mt-3">
                            <CommentForm
                                isAuthenticated={isAuthenticated}
                                onSubmit={handleReply}
                                placeholder="Write a reply..."
                                isReply
                                onCancel={() => setShowReplyForm(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowReplies(!showReplies)}
                            className="mb-2"
                        >
                            {showReplies ? "Hide" : `Show ${comment.replies.length}`} replies
                        </Button>
                        {showReplies && (
                            <div className="space-y-2">
                                {comment.replies.map((reply) => (
                                    <CommentCard
                                        key={reply.id}
                                        comment={reply}
                                        ideaId={ideaId}
                                        isAuthenticated={isAuthenticated}
                                        currentUserId={currentUserId}
                                        isAdmin={isAdmin}
                                        depth={depth + 1}
                                        onReply={onReply}
                                        onCommentUpdate={onCommentUpdate}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <DeleteCommentModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={handleDelete}
                isLoading={isSubmitting}
            />

            <ReportCommentModal
                open={showReportModal}
                onOpenChange={setShowReportModal}
                onConfirm={handleReport}
                isLoading={isSubmitting}
            />
        </>
    );
}