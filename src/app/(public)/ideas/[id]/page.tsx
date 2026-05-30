import { notFound } from "next/navigation";
import { getIdeaById } from "@/actions/idea/idea.action";
import { getSession } from "@/actions/auth.action";
import { IdeaNotFound } from "@/components/modules/public/idea-details/IdeaNotFound";
import { IdeaDetailsHeader } from "@/components/modules/public/idea-details/IdeaDetailsHeader";
import { IdeaStats } from "@/components/modules/public/idea-details/IdeaStats";
import { IdeaContent } from "@/components/modules/public/idea-details/IdeaContent";
import { IdeaActions } from "@/components/modules/public/idea-details/IdeaActions";
import { CommentsSection } from "@/components/modules/public/comments/CommentsSection";

interface IdeaDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function IdeaDetailsPage({ params }: IdeaDetailsPageProps) {
    const { id } = await params;
    const session = await getSession();
    const isAuthenticated = !!session?.data?.user;
    const isAdmin = session?.data?.user?.role === 'ADMIN';

    const result = await getIdeaById(id);

    if (!result.success || !result.data) {
        return <IdeaNotFound />;
    }
    const idea = result.data;

    // Only show approved ideas to public
    if (idea.status !== "APPROVED" && !isAdmin) {
        return <IdeaNotFound />;
    }

        const hasAccess = !idea.isPaid || (idea.hasFullAccess === true);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <IdeaDetailsHeader
                title={idea.title}
                status={idea.status}
                isPaid={idea.isPaid}
                authorName={idea.author.name}
                authorImage={idea.author.image}
                authorEmail={idea.author.email}
                createdAt={idea.createdAt}
                categories={idea.categories}
            />

            <IdeaStats
                viewCount={idea.viewCount}
                voteScore={idea.voteScore}
                commentCount={idea.commentCount}
                isPaid={idea.isPaid}
                price={idea.price}
            />

            <IdeaContent
                problemStatement={idea.problemStatement}
                solution={idea.solution}
                description={idea.description}
                imageUrl={idea.imageUrl}
            />

            <IdeaActions
                ideaId={idea.id}
                ideaTitle={idea.title}
                isPaid={idea.isPaid}
                hasAccess={hasAccess}
                initialVoteScore={idea.voteScore}
                isAuthenticated={isAuthenticated}
                userId={session?.data?.user?.id}
                price={idea.price}
            />

            <CommentsSection ideaId={idea.id} />
        </div>
    );
}