"use client";

import { useState } from "react";
import { Bell, Mail, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NotificationPreferences } from "@/types/settings/admin-settings.type";
import { updateNotificationPreferences } from "@/actions/settings/admin-settings.action";
import { toast } from "sonner";

interface AdminNotificationPreferencesProps {
    initialPreferences: NotificationPreferences;
}

export function AdminNotificationPreferences({ initialPreferences }: AdminNotificationPreferencesProps) {
    const [preferences, setPreferences] = useState(initialPreferences);
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const handleToggle = (key: keyof NotificationPreferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setIsLoading(true);
        const result = await updateNotificationPreferences(preferences);
        if (result.success) {
            toast.success(result.message);
            setHasChanges(false);
        } else {
            toast.error(result.message || "Failed to update preferences");
        }
        setIsLoading(false);
    };

    const handleReset = () => {
        setPreferences(initialPreferences);
        setHasChanges(false);
    };

    const notificationItems = [
        { key: "newIdeaSubmissions", label: "New Idea Submissions", description: "Get notified when a member submits a new idea" },
        { key: "pendingReviewReminders", label: "Pending Review Reminders", description: "Receive daily reminders about ideas awaiting review" },
        { key: "reportedContent", label: "Reported Content Alerts", description: "Get instant alerts when content is reported" },
        { key: "weeklySummary", label: "Weekly Summary Report", description: "Receive a weekly summary of platform activity" },
        { key: "systemAnnouncements", label: "System Announcements", description: "Get notified about system updates and maintenance" },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <CardTitle>Notification Preferences</CardTitle>
                </div>
                {hasChanges && (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleReset} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={isLoading}>
                            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {notificationItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="space-y-0.5">
                            <Label className="text-base">{item.label}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                            checked={preferences[item.key as keyof NotificationPreferences]}
                            onCheckedChange={() => handleToggle(item.key as keyof NotificationPreferences)}
                        />
                    </div>
                ))}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">Email notifications will be sent to your admin email address</p>
                        <p className="text-xs text-muted-foreground">You can change your email in your account settings</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}