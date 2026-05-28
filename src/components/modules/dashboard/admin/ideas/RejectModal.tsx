'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RejectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (feedback: string) => void;
    ideaTitle: string;
    isLoading: boolean;
}

export function RejectModal({ open, onOpenChange, onConfirm, ideaTitle, isLoading }: RejectModalProps) {
    const [feedback, setFeedback] = useState('');

    const handleConfirm = () => {
        if (feedback.trim()) {
            onConfirm(feedback);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <DialogTitle>Reject Idea</DialogTitle>
                    </div>
                    <DialogDescription>
                        Provide feedback for "{ideaTitle}" to help the member improve their idea.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback *</Label>
                    <Textarea
                        id="feedback"
                        placeholder="Explain why this idea is being rejected and what needs improvement..."
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={isLoading || !feedback.trim()} variant="destructive">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Reject Idea
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}