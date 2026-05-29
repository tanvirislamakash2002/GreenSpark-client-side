import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getAllUsers } from "@/actions/user-management.action";
import { UsersStatsCards } from "@/components/modules/dashboard/admin/users/UsersStatsCards";
import { UsersFilterBar } from "@/components/modules/dashboard/admin/users/UsersFilterBar";
import { UsersPagination } from "@/components/modules/dashboard/admin/users/UsersPagination";
import { UsersSkeleton } from "@/components/modules/dashboard/admin/users/UsersSkeleton";
import { UsersTableWrapper } from "@/components/modules/dashboard/admin/users/UsersTableWrapper";

interface UsersPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        role?: string;
        status?: string;
        verified?: string;
        sort?: string;
        limit?: string;
    }>;
}

async function UsersContent({ searchParams }: { searchParams: Awaited<UsersPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = searchParams.limit ? parseInt(searchParams.limit) : 15;

    const result = await getAllUsers({
        page,
        limit,
        search: searchParams.search,
        role: searchParams.role,
        status: searchParams.status,
        verified: searchParams.verified,
        sort: searchParams.sort,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load users</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { users, pagination, stats } = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage all registered members of the platform</p>
            </div>

            {stats && <UsersStatsCards stats={stats} />}

            <UsersFilterBar />

            <UsersTableWrapper initialUsers={users} />

            <UsersPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const resolvedParams = await searchParams;
    
    return (
        <Suspense fallback={<UsersSkeleton />}>
            <UsersContent searchParams={resolvedParams} />
        </Suspense>
    );
}