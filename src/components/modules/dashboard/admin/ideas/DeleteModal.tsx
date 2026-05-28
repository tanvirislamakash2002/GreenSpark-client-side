'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    ideaTitle: string;
    isLoading: boolean;
}

export function DeleteModal({ open, onOpenChange, onConfirm, ideaTitle, isLoading }: DeleteModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        <DialogTitle>Delete Idea</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to permanently delete "{ideaTitle}"? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} variant="destructive">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}