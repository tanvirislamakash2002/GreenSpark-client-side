import Link from "next/link";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    voteType: string;
}

export function EmptyState({ voteType }: EmptyStateProps) {
    const isUpvotes = voteType === "UP" || voteType === "all";
    const isDownvotes = voteType === "DOWN" || voteType === "all";
    
    let title = "No votes found";
    let description = "You haven't voted on any ideas yet.";
    let icon = <Lightbulb className="w-12 h-12 text-muted-foreground" />;
    
    if (voteType === "UP") {
        title = "No upvotes";
        description = "You haven't upvoted any ideas yet. Find ideas you support and give them an upvote!";
        icon = <ThumbsUp className="w-12 h-12 text-green-500" />;
    } else if (voteType === "DOWN") {
        title = "No downvotes";
        description = "You haven't downvoted any ideas yet. If you disagree with an idea, you can downvote it.";
        icon = <ThumbsDown className="w-12 h-12 text-red-500" />;
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/ideas">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Browse Ideas
                </Link>
            </Button>
        </div>
    );
}