import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getAdminComments } from "@/actions/comment/admin-comment.action";
import { AdminCommentsHeader } from "@/components/modules/dashboard/admin/comments/AdminCommentsHeader";
import { AdminCommentsFilterBar } from "@/components/modules/dashboard/admin/comments/AdminCommentsFilterBar";
import { AdminCommentsList } from "@/components/modules/dashboard/admin/comments/AdminCommentsList";
import { AdminCommentsPagination } from "@/components/modules/dashboard/admin/comments/AdminCommentsPagination";

interface AdminCommentsPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        status?: string;
        reportStatus?: string;
        sortBy?: string;
    }>;
}

async function AdminCommentsContent({ searchParams }: { searchParams: Awaited<AdminCommentsPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 15;

    const result = await getAdminComments({
        page,
        limit,
        search: searchParams.search,
        status: searchParams.status as any,
        reportStatus: searchParams.reportStatus as any,
        sortBy: searchParams.sortBy as any,
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
        <div className="container mx-auto px-4 py-8">
            <AdminCommentsHeader stats={stats} />
            <AdminCommentsFilterBar />
            <AdminCommentsList comments={comments} onUpdate={revalidate} />
            <AdminCommentsPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function AdminCommentsPage({ searchParams }: AdminCommentsPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <AdminCommentsContent searchParams={resolvedParams} />
    );
}