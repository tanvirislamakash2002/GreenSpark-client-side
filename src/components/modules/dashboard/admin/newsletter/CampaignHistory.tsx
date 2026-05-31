"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Mail, Eye, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types/newsletter.type";
import { getCampaigns } from "@/actions/newsletter/admin-newsletter.action";

export function CampaignHistory() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const result = await getCampaigns();
            if (result.success && result.data) {
                setCampaigns(result.data);
            }
            setIsLoading(false);
        };
        fetchCampaigns();
    }, []);

    const statusColors = {
        DRAFT: "bg-gray-100 text-gray-700",
        SENT: "bg-green-100 text-green-700",
        SCHEDULED: "bg-amber-100 text-amber-700",
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Campaign History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        Loading campaigns...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaign History</CardTitle>
            </CardHeader>
            <CardContent>
                {campaigns.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No campaigns sent yet</p>
                        <p className="text-sm">Send your first newsletter to see history</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="p-4 border rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-semibold">{campaign.subject}</h4>
                                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDistanceToNow(new Date(campaign.sentAt), { addSuffix: true })}
                                            </span>
                                            <span>To: {campaign.recipients} recipients</span>
                                            {campaign.openRate && (
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    Open: {campaign.openRate}%
                                                </span>
                                            )}
                                            {campaign.clickRate && (
                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="h-3 w-3" />
                                                    Click: {campaign.clickRate}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Badge className={statusColors[campaign.status]}>
                                        {campaign.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}