import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RecentUser } from "@/types/admin.type";

interface RecentUsersProps {
    users: RecentUser[];
}

export function RecentUsers({ users }: RecentUsersProps) {
    if (users.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No recent user registrations.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Registrations</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/admin/users">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.image || undefined} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                                <Badge variant={user.accountStatus === "ACTIVE" ? "default" : "destructive"} className="text-xs">
                                    {user.accountStatus}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}