import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EngagementMetrics as EngagementMetricsType } from "@/types/analytics.type";

interface EngagementMetricsProps {
    metrics: EngagementMetricsType;
}

export function EngagementMetrics({ metrics }: EngagementMetricsProps) {
    const metricItems = [
        { label: "Vote-to-View Ratio", value: metrics.voteToViewRatio, suffix: "%", color: "text-blue-500" },
        { label: "Comment-to-View Ratio", value: metrics.commentToViewRatio, suffix: "%", color: "text-green-500" },
        { label: "Approval Rate", value: metrics.approvalRate, suffix: "%", color: "text-amber-500" },
        { label: "Conversion Rate", value: metrics.conversionRate, suffix: "%", color: "text-purple-500" },
        { label: "User Retention (7d)", value: metrics.userRetention7d, suffix: "%", color: "text-teal-500" },
        { label: "User Retention (30d)", value: metrics.userRetention30d, suffix: "%", color: "text-teal-500" },
        { label: "Avg Response Time", value: metrics.avgResponseTime, suffix: " hours", color: "text-orange-500" },
        { label: "Pending Reports", value: metrics.pendingReports, suffix: "", color: "text-red-500", highlight: true },
    ];

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {metricItems.map((item) => (
                        <div key={item.label} className="p-3 rounded-lg border">
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            <p className={`text-xl font-bold ${item.color}`}>
                                {item.value} {item.suffix}
                            </p>
                            {item.highlight && item.value > 0 && (
                                <Badge variant="destructive" className="mt-1">
                                    Needs Attention
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}