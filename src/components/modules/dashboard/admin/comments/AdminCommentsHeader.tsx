import { MessageCircle, Flag, CheckCircle, Trash2, XCircle } from "lucide-react";

interface AdminCommentsHeaderProps {
    stats: {
        totalComments: number;
        reportedComments: number;
        resolvedReports: number;
        dismissedReports: number; 
        deletedComments: number;
    };
}

export function AdminCommentsHeader({ stats }: AdminCommentsHeaderProps) {
    const statItems = [
        { label: "Total Comments", value: stats.totalComments, icon: MessageCircle, color: "text-blue-500" },
        { label: "Reported", value: stats.reportedComments, icon: Flag, color: "text-red-500", highlight: true },
        { label: "Resolved", value: stats.resolvedReports, icon: CheckCircle, color: "text-green-500" },
        { label: "Dismissed", value: stats.dismissedReports, icon: XCircle, color: "text-gray-500" },
        { label: "Deleted", value: stats.deletedComments, icon: Trash2, color: "text-gray-500" },
    ];

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Comment Moderation</h1>
            <p className="text-muted-foreground mb-6">
                Review and manage all user comments across the platform
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {statItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div 
                            key={item.label}
                            className={`p-4 rounded-lg border ${item.highlight ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : 'bg-card'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="text-2xl font-bold">{item.value}</p>
                                </div>
                                <div className={`p-2 rounded-full bg-muted ${item.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}