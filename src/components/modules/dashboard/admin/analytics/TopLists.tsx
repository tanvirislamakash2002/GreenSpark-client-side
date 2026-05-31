import Link from "next/link";
import { Trophy, Lightbulb, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TopContributor, TopIdea } from "@/types/analytics.type";

interface TopListsProps {
    contributors: TopContributor[];
    ideas: TopIdea[];
}

const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export function TopLists({ contributors, ideas }: TopListsProps) {
    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Contributors */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Top Contributors</CardTitle>
                    <Trophy className="h-5 w-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {contributors.map((contributor, index) => (
                            <div key={contributor.userId} className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 text-center">
                                    {index < 3 ? (
                                        <Trophy className={`h-5 w-5 ${medalColors[index]}`} />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">{index + 1}</span>
                                    )}
                                </div>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={contributor.image || undefined} />
                                    <AvatarFallback>{getInitials(contributor.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{contributor.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {contributor.approvedIdeas} ideas • {contributor.upvotesReceived} upvotes
                                    </p>
                                </div>
                                <Badge variant="secondary">{contributor.totalComments} comments</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Ideas */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Most Voted Ideas</CardTitle>
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {ideas.map((idea, index) => (
                            <Link key={idea.id} href={`/ideas/${idea.id}`} target="_blank">
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex-shrink-0 w-6 text-center font-medium text-muted-foreground">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium line-clamp-1">{idea.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            By {idea.author} • {idea.voteScore} votes • {idea.commentCount} comments
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">{idea.viewCount} views</Badge>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}