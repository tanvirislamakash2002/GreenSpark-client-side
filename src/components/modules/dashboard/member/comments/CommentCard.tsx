"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Edit2, Trash2, Eye, MessageSquare, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserComment } from "@/types/comment.type";
import { updateComment, deleteComment } from "@/actions/comment.action";
import { DeleteCommentModal } from "@/components/modules/public/comments/DeleteCommentModal";
import { toast } from "sonner";

interface CommentCardProps {
    comment: UserComment;
    onCommentUpdate: () => void;
}

export function CommentCard({ comment, onCommentUpdate }: CommentCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    if (comment.isDeleted) {
        return (
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">[Comment removed]</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Idea Image */}
                        <Link href={`/ideas/${comment.idea.id}`} className="sm:w-20 h-20 flex-shrink-0">
                            <div className="relative w-full h-full rounded-md overflow-hidden bg-muted">
                                {comment.idea.imageUrl ? (
                                    <Image
                                        src={comment.idea.imageUrl}
                                        alt={comment.idea.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                                        <span className="text-xl">🌿</span>
                                    </div>
                                )}
                            </div>
                        </Link>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <Link 
                                    href={`/ideas/${comment.idea.id}`}
                                    className="font-semibold hover:text-green-600 transition-colors"
                                >
                                    {comment.idea.title}
                                </Link>
                                <Badge variant="outline" className="text-xs">
                                    {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}
                                </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground mt-1">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                {comment.updatedAt !== comment.createdAt && " (edited)"}
                            </p>

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
                                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap line-clamp-3">
                                    {comment.content}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3">
                                {!isEditing && (
                                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                                        <Edit2 className="h-3 w-3 mr-1" />
                                        Edit
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(true)}>
                                    <Trash2 className="h-3 w-3 mr-1 text-red-500" />
                                    Delete
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/ideas/${comment.idea.id}`}>
                                        <Eye className="h-3 w-3 mr-1" />
                                        View Idea
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/ideas/${comment.idea.id}?commentId=${comment.id}`}>
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        View in Context
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DeleteCommentModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={handleDelete}
                isLoading={isSubmitting}
            />
        </>
    );
}