'use client';

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ApproveModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    ideaTitle: string;
    isLoading: boolean;
}

export function ApproveModal({ open, onOpenChange, onConfirm, ideaTitle, isLoading }: ApproveModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <DialogTitle>Approve Idea</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to approve "{ideaTitle}"? This idea will become publicly visible.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Approve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}