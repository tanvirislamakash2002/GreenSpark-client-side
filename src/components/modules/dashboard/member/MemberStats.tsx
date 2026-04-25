import { Lightbulb, ThumbsUp, MessageSquare, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MemberStatsProps {
    stats: {
        totalIdeas: number;
        totalVotes: number;
        totalComments: number;
        totalBookmarks: number;
    };
}

const statItems = [
    { key: "totalIdeas", label: "Ideas", icon: Lightbulb, color: "text-amber-500" },
    { key: "totalVotes", label: "Votes", icon: ThumbsUp, color: "text-green-500" },
    { key: "totalComments", label: "Comments", icon: MessageSquare, color: "text-blue-500" },
    { key: "totalBookmarks", label: "Bookmarks", icon: Bookmark, color: "text-purple-500" },
] as const;

export function MemberStats({ stats }: MemberStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof typeof stats];
                return (
                    <Card key={item.key}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="text-2xl font-bold">{value}</p>
                                </div>
                                <div className={`p-3 rounded-full bg-muted ${item.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}