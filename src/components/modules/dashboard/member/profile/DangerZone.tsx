"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteMemberAccount } from "@/actions/profile/member-profile.action";
import { toast } from "sonner";

export function DangerZone() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmText, setConfirmText] = useState("");

    const handleDelete = async () => {
        if (confirmText !== "DELETE") return;
        
        setIsLoading(true);
        const result = await deleteMemberAccount();
        if (result && !result.success) {
            toast.error(result.message || "Failed to delete account");
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-500">
                    Permanently delete your account and all associated data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Delete Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove all your ideas, comments, and votes from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>
                                    Type <span className="font-mono font-bold">DELETE</span> to confirm
                                </Label>
                                <Input
                                    placeholder="DELETE"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={confirmText !== "DELETE" || isLoading}
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Permanently Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}