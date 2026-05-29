"use client";

import { useEffect, useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/user.type";
import { getUserDetails } from "@/actions/user-management.action";
import { Calendar, Lightbulb, MessageSquare, ThumbsUp, Mail, Shield, Clock } from "lucide-react";

interface UserDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId?: string;
    onUpdate: () => void;
}

export function UserDetailsModal({ open, onOpenChange, userId, onUpdate }: UserDetailsModalProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open && userId) {
            const fetchUser = async () => {
                setIsLoading(true);
                const result = await getUserDetails(userId!);
                if (result.success && result.data) {
                    setUser(result.data);
                }
                setIsLoading(false);
            };
            fetchUser();
        }
    }, [open, userId]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-40 w-full" />
                    </div>
                ) : user ? (
                    <>
                        {/* Profile Header */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={user.image || undefined} />
                                <AvatarFallback className="text-lg">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                    <Badge className={
                                        user.accountStatus === "ACTIVE" ? "bg-green-100 text-green-700" :
                                        user.accountStatus === "SUSPENDED" ? "bg-orange-100 text-orange-700" :
                                        "bg-red-100 text-red-700"
                                    }>
                                        {user.accountStatus}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="info">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="info">Information</TabsTrigger>
                                <TabsTrigger value="stats">Statistics</TabsTrigger>
                                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="info" className="space-y-3 mt-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg border">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{user.email}</p>
                                        <p className="text-xs text-muted-foreground">Email Address</p>
                                    </div>
                                    <Badge variant={user.emailVerified ? "default" : "destructive"} className="ml-auto">
                                        {user.emailVerified ? "Verified" : "Unverified"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg border">
                                    <Shield className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{user.role}</p>
                                        <p className="text-xs text-muted-foreground">Role</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg border">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
                                        <p className="text-xs text-muted-foreground">Joined Date</p>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="stats" className="space-y-3 mt-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                                        <Lightbulb className="h-5 w-5 text-amber-500" />
                                        <div>
                                            <p className="text-xl font-bold">{user._count?.ideas || 0}</p>
                                            <p className="text-xs text-muted-foreground">Total Ideas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                                        <MessageSquare className="h-5 w-5 text-teal-500" />
                                        <div>
                                            <p className="text-xl font-bold">{user._count?.comments || 0}</p>
                                            <p className="text-xs text-muted-foreground">Comments</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                                        <ThumbsUp className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <p className="text-xl font-bold">{user._count?.votes || 0}</p>
                                            <p className="text-xs text-muted-foreground">Votes Cast</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                                        <Clock className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">{user.lastActive ? formatDate(user.lastActive) : "N/A"}</p>
                                            <p className="text-xs text-muted-foreground">Last Active</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="activity" className="mt-4">
                                <p className="text-center text-muted-foreground py-8">
                                    Activity log coming soon...
                                </p>
                            </TabsContent>
                        </Tabs>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">User not found</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}