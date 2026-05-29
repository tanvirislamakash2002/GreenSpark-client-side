"use client";

import { useState } from "react";
import { User, Mail, Shield, Calendar, Camera, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AdminProfile } from "@/types/settings/admin-settings.type";
import { updateAdminProfile } from "@/actions/settings/admin-settings.action";
import { toast } from "sonner";

interface AdminProfileCardProps {
    profile: AdminProfile;
    onUpdate: () => void;
}

export function AdminProfileCard({ profile, onUpdate }: AdminProfileCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(profile.name);

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

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        setIsLoading(true);
        const result = await updateAdminProfile({ name });
        if (result.success) {
            toast.success(result.message);
            setIsEditing(false);
            onUpdate();
        } else {
            toast.error(result.message || "Failed to update profile");
        }
        setIsLoading(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={profile.image || undefined} />
                        <AvatarFallback className="text-lg bg-green-100 text-green-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Admin Avatar</p>
                        <p className="text-xs text-muted-foreground">Click on avatar to change</p>
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    className="pl-9"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={() => {
                                setName(profile.name);
                                setIsEditing(false);
                            }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{profile.name}</p>
                                <p className="text-xs text-muted-foreground">Full Name</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{profile.email}</p>
                                <p className="text-xs text-muted-foreground">Email Address</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">{profile.role}</p>
                                    <Badge className="bg-green-100 text-green-700">Administrator</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Role</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{memberSince}</p>
                                <p className="text-xs text-muted-foreground">Admin Since</p>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}