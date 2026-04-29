import { Suspense } from 'react';
import { getMemberIdeas } from '@/actions/member-idea.action';
import { IdeasHeader } from '@/components/modules/dashboard/member/ideas/IdeasHeader';
import { IdeasFilterBar } from '@/components/modules/dashboard/member/ideas/IdeasFilterBar';
import { IdeasPagination } from '@/components/modules/dashboard/member/ideas/IdeasPagination';
import { IdeasSkeleton } from '@/components/modules/dashboard/member/ideas/IdeasSkeleton';
import { IdeasTable } from '@/components/modules/dashboard/member/ideas/IdeasTable';

interface MemberIdeasPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        status?: string;
        sortBy?: string;
    }>;
}

async function IdeasContent({ searchParams }: { searchParams: Awaited<MemberIdeasPageProps['searchParams']> }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 10;
    
    const result = await getMemberIdeas({
        page,
        limit,
        search: searchParams.search,
        status: searchParams.status as any,
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
        <>
            <IdeasHeader stats={stats} />
            <IdeasFilterBar />
            <IdeasTable ideas={ideas} onUpdate={revalidate} />
            <IdeasPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </>
    );
}

export default async function MemberIdeasPage({ searchParams }: MemberIdeasPageProps) {
    const resolvedParams = await searchParams;
    
    return (
        <div className="container mx-auto">
            <Suspense fallback={<IdeasSkeleton />}>
                <IdeasContent searchParams={resolvedParams} />
            </Suspense>
        </div>
    );
}