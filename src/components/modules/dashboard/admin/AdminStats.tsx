import { Users, Lightbulb, Clock, CheckCircle, XCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminStats as AdminStatsType } from "@/types/admin.type";

interface AdminStatsProps {
    stats: AdminStatsType;
}

const statItems = [
    { key: "totalUsers", label: "Total Users", icon: Users, color: "text-blue-500" },
    { key: "totalIdeas", label: "Total Ideas", icon: Lightbulb, color: "text-amber-500" },
    { key: "pendingIdeas", label: "Pending", icon: Clock, color: "text-orange-500", highlight: true },
    { key: "approvedIdeas", label: "Approved", icon: CheckCircle, color: "text-green-500" },
    { key: "rejectedIdeas", label: "Rejected", icon: XCircle, color: "text-red-500" },
    { key: "totalVotes", label: "Total Votes", icon: ThumbsUp, color: "text-purple-500" },
    { key: "totalComments", label: "Comments", icon: MessageSquare, color: "text-teal-500" },
] as const;

export function AdminStats({ stats }: AdminStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof AdminStatsType];
                return (
                    <Card key={item.key} className={item.highlight ? "border-orange-200 bg-orange-50 dark:bg-orange-950/20" : ""}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-xl font-bold">{value?.toLocaleString() || 0}</p>
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