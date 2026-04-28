import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface FeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    feedback: string;
    ideaTitle: string;
}

export function FeedbackModal({ open, onOpenChange, feedback, ideaTitle }: FeedbackModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <DialogTitle>Feedback for "{ideaTitle}"</DialogTitle>
                    </div>
                    <DialogDescription className="pt-4 whitespace-pre-wrap">
                        {feedback}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}