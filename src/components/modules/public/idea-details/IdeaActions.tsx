"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ThumbsUp, ThumbsDown, Bookmark, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { voteIdea, bookmarkIdea } from "@/actions/idea/idea.action";
import { authClient } from "@/lib/auth-client";

interface IdeaActionsProps {
    ideaId: string;
    isPaid: boolean;
    hasAccess?: boolean;
}

export function IdeaActions({ ideaId, isPaid, hasAccess = false }: IdeaActionsProps) {
    const [isVoting, setIsVoting] = useState(false);
    const [isBookmarking, setIsBookmarking] = useState(false);
    const { data: session } = authClient.useSession();
    const isAuthenticated = !!session?.user;

    const handleVote = async (voteType: "UP" | "DOWN") => {
        if (!isAuthenticated) {
            toast.error("Please login to vote");
            return;
        }
        
        setIsVoting(true);
        const result = await voteIdea(ideaId, voteType);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
        setIsVoting(false);
    };

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to bookmark");
            return;
        }
        
        setIsBookmarking(true);
        const result = await bookmarkIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
        setIsBookmarking(false);
    };

    // If idea is paid and user doesn't have access, show paywall
    if (isPaid && !hasAccess && isAuthenticated) {
        return (
            <div className="mt-8 pt-6 border-t">
                <div className="bg-muted p-6 rounded-lg text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-4">
                        This is a premium idea. Purchase to view the full content.
                    </p>
                    <Button className="bg-amber-500 hover:bg-amber-600">
                        Unlock for $9.99
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-3">
                <Button
                    variant="outline"
                    asChild
                >
                    <Link href="/ideas">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Ideas
                    </Link>
                </Button>
                
                <Button
                    variant="outline"
                    onClick={() => handleVote("UP")}
                    disabled={isVoting}
                    className="hover:bg-green-50 hover:text-green-600"
                >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Upvote
                </Button>
                
                <Button
                    variant="outline"
                    onClick={() => handleVote("DOWN")}
                    disabled={isVoting}
                    className="hover:bg-red-50 hover:text-red-600"
                >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Downvote
                </Button>
                
                <Button
                    variant="outline"
                    onClick={handleBookmark}
                    disabled={isBookmarking}
                >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmark
                </Button>
            </div>
        </div>
    );
}