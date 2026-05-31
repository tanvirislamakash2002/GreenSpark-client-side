"use client";

import { useState } from "react";
import { Loader2, Flag } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReportCommentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (reason: string) => void;
    isLoading: boolean;
}

export function ReportCommentModal({ open, onOpenChange, onConfirm, isLoading }: ReportCommentModalProps) {
    const [reason, setReason] = useState("");

    const handleConfirm = () => {
        if (reason.trim()) {
            onConfirm(reason);
            setReason("");
        }
    };

    const handleCancel = () => {
        setReason("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-red-500" />
                        <DialogTitle>Report Comment</DialogTitle>
                    </div>
                    <DialogDescription>
                        Please provide a reason for reporting this comment. This will help our moderators review it appropriately.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="reason">Reason *</Label>
                    <Textarea
                        id="reason"
                        placeholder="Explain why you're reporting this comment..."
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={isLoading || !reason.trim()} variant="destructive">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Report Comment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}