import { Suspense } from "react";
import { getAdminDashboardData } from "@/actions/admin.action";
import { AdminWelcome } from "@/components/modules/dashboard/admin/AdminWelcome";
import { AdminStats } from "@/components/modules/dashboard/admin/AdminStats";
import { PendingApprovalList } from "@/components/modules/dashboard/admin/PendingApprovalList";
import { RecentActivity } from "@/components/modules/dashboard/admin/RecentActivity";
import { AnalyticsSnapshot } from "@/components/modules/dashboard/admin/AnalyticsSnapshot";
import { TopContributors } from "@/components/modules/dashboard/admin/TopContributors";
import { RecentUsers } from "@/components/modules/dashboard/admin/RecentUsers";
import { ReportedAlert } from "@/components/modules/dashboard/admin/ReportedAlert";
import { QuickActions } from "@/components/modules/dashboard/admin/QuickActions";
import { AdminDashboardSkeleton } from "@/components/modules/dashboard/admin/AdminDashboardSkeleton";
import { getSession } from "@/actions/auth.action";

async function DashboardContent() {
    const { data: session } = await getSession();
    const result = await getAdminDashboardData();

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load dashboard</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { stats, pendingIdeas, recentActivity, topContributors, recentUsers, reportedCommentsCount, chartData } = result.data;

    return (
        <div className="container mx-auto space-y-6">
            <AdminWelcome 
                name={session!.user.name} 
                email={session!.user.email}
            />
            
            <AdminStats stats={stats} />
            
            <ReportedAlert count={reportedCommentsCount} />
            
            <PendingApprovalList ideas={pendingIdeas} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <RecentActivity activities={recentActivity} />
                    <AnalyticsSnapshot chartData={chartData} />
                </div>
                <div className="space-y-6">
                    <TopContributors contributors={topContributors} />
                    <RecentUsers users={recentUsers} />
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

export default async function AdminDashboardPage() {
    return (
        <Suspense fallback={<AdminDashboardSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}