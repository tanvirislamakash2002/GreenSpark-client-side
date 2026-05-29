import { Users, UserCheck, UserX, Shield, Mail, MailX, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserStats } from "@/types/user.type";

interface UsersStatsCardsProps {
    stats: UserStats;
}

const statItems = [
    { key: "totalUsers", label: "Total Users", icon: Users, color: "text-blue-500" },
    { key: "activeUsers", label: "Active", icon: UserCheck, color: "text-green-500" },
    { key: "suspendedUsers", label: "Suspended", icon: UserX, color: "text-orange-500" },
    { key: "bannedUsers", label: "Banned", icon: UserX, color: "text-red-500" },
    { key: "adminUsers", label: "Admins", icon: Shield, color: "text-purple-500" },
    { key: "verifiedEmails", label: "Verified", icon: Mail, color: "text-teal-500" },
    { key: "unverifiedEmails", label: "Unverified", icon: MailX, color: "text-gray-500" },
    { key: "newUsersThisMonth", label: "New This Month", icon: TrendingUp, color: "text-emerald-500" },
];

export function UsersStatsCards({ stats }: UsersStatsCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
            {statItems.map((item) => {
                const Icon = item.icon;
                const value = stats[item.key as keyof UserStats];
                return (
                    <Card key={item.key}>
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