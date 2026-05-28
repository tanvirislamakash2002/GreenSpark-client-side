import { notFound } from 'next/navigation';
import { getIdeaById } from '@/actions/idea/idea.action';
import { IdeaDetailsHeader } from '@/components/modules/dashboard/member/ideas/details/IdeaDetailsHeader';
import { IdeaStats } from '@/components/modules/dashboard/member/ideas/details/IdeaStats';
import { IdeaContent } from '@/components/modules/dashboard/member/ideas/details/IdeaContent';
import { IdeaFeedback } from '@/components/modules/dashboard/member/ideas/details/IdeaFeedback';
import { IdeaStatusActions } from '@/components/modules/dashboard/member/ideas/details/IdeaStatusActions';
import { getSession } from '@/actions/auth.action';
import { IdeaNotFound } from '@/components/modules/dashboard/member/ideas/details/IdeaNotFound';

interface IdeaDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MemberIdeaDetailsPage({ params }: IdeaDetailsPageProps) {
    const { id } = await params;
    const session = await getSession();
    if (!session?.data?.user) {
        notFound();
    }

    const result = await getIdeaById(id);
    if (!result.success || !result.data) {
        return <IdeaNotFound />;
    }

    const idea = result.data;

    // Verify that the current user is the author
    if (idea.author.id !== session.data.user.id) {
        return <IdeaNotFound />;
    }
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <IdeaDetailsHeader
                title={idea.title}
                status={idea.status}
                authorName={idea.author.name}
                authorImage={idea.author.image}
                authorEmail={idea.author.email}
                createdAt={idea.createdAt}
            />

            <IdeaStats
                viewCount={idea.viewCount}
                voteScore={idea.voteScore}
                commentCount={idea.commentCount}
                createdAt={idea.createdAt}
            />

            <IdeaFeedback feedback={idea.feedback} />

            <IdeaContent
                problemStatement={idea.problemStatement}
                solution={idea.solution}
                description={idea.description}
                imageUrl={idea.imageUrl}
                isPaid={idea.isPaid}
                price={idea.price}
            />

            <IdeaStatusActions
                ideaId={idea.id}
                ideaTitle={idea.title}
                status={idea.status}
            />
        </div>
    );
}