import { AdminComment } from "@/types/comment/admin-comment.type";
import { AdminCommentRow } from "./AdminCommentRow";
import { MessageCircle } from "lucide-react";

interface AdminCommentsListProps {
    comments: AdminComment[];
    onUpdate: () => void;
}

export function AdminCommentsList({ comments, onUpdate }: AdminCommentsListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No comments found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {comments.map((comment) => (
                <AdminCommentRow key={comment.id} comment={comment} onUpdate={onUpdate} />
            ))}
        </div>
    );
}