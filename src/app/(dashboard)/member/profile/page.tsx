import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getMemberProfile, getMemberStats, getMemberActivity } from "@/actions/profile/member-profile.action";
import { getMemberIdeas } from "@/actions/idea/member-idea.action";
import { MemberProfileHeader } from "@/components/modules/dashboard/member/profile/MemberProfileHeader";
import { MemberStatsCards } from "@/components/modules/dashboard/member/profile/MemberStatsCards";
import { ProfileInfoForm } from "@/components/modules/dashboard/member/profile/ProfileInfoForm";
import { ChangePasswordForm } from "@/components/modules/dashboard/member/profile/ChangePasswordForm";
import { NewsletterCard } from "@/components/modules/dashboard/member/profile/NewsletterCard";
import { RecentMemberActivity } from "@/components/modules/dashboard/member/profile/RecentMemberActivity";
import { DangerZone } from "@/components/modules/dashboard/member/profile/DangerZone";
import { MemberProfileSkeleton } from "@/components/modules/dashboard/member/profile/MemberProfileSkeleton";
import { MyIdeasSection } from "@/components/modules/dashboard/member/profile/MyIdeasSection";

async function MemberProfileContent() {
    const session = await getSession();
    
    if (!session?.data?.user || session.data.user.role !== "MEMBER") {
        notFound();
    }

    const [profileResult, statsResult, activityResult, draftIdeasResult, pendingIdeasResult, approvedIdeasResult, rejectedIdeasResult] = await Promise.all([
        getMemberProfile(),
        getMemberStats(),
        getMemberActivity(10),
        getMemberIdeas({ status: "DRAFT", limit: 100 }),
        getMemberIdeas({ status: "PENDING", limit: 100 }),
        getMemberIdeas({ status: "APPROVED", limit: 100 }),
        getMemberIdeas({ status: "REJECTED", limit: 100 }),
    ]);

    if (!profileResult.success || !profileResult.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load profile</h2>
                <p className="text-muted-foreground">{profileResult.message || "Please try again later"}</p>
            </div>
        );
    }

    const profile = profileResult.data;
    const stats = statsResult.success && statsResult.data ? statsResult.data : null;
    const activities = activityResult.success && activityResult.data ? activityResult.data : [];
    const draftIdeas = draftIdeasResult.success && draftIdeasResult.data ? draftIdeasResult.data.ideas : [];
    const pendingIdeas = pendingIdeasResult.success && pendingIdeasResult.data ? pendingIdeasResult.data.ideas : [];
    const approvedIdeas = approvedIdeasResult.success && approvedIdeasResult.data ? approvedIdeasResult.data.ideas : [];
    const rejectedIdeas = rejectedIdeasResult.success && rejectedIdeasResult.data ? rejectedIdeasResult.data.ideas : [];

    const revalidate = async () => {
        "use server";
        // Revalidation will happen through action tags
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <MemberProfileHeader profile={profile} />
            
            {stats && <MemberStatsCards stats={stats} />}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <MyIdeasSection 
                        draftIdeas={draftIdeas}
                        pendingIdeas={pendingIdeas}
                        approvedIdeas={approvedIdeas}
                        rejectedIdeas={rejectedIdeas}
                        onUpdate={revalidate}
                    />
                    <RecentMemberActivity activities={activities} />
                </div>
                
                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    <ProfileInfoForm profile={profile} onUpdate={revalidate} />
                    <ChangePasswordForm />
                    <NewsletterCard isSubscribed={true} email={profile.email} />
                    <DangerZone />
                </div>
            </div>
        </div>
    );
}

export default async function MemberProfilePage() {
    return (
        <Suspense fallback={<MemberProfileSkeleton />}>
            <MemberProfileContent />
        </Suspense>
    );
}