"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { clearAdminCache } from "@/actions/settings/admin-settings.action";
import { toast } from "sonner";

export function AdminDangerZone() {
    const [isClearCacheOpen, setIsClearCacheOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const handleClearCache = async () => {
        setIsClearing(true);
        const result = await clearAdminCache();
        if (result.success) {
            toast.success(result.message);
            setIsClearCacheOpen(false);
        } else {
            toast.error(result.message || "Failed to clear cache");
        }
        setIsClearing(false);
    };

    return (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-500">
                    These actions can have significant impact on the platform
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-red-950/40">
                    <div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-red-500" />
                            <p className="font-medium">Clear System Cache</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Clear all cached data to refresh the platform</p>
                    </div>
                    <Dialog open={isClearCacheOpen} onOpenChange={setIsClearCacheOpen}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-100"
                            onClick={() => setIsClearCacheOpen(true)}
                        >
                            Clear Cache
                        </Button>
                        <DialogContent>
                            <DialogHeader>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    <DialogTitle>Clear System Cache</DialogTitle>
                                </div>
                                <DialogDescription>
                                    This will clear all cached data across the platform. The next request will
                                    fetch fresh data from the database. This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsClearCacheOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleClearCache} disabled={isClearing}>
                                    {isClearing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Clear Cache
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
}