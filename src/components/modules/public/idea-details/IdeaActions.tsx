"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ThumbsUp, ThumbsDown, Bookmark, BookmarkCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { castVote, removeVote, getUserVote } from "@/actions/vote.action";
import { addBookmark, removeBookmark, checkBookmark } from "@/actions/bookmark.action";
import { Paywall } from "../../dashboard/member/idea-details/Paywall";

interface IdeaActionsProps {
    ideaId: string;
    ideaTitle: string;
    isPaid: boolean;
    hasAccess?: boolean;
    initialVoteScore?: number;
    isAuthenticated: boolean;
    userId?: string;
    price?: number | null;
    onVoteUpdate?: (newScore: number, userVote: string | null) => void;
}

export function IdeaActions({ 
    ideaId, 
    ideaTitle,
    isPaid, 
    hasAccess = false,
    initialVoteScore = 0,
    isAuthenticated,
    userId,
    price,
    onVoteUpdate 
}: IdeaActionsProps) {
    const [isVoting, setIsVoting] = useState(false);
    const [isBookmarking, setIsBookmarking] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(true);
    const [userVote, setUserVote] = useState<string | null>(null);
    const [currentVoteScore, setCurrentVoteScore] = useState(initialVoteScore);

    // Check if idea is bookmarked and get user vote on load
    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated || !userId) {
                setIsLoadingBookmark(false);
                return;
            }
            
            const [bookmarkResult, voteResult] = await Promise.all([
                checkBookmark(ideaId),
                getUserVote(ideaId),
            ]);
            
            if (bookmarkResult.success && bookmarkResult.data) {
                setIsBookmarked(bookmarkResult.data.isBookmarked);
            }
            
            if (voteResult.success && voteResult.data) {
                setUserVote(voteResult.data.userVote);
            }
            
            setIsLoadingBookmark(false);
        };
        
        fetchData();
    }, [ideaId, isAuthenticated, userId]);

    const handleVote = async (voteType: "UP" | "DOWN") => {
        if (!isAuthenticated) {
            toast.error("Please login to vote");
            return;
        }
        
        setIsVoting(true);
        
        // Optimistic update
        const previousVote = userVote;
        let newVoteScore = currentVoteScore;
        let newUserVote = userVote;
        
        if (userVote === voteType) {
            // Removing vote
            newUserVote = null;
            newVoteScore = voteType === "UP" ? currentVoteScore - 1 : currentVoteScore + 1;
        } else if (userVote === null) {
            // New vote
            newUserVote = voteType;
            newVoteScore = voteType === "UP" ? currentVoteScore + 1 : currentVoteScore - 1;
        } else {
            // Changing vote
            newUserVote = voteType;
            newVoteScore = voteType === "UP" ? currentVoteScore + 2 : currentVoteScore - 2;
        }
        
        setUserVote(newUserVote);
        setCurrentVoteScore(newVoteScore);
        if (onVoteUpdate) onVoteUpdate(newVoteScore, newUserVote);
        
        let result;
        if (userVote === voteType) {
            result = await removeVote(ideaId);
        } else {
            result = await castVote(ideaId, voteType);
        }
        
        if (!result.success) {
            // Revert on error
            setUserVote(previousVote);
            setCurrentVoteScore(currentVoteScore);
            if (onVoteUpdate) onVoteUpdate(currentVoteScore, previousVote);
            toast.error(result.message);
        } else if (result.data) {
            setCurrentVoteScore(result.data.voteScore);
            setUserVote(result.data.userVote);
            if (onVoteUpdate) onVoteUpdate(result.data.voteScore, result.data.userVote);
            toast.success(result.message);
        }
        
        setIsVoting(false);
    };

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to bookmark");
            return;
        }
        
        setIsBookmarking(true);
        
        let result;
        if (isBookmarked) {
            result = await removeBookmark(ideaId);
            if (result.success) {
                setIsBookmarked(false);
                toast.success("Bookmark removed");
            } else {
                toast.error(result.message);
            }
        } else {
            result = await addBookmark(ideaId);
            if (result.success) {
                setIsBookmarked(true);
                toast.success("Bookmark added");
            } else {
                toast.error(result.message);
            }
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
                    <Paywall 
                        ideaId={ideaId} 
                        amount={price || 9.99} 
                        ideaTitle={ideaTitle} 
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                    <Link href="/ideas">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Ideas
                    </Link>
                </Button>
                
                <Button
                    variant={userVote === "UP" ? "default" : "outline"}
                    onClick={() => handleVote("UP")}
                    disabled={isVoting}
                    className={userVote === "UP" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 hover:text-green-600"}
                >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Upvote
                </Button>
                
                <Button
                    variant={userVote === "DOWN" ? "default" : "outline"}
                    onClick={() => handleVote("DOWN")}
                    disabled={isVoting}
                    className={userVote === "DOWN" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 hover:text-red-600"}
                >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Downvote
                </Button>
                
                <Button
                    variant="outline"
                    onClick={handleBookmark}
                    disabled={isBookmarking || isLoadingBookmark}
                >
                    {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 mr-2 text-green-600" />
                    ) : (
                        <Bookmark className="h-4 w-4 mr-2" />
                    )}
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
            </div>            
        </div>
    );
}