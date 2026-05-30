import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getUserVotes } from "@/actions/vote.action";
import { getAllCategories } from "@/actions/category.action";
import { MyVotesHeader } from "@/components/modules/dashboard/member/votes/MyVotesHeader";
import { VotesFilterBar } from "@/components/modules/dashboard/member/votes/VotesFilterBar";
import { VotesList } from "@/components/modules/dashboard/member/votes/VotesList";
import { VotesPagination } from "@/components/modules/dashboard/member/votes/VotesPagination";

interface MyVotesPageProps {
    searchParams: Promise<{
        page?: string;
        voteType?: string;
        sortBy?: string;
        search?: string;
        category?: string;
    }>;
}

async function MyVotesContent({ searchParams }: { searchParams: Awaited<MyVotesPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user) {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 10;

    const [votesResult, categoriesResult] = await Promise.all([
        getUserVotes({
            voteType: searchParams.voteType,
            sortBy: searchParams.sortBy,
            search: searchParams.search,
            category: searchParams.category,
            page,
            limit,
        }),
        getAllCategories(),
    ]);

    const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

    if (!votesResult.success || !votesResult.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load votes</h2>
                <p className="text-muted-foreground">{votesResult.message || "Please try again later"}</p>
            </div>
        );
    }

    const { votes, stats, pagination } = votesResult.data;
    const currentVoteType = searchParams.voteType || "all";

    const revalidate = async () => {
        "use server";
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <MyVotesHeader 
                totalVotes={stats.totalVotes}
                upvotes={stats.upvotes}
                downvotes={stats.downvotes}
            />
            <VotesFilterBar categories={categories} />
            <VotesList 
                votes={votes} 
                voteType={currentVoteType}
                onVoteChange={revalidate}
            />
            <VotesPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function MyVotesPage({ searchParams }: MyVotesPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <MyVotesContent searchParams={resolvedParams} />
    );
}