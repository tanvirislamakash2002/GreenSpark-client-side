import { getSession } from "@/actions/auth.action";
import { getDashboardData } from "@/actions/member.action";
import { DashboardSkeleton } from "@/components/modules/dashboard/member/member-dashboard/DashboardSkeleton";
import { MemberBookmarksPreview } from "@/components/modules/dashboard/member/member-dashboard/MemberBookmarksPreview";
import { MemberIdeasPreview } from "@/components/modules/dashboard/member/member-dashboard/MemberIdeasPreview";
import { MemberRecentActivity } from "@/components/modules/dashboard/member/member-dashboard/MemberRecentActivity";
import { MemberStats } from "@/components/modules/dashboard/member/member-dashboard/MemberStats";
import { MemberVotesPreview } from "@/components/modules/dashboard/member/member-dashboard/MemberVotesPreview";
import { MemberWelcome } from "@/components/modules/dashboard/member/member-dashboard/MemberWelcome";
import { PendingApprovalAlert } from "@/components/modules/dashboard/member/member-dashboard/PendingApprovalAlert";
import { Suspense } from "react";

async function DashboardContent() {
    const { data: session } = await getSession();
    const result = await getDashboardData();

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load dashboard</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { stats, recentIdeas, recentActivity, recentBookmarks, recentVotes, pendingCount } = result.data;

    return (
        <div className="space-y-6">
            <MemberWelcome
                name={session!.user.name}
                email={session!.user.email}
                image={session!.user.image}
                memberSince={stats.memberSince}
            />
            
            <MemberStats stats={stats} />
            
            <PendingApprovalAlert pendingCount={pendingCount} />
            
            <MemberIdeasPreview ideas={recentIdeas} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MemberRecentActivity activities={recentActivity} />
                <div className="space-y-6">
                    <MemberBookmarksPreview bookmarks={recentBookmarks} />
                    <MemberVotesPreview votes={recentVotes} />
                </div>
            </div>
        </div>
    );
}

export default async function MemberDashboardPage() {
    return (
        <div className="container mx-auto">
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    );
}