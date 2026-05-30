"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import { Comment } from "@/types/comment.type";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { getComments, createComment } from "@/actions/comment.action";
import { getSession } from "@/actions/auth.action";
import { toast } from "sonner";

interface CommentsSectionProps {
    ideaId: string;
}

export function CommentsSection({ ideaId }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userImage, setUserImage] = useState<string>();
    const [userName, setUserName] = useState<string>();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const loadComments = useCallback(async (pageNum: number, append = false) => {
        setIsLoading(true);
        const result = await getComments(ideaId, pageNum, 10);
        
        if (result.success && result.data) {
            if (append) {
                setComments(prev => [...prev, ...result.data!.comments]);
            } else {
                setComments(result.data!.comments);
            }
            setHasMore(result.data!.pagination.currentPage < result.data!.pagination.totalPages);
            setTotalItems(result.data!.pagination.totalItems);
        }
        setIsLoading(false);
    }, [ideaId]);

    useEffect(() => {
        loadComments(1, false);
    }, [loadComments]);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            const user = session?.data?.user;
            setIsAuthenticated(!!user);
            setCurrentUserId(user?.id);
            setIsAdmin(user?.role === 'ADMIN');
            setUserImage(user?.image);
            setUserName(user?.name);
        };
        fetchSession();
    }, []);

    const handleCreateComment = async (content: string) => {
        const result = await createComment(ideaId, { content });
        if (result.success) {
            toast.success("Comment posted");
            await loadComments(1, false);
            setPage(1);
        } else {
            toast.error(result.message || "Failed to post comment");
        }
    };

    const handleReply = async (parentId: string, content: string) => {
        const result = await createComment(ideaId, { content, parentId });
        if (result.success) {
            toast.success("Reply posted");
            await loadComments(1, false);
        } else {
            toast.error(result.message || "Failed to post reply");
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadComments(nextPage, true);
    };

    return (
        <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Discussion ({totalItems})</h2>
            </div>

            <CommentForm
                isAuthenticated={isAuthenticated}
                userImage={userImage}
                userName={userName}
                onSubmit={handleCreateComment}
                placeholder="Share your thoughts about this idea..."
            />

            <div className="mt-8">
                {isLoading && comments.length === 0 ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 rounded-lg border animate-pulse">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 bg-muted rounded-full" />
                                    <div className="h-4 bg-muted rounded w-24" />
                                </div>
                                <div className="h-16 bg-muted rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <CommentList
                        comments={comments}
                        ideaId={ideaId}
                        isAuthenticated={isAuthenticated}
                        currentUserId={currentUserId}
                        isAdmin={isAdmin}
                        onReply={handleReply}
                        onCommentUpdate={() => loadComments(1, false)}
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                    />
                )}
            </div>
        </div>
    );
}