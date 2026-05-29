import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopContributor } from "@/types/admin.type";

interface TopContributorsProps {
    contributors: TopContributor[];
}

const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export function TopContributors({ contributors }: TopContributorsProps) {
    if (contributors.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No contributor data available.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Contributors</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/contributors">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
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
                                <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{contributor.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {contributor.approvedIdeas} approved ideas • {contributor.upvotesReceived} upvotes
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}