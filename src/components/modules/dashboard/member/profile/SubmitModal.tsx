"use client";

import { Loader2, Send } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    ideaTitle: string;
    isLoading: boolean;
}

export function SubmitModal({ open, onOpenChange, onConfirm, ideaTitle, isLoading }: SubmitModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Send className="h-5 w-5 text-amber-500" />
                        <DialogTitle>Submit for Review</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to submit "{ideaTitle}" for admin review? Once submitted, you cannot edit it until it is reviewed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} className="bg-amber-600 hover:bg-amber-700">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Submit for Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}