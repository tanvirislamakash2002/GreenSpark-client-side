"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet, Globe, LogOut, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Session } from "@/types/settings/admin-settings.type";
import { revokeAdminSession, revokeAllAdminSessions } from "@/actions/settings/admin-settings.action";
import { toast } from "sonner";

interface AdminSessionsCardProps {
    sessions: Session[];
    onUpdate: () => void;
}

function getDeviceIcon(userAgent: string) {
    if (userAgent.includes("Mobile")) return <Smartphone className="h-4 w-4" />;
    if (userAgent.includes("Tablet")) return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
}

export function AdminSessionsCard({ sessions, onUpdate }: AdminSessionsCardProps) {
    const [isRevoking, setIsRevoking] = useState<string | null>(null);
    const [isRevokeAllOpen, setIsRevokeAllOpen] = useState(false);
    const [isRevokingAll, setIsRevokingAll] = useState(false);

    const currentSession = sessions.find(s => s.isCurrent);
    const otherSessions = sessions.filter(s => !s.isCurrent);

    const handleRevoke = async (sessionId: string) => {
        setIsRevoking(sessionId);
        const result = await revokeAdminSession(sessionId);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message || "Failed to revoke session");
        }
        setIsRevoking(null);
    };

    const handleRevokeAll = async () => {
        setIsRevokingAll(true);
        const result = await revokeAllAdminSessions();
        if (result.success) {
            toast.success(result.message);
            onUpdate();
            setIsRevokeAllOpen(false);
        } else {
            toast.error(result.message || "Failed to revoke sessions");
        }
        setIsRevokingAll(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Sessions</CardTitle>
                {otherSessions.length > 0 && (
                    <Dialog open={isRevokeAllOpen} onOpenChange={setIsRevokeAllOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout All Other Devices
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    <DialogTitle>Logout All Other Devices</DialogTitle>
                                </div>
                                <DialogDescription>
                                    This will log you out from all other devices except your current one.
                                    You will need to log in again on those devices.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsRevokeAllOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleRevokeAll} disabled={isRevokingAll}>
                                    {isRevokingAll && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Logout All Other Devices
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Current Session */}
                {currentSession && (
                    <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-green-100">
                                    {getDeviceIcon(currentSession.userAgent)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">Current Session</p>
                                        <Badge className="bg-green-500">Active Now</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {currentSession.userAgent} • {currentSession.ipAddress}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Started: {formatDate(currentSession.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Sessions */}
                {otherSessions.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Other Devices</p>
                        {otherSessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-muted">
                                        {getDeviceIcon(session.userAgent)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{session.userAgent}</p>
                                        <p className="text-xs text-muted-foreground">{session.ipAddress}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Expires: {formatDate(session.expiresAt)}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRevoke(session.id)}
                                    disabled={isRevoking === session.id}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    {isRevoking === session.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <LogOut className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {otherSessions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No other active sessions</p>
                        <p className="text-sm">You are only logged in on this device</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}