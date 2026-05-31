import { Users, Lightbulb, ThumbsUp, MessageCircle, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OverviewStats as OverviewStatsType } from "@/types/analytics.type";

interface OverviewStatsProps {
    stats: OverviewStatsType;
}

const statItems = [
    { key: "totalUsers", label: "Total Users", icon: Users, color: "text-blue-500", suffix: "" },
    { key: "activeUsers", label: "Active Users", icon: Users, color: "text-green-500", suffix: "" },
    { key: "totalIdeas", label: "Total Ideas", icon: Lightbulb, color: "text-amber-500", suffix: "" },
    { key: "approvedIdeas", label: "Approved", icon: Lightbulb, color: "text-green-500", suffix: "" },
    { key: "totalVotes", label: "Total Votes", icon: ThumbsUp, color: "text-purple-500", suffix: "" },
    { key: "totalComments", label: "Comments", icon: MessageCircle, color: "text-teal-500", suffix: "" },
    { key: "paidIdeasSold", label: "Paid Ideas Sold", icon: DollarSign, color: "text-amber-500", suffix: "" },
    { key: "totalRevenue", label: "Revenue", icon: DollarSign, color: "text-green-500", prefix: "$" },
];

export function OverviewStats({ stats }: OverviewStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof OverviewStatsType];
                return (
                    <Card key={item.key}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-xl font-bold">
                                        {item.prefix}{value?.toLocaleString() || 0}{item.suffix}
                                    </p>
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