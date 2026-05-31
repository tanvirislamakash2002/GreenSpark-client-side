import { Users, Mail, TrendingUp, UserMinus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminNewsletterHeaderProps {
    stats: {
        totalSubscribers: number;
        activeSubscribers: number;
        unsubscribed: number;
        newThisMonth: number;
    };
}

export function AdminNewsletterHeader({ stats }: AdminNewsletterHeaderProps) {
    const statItems = [
        { label: "Total Subscribers", value: stats.totalSubscribers, icon: Users, color: "text-blue-500" },
        { label: "Active", value: stats.activeSubscribers, icon: Mail, color: "text-green-500", highlight: true },
        { label: "New This Month", value: stats.newThisMonth, icon: TrendingUp, color: "text-amber-500" },
        { label: "Unsubscribed", value: stats.unsubscribed, icon: UserMinus, color: "text-gray-500" },
    ];

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Newsletter Management</h1>
            <p className="text-muted-foreground mb-6">
                Manage subscribers and send email campaigns to your community
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card key={item.label} className={item.highlight ? "border-green-200 bg-green-50 dark:bg-green-950/20" : ""}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground">{item.label}</p>
                                        <p className="text-2xl font-bold">{item.value.toLocaleString()}</p>
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
        </div>
    );
}