import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getAdminProfile, getNotificationPreferences, getAdminSessions, getAdminActivityLog } from "@/actions/settings/admin-settings.action";
import { AdminProfileCard } from "@/components/modules/dashboard/admin/settings/AdminProfileCard";
import { AdminSecurityCard } from "@/components/modules/dashboard/admin/settings/AdminSecurityCard";
import { AdminNotificationPreferences } from "@/components/modules/dashboard/admin/settings/AdminNotificationPreferences";
import { AdminSessionsCard } from "@/components/modules/dashboard/admin/settings/AdminSessionsCard";
import { AdminActivityLogCard } from "@/components/modules/dashboard/admin/settings/AdminActivityLogCard";
import { AdminDangerZone } from "@/components/modules/dashboard/admin/settings/AdminDangerZone";

export default async function AdminSettingsPage() {
    const session = await getSession();
    
    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const [profileResult, notificationsResult, sessionsResult, activityResult] = await Promise.all([
        getAdminProfile(),
        getNotificationPreferences(),
        getAdminSessions(),
        getAdminActivityLog(20),
    ]);

    if (!profileResult.success || !profileResult.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load settings</h2>
                <p className="text-muted-foreground">{profileResult.message || "Please try again later"}</p>
            </div>
        );
    }

    const revalidate = async () => {
        "use server";
    };

    const defaultPreferences = {
        newIdeaSubmissions: true,
        pendingReviewReminders: true,
        reportedContent: true,
        weeklySummary: false,
        systemAnnouncements: true,
    };
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Settings</h1>
                <p className="text-muted-foreground">Manage your profile, security, and preferences</p>
            </div>

            <div className="space-y-6">
                <AdminProfileCard profile={profileResult.data} onUpdate={revalidate} />
                <AdminSecurityCard />
                <AdminNotificationPreferences 
                    initialPreferences={notificationsResult.success && notificationsResult.data ? notificationsResult.data : defaultPreferences}
                />
                {sessionsResult.success && sessionsResult.data && (
                    <AdminSessionsCard sessions={sessionsResult.data} onUpdate={revalidate} />
                )}
                {activityResult.success && activityResult.data && (
                    <AdminActivityLogCard activities={activityResult?.data?.activities} />
                )}
                <AdminDangerZone />
            </div>
        </div>
    );
}