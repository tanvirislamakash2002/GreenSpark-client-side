import { MessageCircle, Sparkles, Calendar } from "lucide-react";

interface MyCommentsHeaderProps {
    totalComments: number;
    mostActiveIdea: string | null;
    lastCommentDate: string | null;
}

export function MyCommentsHeader({ totalComments, mostActiveIdea, lastCommentDate }: MyCommentsHeaderProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Comments</h1>
            <p className="text-muted-foreground mb-6">
                Track and manage all your comments across the platform
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                    <MessageCircle className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Total Comments</p>
                    <p className="text-2xl font-bold">{totalComments}</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                    <Sparkles className="h-5 w-5 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Most Active On</p>
                    <p className="text-sm font-medium truncate">{mostActiveIdea || "N/A"}</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                    <Calendar className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Last Comment</p>
                    <p className="text-sm font-medium">{formatDate(lastCommentDate)}</p>
                </div>
            </div>
        </div>
    );
}