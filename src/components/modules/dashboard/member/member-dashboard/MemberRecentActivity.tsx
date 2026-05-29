import Link from "next/link";
import { Lightbulb, ThumbsUp, MessageSquare, Bookmark, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberActivity } from "@/types/member.type";
import { Button } from "@/components/ui/button";

const activityIcons = {
    SUBMIT_IDEA: Lightbulb,
    VOTE: ThumbsUp,
    COMMENT: MessageSquare,
    BOOKMARK: Bookmark,
};

const activityColors = {
    SUBMIT_IDEA: "text-amber-500",
    VOTE: "text-green-500",
    COMMENT: "text-blue-500",
    BOOKMARK: "text-purple-500",
};

const activityMessages = {
    SUBMIT_IDEA: (title: string) => `You submitted "${title}"`,
    VOTE: (title: string, type: string) => `You ${type === "UP" ? "upvoted" : "downvoted"} "${title}"`,
    COMMENT: (title: string) => `You commented on "${title}"`,
    BOOKMARK: (title: string) => `You bookmarked "${title}"`,
};

interface MemberRecentActivityProps {
    activities: MemberActivity[];
}

export function MemberRecentActivity({ activities }: MemberRecentActivityProps) {
    if (activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No recent activity to show.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/member/activity">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const Icon = activityIcons[activity.type];
                        const color = activityColors[activity.type];
                        const message = activityMessages[activity.type](activity.ideaTitle, activity.voteType || "");
                        
                        return (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className={`p-2 rounded-full bg-muted ${color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        {message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(activity.createdAt).toLocaleDateString()} at{" "}
                                        {new Date(activity.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/ideas/${activity.ideaId}`}>
                                        View
                                    </Link>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}