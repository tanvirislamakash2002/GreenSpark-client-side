"use client";

import { useState } from "react";
import { Pencil, Save, X, Mail, Phone, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberProfile } from "@/types/profile/member-profile.type";
import { updateMemberProfile } from "@/actions/profile/member-profile.action";
import { toast } from "sonner";

interface ProfileInfoFormProps {
    profile: MemberProfile;
    onUpdate: () => void;
}

export function ProfileInfoForm({ profile, onUpdate }: ProfileInfoFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: profile.name,
        phone: profile.phone || "",
        address: profile.address || "",
    });

    const handleSubmit = async () => {
        setIsLoading(true);
        const result = await updateMemberProfile(formData);
        if (result.success) {
            toast.success(result.message);
            setIsEditing(false);
            onUpdate();
        } else {
            toast.error(result.message || "Failed to update profile");
        }
        setIsLoading(false);
    };

    const handleCancel = () => {
        setFormData({
            name: profile.name,
            phone: profile.phone || "",
            address: profile.address || "",
        });
        setIsEditing(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {isEditing ? (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    className="pl-9"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    className="pl-9"
                                    placeholder="Not provided"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="address"
                                    className="pl-9"
                                    placeholder="Not provided"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                                <Save className="h-4 w-4 ml-2" />
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                                <X className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </>
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
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{profile.phone || "Not provided"}</p>
                                <p className="text-xs text-muted-foreground">Phone Number</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{profile.address || "Not provided"}</p>
                                <p className="text-xs text-muted-foreground">Address</p>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}