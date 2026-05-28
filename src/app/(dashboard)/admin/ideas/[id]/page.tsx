import { notFound } from "next/navigation";
import { getIdeaById } from "@/actions/idea/idea.action";
import { getSession } from "@/actions/auth.action";
import { AdminIdeaNotFound } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaNotFound";
import { AdminIdeaDetailsHeader } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaDetailsHeader";
import { AdminIdeaStats } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaStats";
import { AdminIdeaFeedback } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaFeedback";
import { AdminIdeaContent } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaContent";
import { AdminIdeaActions } from "@/components/modules/dashboard/admin/idea-details/AdminIdeaActions";

interface AdminIdeaDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminIdeaDetailsPage({ params }: AdminIdeaDetailsPageProps) {
    const { id } = await params;
    const session = await getSession();

    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const result = await getIdeaById(id);

    if (!result.success || !result.data) {
        return <AdminIdeaNotFound />;
    }

    const idea = result.data;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <AdminIdeaDetailsHeader
                title={idea.title}
                status={idea.status}
                isPaid={idea.isPaid}
                authorName={idea.author.name}
                authorImage={idea.author.image}
                authorEmail={idea.author.email}
                createdAt={idea.createdAt}
                categories={idea.categories}
            />

            <AdminIdeaStats
                viewCount={idea.viewCount}
                voteScore={idea.voteScore}
                commentCount={idea.commentCount}
                isPaid={idea.isPaid}
                price={idea.price}
                status={idea.status}
            />

            <AdminIdeaFeedback feedback={idea.feedback} />

            <AdminIdeaContent
                problemStatement={idea.problemStatement}
                solution={idea.solution}
                description={idea.description}
                imageUrl={idea.imageUrl}
            />

            <AdminIdeaActions
                ideaId={idea.id}
                ideaTitle={idea.title}
                status={idea.status}
            />
        </div>
    );
}