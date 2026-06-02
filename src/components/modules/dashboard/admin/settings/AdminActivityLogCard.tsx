"use client";

import { useState } from "react";
import { History, Activity, Eye, CheckCircle, XCircle, Trash2, UserPlus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminActivity } from "@/types/settings/admin-settings.type";

interface AdminActivityLogCardProps {
    activities: AdminActivity[];
}

const activityIcons = {
    APPROVE_IDEA: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
    REJECT_IDEA: { icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
    DELETE_IDEA: { icon: Trash2, color: "text-red-500", bg: "bg-red-100" },
    DELETE_COMMENT: { icon: Trash2, color: "text-red-500", bg: "bg-red-100" },
    SUSPEND_USER: { icon: UserPlus, color: "text-orange-500", bg: "bg-orange-100" },
    ADMIN_LOGIN: { icon: Activity, color: "text-blue-500", bg: "bg-blue-100" },
    SETTINGS_CHANGE: { icon: Settings, color: "text-purple-500", bg: "bg-purple-100" },
};

const defaultIcon = { icon: Activity, color: "text-gray-500", bg: "bg-gray-100" };

// Helper function to format details
const formatDetails = (details: any, action: string): string => {
    if (typeof details === 'string') return details;
    if (!details) return '';
    
    switch (action) {
        case 'APPROVE_IDEA':
            return `Approved idea "${details.ideaTitle || details.ideaId}"`;
        case 'REJECT_IDEA':
            return `Rejected idea "${details.ideaTitle || details.ideaId}"`;
        case 'DELETE_IDEA':
            return `Deleted idea "${details.ideaTitle || details.ideaId}"`;
        case 'DELETE_COMMENT':
            return `Deleted comment ${details.commentId}`;
        case 'SUSPEND_USER':
            return `Suspended user ${details.targetUserEmail || details.targetUserId}`;
        case 'ADMIN_LOGIN':
            return `Admin logged in`;
        case 'SETTINGS_CHANGE':
            return `Settings changed`;
        default:
            return JSON.stringify(details);
    }
};

export function AdminActivityLogCard({ activities }: AdminActivityLogCardProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedActivities = showAll ? activities : activities.slice(0, 5);

    if (activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No activity logs available</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <CardTitle>Recent Activity Log</CardTitle>
                </div>
                {activities.length > 5 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Less" : "View All"}
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-3">
                {displayedActivities.map((activity) => {
                    const { icon: Icon, color, bg } = activityIcons[activity.action as keyof typeof activityIcons] || defaultIcon;
                    return (
                        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className={`p-2 rounded-full ${bg} ${color}`}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{activity.action.replace(/_/g, " ")}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDetails(activity.details, activity.action)}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        IP: {activity.ipAddress}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}