import { Suspense } from 'react';
import { Metadata } from 'next';
import { getBlogPosts, getPopularPosts, getRecentPosts, getCategoryCounts } from '@/actions/blog.action';
import { BlogHero } from '@/components/modules/public/blog/BlogHero';
import { BlogSearch } from '@/components/modules/public/blog/BlogSearch';
import { BlogCategoryFilter } from '@/components/modules/public/blog/BlogCategoryFilter';
import { FeaturedPost } from '@/components/modules/public/blog/FeaturedPost';
import { BlogGrid } from '@/components/modules/public/blog/BlogGrid';
import { BlogPagination } from '@/components/modules/public/blog/BlogPagination';
import { BlogSidebar } from '@/components/modules/public/blog/BlogSidebar';
import { NewsletterSection } from '@/components/modules/public/blog/NewsletterSection';
import { BlogSkeleton } from '@/components/modules/public/blog/BlogSkeleton';


interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
    }>;
}

export const metadata: Metadata = {
    title: 'GreenSpark Blog - Sustainability Insights & Eco Tips',
    description: 'Discover practical sustainability tips, inspiring success stories, and the latest eco-innovations. Join our community of changemakers building a greener future.',
    keywords: 'sustainability blog, eco tips, green living, environmental news, sustainable innovation',
};

async function BlogContent({ searchParams }: { searchParams: Awaited<BlogPageProps['searchParams']> }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 6;

    const [postsResult, popularPosts, recentPosts, categoryCounts] = await Promise.all([
        getBlogPosts({
            page,
            limit,
            search: searchParams.search,
            category: searchParams.category as any,
        }),
        getPopularPosts(5),
        getRecentPosts(5),
        getCategoryCounts(),
    ]);

    if (!postsResult.success || !postsResult.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load blog posts</h2>
                <p className="text-muted-foreground">{postsResult.message || 'Please try again later'}</p>
            </div>
        );
    }

    const { posts, featuredPost, pagination } = postsResult.data;

    return (
        <div className="container mx-auto px-4 py-12">
            <BlogHero />
            <BlogSearch />
            <BlogCategoryFilter categoryCounts={categoryCounts} />

            <div className="grid md:grid-cols-2 gap-8">
                {/* Main Content */}
                <div className="">
                    {featuredPost && <FeaturedPost post={featuredPost} />}
                    <BlogGrid posts={posts} />
                    <BlogPagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                    />
                </div>

                {/* Sidebar */}
                <div className="">
                    <BlogSidebar
                        popularPosts={popularPosts}
                        recentPosts={recentPosts}
                        categoryCounts={categoryCounts}
                    />
                </div>
            </div>

            <NewsletterSection />
        </div>
    );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedParams = await searchParams;

    return (
        <main className="min-h-screen">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-12">
                    <BlogHero />
                    <BlogSkeleton />
                </div>
            }>
                <BlogContent searchParams={resolvedParams} />
            </Suspense>
        </main>
    );
}