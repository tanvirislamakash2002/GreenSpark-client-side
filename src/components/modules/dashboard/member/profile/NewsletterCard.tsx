"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { updateNewsletterSubscription } from "@/actions/profile/member-profile.action";
import { toast } from "sonner";

interface NewsletterCardProps {
    isSubscribed: boolean;
    email: string;
}

export function NewsletterCard({ isSubscribed: initialSubscribed, email }: NewsletterCardProps) {
    const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async (checked: boolean) => {
        setIsLoading(true);
        const result = await updateNewsletterSubscription(checked);
        if (result.success) {
            setIsSubscribed(checked);
            toast.success(result.message);
        } else {
            toast.error(result.message || "Failed to update subscription");
        }
        setIsLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Newsletter Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Email Updates</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive updates about new ideas, top voted ideas, and announcements
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Switch checked={isSubscribed} onCheckedChange={handleToggle} />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{email}</span>
                </div>
            </CardContent>
        </Card>
    );
}