"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, Eye, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserVote } from "@/types/vote.type";
import { castVote, removeVote } from "@/actions/vote.action";
import { toast } from "sonner";

interface VoteCardProps {
    vote: UserVote;
    onVoteChange: () => void;
}

export function VoteCard({ vote, onVoteChange }: VoteCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentVoteScore, setCurrentVoteScore] = useState(vote.idea.voteScore);
    const [currentVoteType, setCurrentVoteType] = useState(vote.voteType);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleVote = async (newVoteType: 'UP' | 'DOWN') => {
        setIsLoading(true);
        
        let result;
        if (currentVoteType === newVoteType) {
            result = await removeVote(vote.idea.id);
            if (result.success) {
                setCurrentVoteScore(result.data.voteScore);
                setCurrentVoteType(null as any);
                toast.success("Vote removed");
            }
        } else {
            result = await castVote(vote.idea.id, newVoteType);
            if (result.success) {
                setCurrentVoteScore(result.data.voteScore);
                setCurrentVoteType(newVoteType);
                toast.success(`${newVoteType === 'UP' ? 'Upvoted' : 'Downvoted'} successfully`);
            }
        }
        
        if (!result.success) {
            toast.error(result.message || "Failed to update vote");
        } else {
            onVoteChange();
        }
        
        setIsLoading(false);
    };

    const handleRemoveVote = async () => {
        setIsLoading(true);
        const result = await removeVote(vote.idea.id);
        if (result.success) {
            setCurrentVoteScore(result.data.voteScore);
            setCurrentVoteType(null as any);
            toast.success("Vote removed");
            onVoteChange();
        } else {
            toast.error(result.message || "Failed to remove vote");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            {/* Idea Image */}
            <Link href={`/ideas/${vote.idea.id}`} className="sm:w-24 h-24 flex-shrink-0">
                <div className="relative w-full h-full rounded-md overflow-hidden bg-muted">
                    {vote.idea.imageUrl ? (
                        <Image
                            src={vote.idea.imageUrl}
                            alt={vote.idea.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                            <span className="text-2xl">🌿</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                        <Link 
                            href={`/ideas/${vote.idea.id}`}
                            className="font-semibold text-lg hover:text-green-600 transition-colors"
                        >
                            {vote.idea.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                                {vote.idea.categories[0]?.name || "Uncategorized"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Voted on {formatDate(vote.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Score: {currentVoteScore}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {vote.idea.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant={currentVoteType === "UP" ? "default" : "outline"}
                            onClick={() => handleVote("UP")}
                            disabled={isLoading}
                            className={currentVoteType === "UP" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Upvote
                        </Button>
                        <Button
                            size="sm"
                            variant={currentVoteType === "DOWN" ? "default" : "outline"}
                            onClick={() => handleVote("DOWN")}
                            disabled={isLoading}
                            className={currentVoteType === "DOWN" ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Downvote
                        </Button>
                        {currentVoteType && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleRemoveVote}
                                disabled={isLoading}
                                className="text-red-500 hover:text-red-600"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                            </Button>
                        )}
                    </div>
                    
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/ideas/${vote.idea.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Idea
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}