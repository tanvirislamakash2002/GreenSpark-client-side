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

        if (isPaid && !hasAccess) {
            toast.error("Please purchase this idea to vote on it");
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

    return (
        <div className="mt-8 pt-6 border-t">
            {/* Paywall for unpaid users */}
            {isPaid && !hasAccess && isAuthenticated && (
                <div className="mb-6 p-6 rounded-lg bg-muted text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-4">
                        Purchase this idea to see the full solution, description, and vote on it.
                    </p>
                    <Paywall
                        ideaId={ideaId}
                        amount={price || 9.99}
                        ideaTitle={ideaTitle}
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                    <Link href="/ideas">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Ideas
                    </Link>
                </Button>

                {/* Vote buttons - disabled for unpaid paid ideas */}
                <Button
                    variant={userVote === "UP" ? "default" : "outline"}
                    onClick={() => handleVote("UP")}
                    disabled={isVoting || (isPaid && !hasAccess)}
                    className={userVote === "UP" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 hover:text-green-600"}
                    title={isPaid && !hasAccess ? "Purchase this idea to vote" : ""}
                >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Upvote
                </Button>

                <Button
                    variant={userVote === "DOWN" ? "default" : "outline"}
                    onClick={() => handleVote("DOWN")}
                    disabled={isVoting || (isPaid && !hasAccess)}
                    className={userVote === "DOWN" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 hover:text-red-600"}
                    title={isPaid && !hasAccess ? "Purchase this idea to vote" : ""}
                >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Downvote
                </Button>

                {/* Bookmark button - always enabled */}
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