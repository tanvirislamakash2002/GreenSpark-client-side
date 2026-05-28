import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getIdeaById } from '@/actions/idea/idea.action';
import { getSession } from '@/actions/auth.action';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EditIdeaForm } from '@/components/modules/dashboard/member/edit-idea/EditIdeaForm';
import { EditFormSkeleton } from '@/components/modules/dashboard/member/edit-idea/EditFormSkeleton';

interface EditIdeaPageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Edit Idea - GreenSpark',
    description: 'Update your sustainability idea',
};

async function EditIdeaContent({ id }: { id: string }) {
    const session = await getSession();
    
    if (!session?.data?.user) {
        notFound();
    }

    const result = await getIdeaById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const idea = result.data;

    // Verify that the current user is the author
    if (idea.author.id !== session.data.user.id) {
        notFound();
    }

    // Only allow editing of DRAFT or REJECTED ideas
    if (idea.status !== 'DRAFT' && idea.status !== 'REJECTED') {
        return (
            <div className="container mx-auto py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Cannot Edit Idea</h1>
                <p className="text-muted-foreground mb-6">
                    This idea has already been submitted for review or has been approved.
                    Only draft or rejected ideas can be edited.
                </p>
                <Button asChild variant="outline">
                    <Link href="/dashboard/member/ideas">
                        Back to My Ideas
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Your Idea</h1>
                <p className="text-muted-foreground">
                    Update your sustainability idea and make it even better
                </p>
            </div>
            <EditIdeaForm idea={idea} />
        </div>
    );
}

export default async function EditIdeaPage({ params }: EditIdeaPageProps) {
    const { id } = await params;
    
    return (
        <Suspense fallback={<EditFormSkeleton />}>
            <EditIdeaContent id={id} />
        </Suspense>
    );
}