import Link from "next/link";
import { ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MemberVote } from "@/types/member.type";

interface MemberVotesPreviewProps {
    votes: MemberVote[];
}

export function MemberVotesPreview({ votes }: MemberVotesPreviewProps) {
    if (votes.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Votes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        You haven't voted on any ideas yet.
                    </p>
                    <div className="text-center">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/ideas">
                                Browse Ideas
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Votes</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/member/votes">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {votes.map((vote) => (
                        <div key={vote.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div>
                                <Link href={`/ideas/${vote.ideaId}`} className="font-medium hover:text-green-600 transition-colors">
                                    {vote.ideaTitle}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                    {vote.voteType === "UP" ? (
                                        <ThumbsUp className="h-3 w-3 text-green-600" />
                                    ) : (
                                        <ThumbsDown className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                        Score: {vote.voteScore}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {new Date(vote.votedAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}