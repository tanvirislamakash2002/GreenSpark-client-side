'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteIdea, submitIdea } from '@/actions/member-idea.action';
import { DeleteIdeaModal } from '@/components/modules/dashboard/member/ideas/DeleteIdeaModal';

interface IdeaStatusActionsProps {
    ideaId: string;
    ideaTitle: string;
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

export function IdeaStatusActions({ ideaId, ideaTitle, status }: IdeaStatusActionsProps) {
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canEdit = status === 'DRAFT' || status === 'REJECTED';
    const canDelete = status === 'DRAFT' || status === 'REJECTED';
    const canSubmit = status === 'DRAFT';

    const handleDelete = async () => {
        const result = await deleteIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
            router.push('/dashboard/member/ideas');
        } else {
            toast.error(result.message);
        }
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const result = await submitIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
            router.push('/dashboard/member/ideas');
        } else {
            toast.error(result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="flex flex-wrap gap-3 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                {canEdit && (
                    <Button asChild variant="outline">
                        <Link href={`/dashboard/member/ideas/edit/${ideaId}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Idea
                        </Link>
                    </Button>
                )}

                {canSubmit && (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                    </Button>
                )}

                {canDelete && (
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Idea
                    </Button>
                )}
            </div>

            <DeleteIdeaModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                ideaTitle={ideaTitle}
            />
        </>
    );
}

// Import Link for the edit button
import Link from 'next/link';