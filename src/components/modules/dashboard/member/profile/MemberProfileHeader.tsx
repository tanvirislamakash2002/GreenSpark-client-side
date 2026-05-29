import { Shield, Calendar, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MemberProfile } from "@/types/profile/member-profile.type";

interface MemberProfileHeaderProps {
    profile: MemberProfile;
}

export function MemberProfileHeader({ profile }: MemberProfileHeaderProps) {
    const initials = profile.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                        <AvatarImage src={profile.image || undefined} />
                        <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {profile.name}
                            </h1>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <Shield className="h-3 w-3 mr-1" />
                                Member
                            </Badge>
                            {profile.emailVerified && (
                                <Badge variant="outline" className="text-green-600">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground mb-1">{profile.email}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Member since {memberSince}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}