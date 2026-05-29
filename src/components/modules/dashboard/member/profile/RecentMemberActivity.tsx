import Link from "next/link";
import { Lightbulb, CheckCircle, XCircle, MessageSquare, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MemberActivity } from "@/types/profile/member-profile.type";

const activityConfig = {
    SUBMIT_IDEA: { icon: Lightbulb, color: "text-amber-500", label: "Submitted" },
    APPROVE_IDEA: { icon: CheckCircle, color: "text-green-500", label: "Approved" },
    REJECT_IDEA: { icon: XCircle, color: "text-red-500", label: "Rejected" },
    NEW_COMMENT: { icon: MessageSquare, color: "text-teal-500", label: "Commented" },
    VOTE: { icon: ThumbsUp, color: "text-purple-500", label: "Voted" },
};

interface RecentMemberActivityProps {
    activities: MemberActivity[];
}

export function RecentMemberActivity({ activities }: RecentMemberActivityProps) {
    if (activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No recent activity to display
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
                    <Link href="/member/activity">View All</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.slice(0, 5).map((activity) => {
                        const config = activityConfig[activity.type] || activityConfig.SUBMIT_IDEA;
                        const Icon = config.icon;
                        return (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className={`p-2 rounded-full bg-muted ${config.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">{activity.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                {activity.ideaId && (
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/ideas/${activity.ideaId}`}>View</Link>
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}