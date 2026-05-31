"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Comment } from "@/types/comment/comment.type";
import { CommentCard } from "./CommentCard";
import { Button } from "@/components/ui/button";

interface CommentListProps {
    comments: Comment[];
    ideaId: string;
    isAuthenticated: boolean;
    currentUserId?: string;
    isAdmin?: boolean;
    onReply: (parentId: string, content: string) => Promise<void>;
    onCommentUpdate: () => void;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

export function CommentList({ 
    comments, 
    ideaId,
    isAuthenticated,
    currentUserId,
    isAdmin,
    onReply,
    onCommentUpdate,
    hasMore,
    onLoadMore
}: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-1">No comments yet</h3>
                <p className="text-muted-foreground text-sm">
                    Be the first to share your thoughts on this idea.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        ideaId={ideaId}
                        isAuthenticated={isAuthenticated}
                        currentUserId={currentUserId}
                        isAdmin={isAdmin}
                        onReply={onReply}
                        onCommentUpdate={onCommentUpdate}
                    />
                ))}
            </div>
            
            {hasMore && onLoadMore && (
                <div className="text-center mt-6">
                    <Button variant="outline" onClick={onLoadMore}>
                        Load More Comments
                    </Button>
                </div>
            )}
        </div>
    );
}