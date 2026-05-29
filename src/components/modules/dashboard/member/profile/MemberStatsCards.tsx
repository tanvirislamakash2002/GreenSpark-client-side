import { Lightbulb, Clock, CheckCircle, XCircle, ThumbsUp, MessageSquare, Bookmark, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MemberStats } from "@/types/profile/member-profile.type";

interface MemberStatsCardsProps {
    stats: MemberStats;
}

const statItems = [
    { key: "totalIdeas", label: "Total Ideas", icon: Lightbulb, color: "text-blue-500" },
    { key: "draftIdeas", label: "Drafts", icon: Clock, color: "text-gray-500" },
    { key: "pendingIdeas", label: "Pending", icon: Clock, color: "text-amber-500" },
    { key: "approvedIdeas", label: "Approved", icon: CheckCircle, color: "text-green-500" },
    { key: "rejectedIdeas", label: "Rejected", icon: XCircle, color: "text-red-500" },
    { key: "totalUpvotesReceived", label: "Upvotes", icon: ThumbsUp, color: "text-purple-500" },
    { key: "totalComments", label: "Comments", icon: MessageSquare, color: "text-teal-500" },
    { key: "totalBookmarks", label: "Bookmarks", icon: Bookmark, color: "text-pink-500" },
];

export function MemberStatsCards({ stats }: MemberStatsCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof MemberStats];
                return (
                    <Card key={item.key}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-2xl font-bold">{value?.toLocaleString() || 0}</p>
                                </div>
                                <div className={`p-2 rounded-full bg-muted ${item.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}