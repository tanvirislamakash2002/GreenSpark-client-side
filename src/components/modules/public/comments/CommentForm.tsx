"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface CommentFormProps {
    isAuthenticated: boolean;
    userImage?: string | null;
    userName?: string;
    onSubmit: (content: string) => Promise<void>;
    placeholder?: string;
    isReply?: boolean;
    onCancel?: () => void;
}

export function CommentForm({ 
    isAuthenticated, 
    userImage, 
    userName,
    onSubmit, 
    placeholder = "Share your thoughts...",
    isReply = false,
    onCancel 
}: CommentFormProps) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error("Please enter a comment");
            return;
        }

        setIsSubmitting(true);
        await onSubmit(content);
        setContent("");
        setIsSubmitting(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="p-4 rounded-lg bg-muted/30 text-center">
                <p className="text-muted-foreground">
                    Please login to join the discussion.
                </p>
            </div>
        );
    }

    return (
        <div className={`flex gap-3 ${isReply ? 'mt-3' : ''}`}>
            <Avatar className="h-8 w-8">
                <AvatarImage src={userImage || undefined} />
                <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Textarea
                    placeholder={placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={isReply ? 3 : 4}
                    className="resize-none"
                />
                <div className="flex gap-2 mt-2">
                    <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || !content.trim()}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? "Posting..." : isReply ? "Reply" : "Post Comment"}
                    </Button>
                    {onCancel && (
                        <Button variant="outline" size="sm" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}