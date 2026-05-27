import { getIdeas } from '@/actions/idea.action';
import { IdeasHeader } from '@/components/modules/public/ideas/IdeasHeader';
import { IdeasFilterBar } from '@/components/modules/public/ideas/IdeasFilterBar';
import { IdeasGrid } from '@/components/modules/public/ideas/IdeasGrid';
import { IdeasPagination } from '@/components/modules/public/ideas/IdeasPagination';

interface IdeasPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
        status?: string;
        sortBy?: string;
    }>;
}

export default async function IdeasPage({ searchParams }: IdeasPageProps) {
    const params = await searchParams;
    
    const page = params.page ? parseInt(params.page) : 1;
    const limit = 12;
    
    const result = await getIdeas({
        page,
        limit,
        search: params.search,
        category: params.category,
        status: params.status as any,
        sortBy: params.sortBy as any,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load ideas</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { ideas, pagination } = result.data;

    return (
        <div className="container mx-auto px-4 py-12">
            <IdeasHeader totalItems={pagination.totalItems} />
            <IdeasFilterBar />
            <IdeasGrid ideas={ideas} />
            <IdeasPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}