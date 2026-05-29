import { getAdminDashboardData } from "@/actions/admin.action";
import { AdminWelcome } from "@/components/modules/dashboard/admin/admin-dashboard/AdminWelcome";
import { AdminStats } from "@/components/modules/dashboard/admin/admin-dashboard/AdminStats";
import { PendingApprovalList } from "@/components/modules/dashboard/admin/admin-dashboard/PendingApprovalList";
import { RecentActivity } from "@/components/modules/dashboard/admin/admin-dashboard/RecentActivity";
import { AnalyticsSnapshot } from "@/components/modules/dashboard/admin/admin-dashboard/AnalyticsSnapshot";
import { TopContributors } from "@/components/modules/dashboard/admin/admin-dashboard/TopContributors";
import { RecentUsers } from "@/components/modules/dashboard/admin/admin-dashboard/RecentUsers";
import { ReportedAlert } from "@/components/modules/dashboard/admin/admin-dashboard/ReportedAlert";
import { QuickActions } from "@/components/modules/dashboard/admin/admin-dashboard/QuickActions";
import { getSession } from "@/actions/auth.action";

export default async function AdminDashboardPage() {
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