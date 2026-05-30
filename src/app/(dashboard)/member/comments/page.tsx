import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getUserComments } from "@/actions/comment.action";
import { MyCommentsHeader } from "@/components/modules/dashboard/member/comments/MyCommentsHeader";
import { CommentsFilterBar } from "@/components/modules/dashboard/member/comments/CommentsFilterBar";
import { CommentsList } from "@/components/modules/dashboard/member/comments/CommentsList";
import { CommentsPagination } from "@/components/modules/dashboard/member/comments/CommentsPagination";

interface MyCommentsPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        sortBy?: string;
        dateRange?: string;
    }>;
}

async function MyCommentsContent({ searchParams }: { searchParams: Awaited<MyCommentsPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user) {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 10;

    const result = await getUserComments({
        search: searchParams.search,
        sortBy: searchParams.sortBy,
        dateRange: searchParams.dateRange,
        page,
        limit,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load comments</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { comments, stats, pagination } = result.data;

    const revalidate = async () => {
        "use server";
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <MyCommentsHeader 
                totalComments={stats.totalComments}
                mostActiveIdea={stats.mostActiveIdea}
                lastCommentDate={stats.lastCommentDate}
            />
            <CommentsFilterBar />
            <CommentsList comments={comments} onCommentUpdate={revalidate} />
            <CommentsPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function MyCommentsPage({ searchParams }: MyCommentsPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <MyCommentsContent searchParams={resolvedParams} />
    );
}