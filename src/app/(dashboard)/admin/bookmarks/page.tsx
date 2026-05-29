import { getUserBookmarks } from '@/actions/bookmark.action';
import { BookmarksHeader } from '@/components/modules/dashboard/shared/bookmarks/BookmarksHeader';
import { BookmarksFilterBar } from '@/components/modules/dashboard/shared/bookmarks/BookmarksFilterBar';
import { BookmarksGrid } from '@/components/modules/dashboard/shared/bookmarks/BookmarksGrid';
import { BookmarksPagination } from '@/components/modules/dashboard/shared/bookmarks/BookmarksPagination';

interface AdminBookmarksPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
        sortBy?: string;
    }>;
}

async function AdminBookmarksContent({ searchParams }: { searchParams: Awaited<AdminBookmarksPageProps['searchParams']> }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 9;
    
    const result = await getUserBookmarks({
        page,
        limit,
        search: searchParams.search,
        category: searchParams.category,
        sortBy: searchParams.sortBy as any,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load bookmarks</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { bookmarks, pagination } = result.data;

    const revalidate = async () => {
        'use server';
    };

    return (
        <div className="container mx-auto">
            <BookmarksHeader totalItems={pagination.totalItems} />
            <BookmarksFilterBar />
            <BookmarksGrid bookmarks={bookmarks} onRemove={revalidate} />
            <BookmarksPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function AdminBookmarksPage({ searchParams }: AdminBookmarksPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <AdminBookmarksContent searchParams={resolvedParams} />
    );
}