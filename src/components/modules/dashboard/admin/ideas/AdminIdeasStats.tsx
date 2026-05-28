import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminIdeasStats as AdminIdeasStatsType } from "@/types/idea/admin-idea.type";

interface AdminIdeasStatsProps {
    stats: AdminIdeasStatsType;
}

const statItems = [
    { key: "total", label: "Total Ideas", icon: FileText, color: "text-blue-500", highlight: false },
    { key: "pending", label: "Pending", icon: Clock, color: "text-amber-500", highlight: true },
    { key: "approved", label: "Approved", icon: CheckCircle, color: "text-green-500", highlight: false },
    { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-500", highlight: false },
] as const;

export function AdminIdeasStats({ stats }: AdminIdeasStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof AdminIdeasStatsType];
                return (
                    <Card key={item.key} className={item?.highlight ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20" : ""}>
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