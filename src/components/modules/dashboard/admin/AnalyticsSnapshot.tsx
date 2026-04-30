import Link from "next/link";
import { ArrowRight, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/types/admin.type";

interface AnalyticsSnapshotProps {
    chartData: ChartData;
}

export function AnalyticsSnapshot({ chartData }: AnalyticsSnapshotProps) {
    // Calculate total for percentage display
    const totalIdeasByStatus = chartData.ideasByStatus.reduce((sum, item) => sum + item.count, 0);
    const totalIdeasByCategory = chartData.ideasByCategory.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Analytics Snapshot</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/analytics">
                        View Full Analytics
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Ideas by Status - Simple bar chart representation */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <PieChart className="h-4 w-4 text-muted-foreground" />
                            <h4 className="text-sm font-medium">Ideas by Status</h4>
                        </div>
                        <div className="space-y-2">
                            {chartData.ideasByStatus.map((item) => {
                                const percentage = totalIdeasByStatus > 0 
                                    ? Math.round((item.count / totalIdeasByStatus) * 100) 
                                    : 0;
                                const statusColors = {
                                    PENDING: "bg-orange-500",
                                    APPROVED: "bg-green-500",
                                    REJECTED: "bg-red-500",
                                    DRAFT: "bg-gray-500",
                                };
                                const color = statusColors[item.status as keyof typeof statusColors] || "bg-gray-500";
                                
                                return (
                                    <div key={item.status}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="capitalize">{item.status.toLowerCase()}</span>
                                            <span>{item.count} ({percentage}%)</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${color} rounded-full transition-all`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <h4 className="text-sm font-medium">Top Categories</h4>
                        </div>
                        <div className="space-y-2">
                            {chartData.ideasByCategory.slice(0, 4).map((item) => {
                                const percentage = totalIdeasByCategory > 0 
                                    ? Math.round((item.count / totalIdeasByCategory) * 100) 
                                    : 0;
                                return (
                                    <div key={item.categoryId}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{item.categoryName}</span>
                                            <span>{item.count} ({percentage}%)</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-green-500 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Ideas Over Time - Mini trend */}
                    <div>
                        <h4 className="text-sm font-medium mb-2">Trend (Last 7 days)</h4>
                        <div className="flex items-end gap-1 h-20">
                            {chartData.ideasOverTime.slice(-7).map((item, index) => {
                                const maxCount = Math.max(...chartData.ideasOverTime.map(d => d.count), 1);
                                const height = (item.count / maxCount) * 60;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                        <div 
                                            className="w-full bg-green-500 rounded-t-sm transition-all"
                                            style={{ height: `${height}px` }}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}