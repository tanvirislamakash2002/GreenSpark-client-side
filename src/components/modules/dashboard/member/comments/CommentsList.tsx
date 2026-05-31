import { UserComment } from "@/types/comment/comment.type";
import { CommentCard } from "./CommentCard";
import { EmptyState } from "./EmptyState";

interface CommentsListProps {
    comments: UserComment[];
    onCommentUpdate: () => void;
}

export function CommentsList({ comments, onCommentUpdate }: CommentsListProps) {
    if (comments.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} onCommentUpdate={onCommentUpdate} />
            ))}
        </div>
    );
}