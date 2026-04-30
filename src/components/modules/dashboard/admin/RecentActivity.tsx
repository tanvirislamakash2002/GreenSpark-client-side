import Link from "next/link";
import { ArrowRight, Lightbulb, UserPlus, CheckCircle, XCircle, MessageSquare, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "@/types/admin.type";

const activityIcons = {
    SUBMIT_IDEA: Lightbulb,
    USER_REGISTER: UserPlus,
    APPROVE_IDEA: CheckCircle,
    REJECT_IDEA: XCircle,
    NEW_COMMENT: MessageSquare,
    VOTE: ThumbsUp,
};

const activityColors = {
    SUBMIT_IDEA: "text-amber-500",
    USER_REGISTER: "text-blue-500",
    APPROVE_IDEA: "text-green-500",
    REJECT_IDEA: "text-red-500",
    NEW_COMMENT: "text-teal-500",
    VOTE: "text-purple-500",
};

interface RecentActivityProps {
    activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    if (activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No recent activity to display.
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
                    <Link href="/admin/logs">
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
                        return (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className={`p-2 rounded-full bg-muted ${color}`}>
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
                                        <Link href={`/ideas/${activity.ideaId}`}>
                                            View
                                        </Link>
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