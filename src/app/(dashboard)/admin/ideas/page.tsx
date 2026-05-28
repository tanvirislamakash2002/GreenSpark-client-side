import { getAdminIdeas } from '@/actions/idea/admin-idea.action';
import { AdminIdeasFilterBar } from '@/components/modules/dashboard/admin/ideas/AdminIdeasFilterBar';
import { AdminIdeasHeader } from '@/components/modules/dashboard/admin/ideas/AdminIdeasHeader';
import { AdminIdeasPagination } from '@/components/modules/dashboard/admin/ideas/AdminIdeasPagination';
import { AdminIdeasStats } from '@/components/modules/dashboard/admin/ideas/AdminIdeasStats';
import { AdminIdeasTable } from '@/components/modules/dashboard/admin/ideas/AdminIdeasTable';

interface AdminIdeasPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
        status?: string;
        sortBy?: string;
    }>;
}

async function AdminIdeasContent({ searchParams }: { searchParams: Awaited<AdminIdeasPageProps['searchParams']> }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 10;
    
    const result = await getAdminIdeas({
        page,
        limit,
        search: searchParams.search,
        category: searchParams.category,
        status: searchParams.status,
        sortBy: searchParams.sortBy as any,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load ideas</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { ideas, pagination, stats } = result.data;

    const revalidate = async () => {
        'use server';
        // This will trigger a re-fetch
    };
    return (
        <div className="container mx-auto">
            <AdminIdeasHeader totalItems={pagination.totalItems} />
            <AdminIdeasStats stats={stats} />
            <AdminIdeasFilterBar />
            <AdminIdeasTable ideas={ideas} onUpdate={revalidate} />
            <AdminIdeasPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function AdminIdeasPage({ searchParams }: AdminIdeasPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <AdminIdeasContent searchParams={resolvedParams} />
    );
}