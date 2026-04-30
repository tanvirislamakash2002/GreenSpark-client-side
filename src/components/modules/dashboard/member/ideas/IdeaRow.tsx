'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { MemberIdea } from '@/types/member-idea.type';
import { deleteIdea, submitIdea } from '@/actions/member-idea.action';
import { DeleteIdeaModal } from './DeleteIdeaModal';
import { FeedbackModal } from './FeedbackModal';
import { toast } from 'sonner';

interface IdeaRowProps {
    idea: MemberIdea;
    onUpdate: () => void;
}

export function IdeaRow({ idea, onUpdate }: IdeaRowProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canEdit = idea.status === 'DRAFT' || idea.status === 'REJECTED';
    const canDelete = idea.status === 'DRAFT' || idea.status === 'REJECTED';
    const canSubmit = idea.status === 'DRAFT';
    const hasFeedback = idea.status === 'REJECTED' && idea.feedback;

    const handleDelete = async () => {
        const result = await deleteIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message);
        }
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const result = await submitIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <StatusBadge status={idea.status} />
                        <span className="text-xs text-muted-foreground">
                            {new Date(idea.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <Link href={`/ideas/${idea.id}`} className="font-medium hover:text-green-600 transition-colors">
                        {idea.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{idea.category.name}</span>
                        <span>👍 {idea.voteScore}</span>
                        <span>👁️ {idea.viewCount}</span>
                        <span>💬 {idea.commentCount}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/ideas/${idea.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    
                    {canEdit && (
                        <Button asChild variant="ghost" size="sm">
                            <Link href={`/member/ideas/edit/${idea.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    
                    {canSubmit && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="text-green-600"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    )}
                    
                    {hasFeedback && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setIsFeedbackModalOpen(true)}
                            className="text-amber-600"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                    )}
                    
                    {canDelete && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
            
            <DeleteIdeaModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                ideaTitle={idea.title}
            />
            
            <FeedbackModal
                open={isFeedbackModalOpen}
                onOpenChange={setIsFeedbackModalOpen}
                feedback={idea.feedback || ''}
                ideaTitle={idea.title}
            />
        </>
    );
}