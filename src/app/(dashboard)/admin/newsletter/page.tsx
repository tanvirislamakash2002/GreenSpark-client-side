import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getSubscribers } from "@/actions/newsletter/admin-newsletter.action";
import { AdminNewsletterHeader } from "@/components/modules/dashboard/admin/newsletter/AdminNewsletterHeader";
import { SubscribersTable } from "@/components/modules/dashboard/admin/newsletter/SubscribersTable";
import { ComposeNewsletter } from "@/components/modules/dashboard/admin/newsletter/ComposeNewsletter";
import { CampaignHistory } from "@/components/modules/dashboard/admin/newsletter/CampaignHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminNewsletterPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        status?: string;
    }>;
}

async function AdminNewsletterContent({ searchParams }: { searchParams: Awaited<AdminNewsletterPageProps['searchParams']> }) {
    const session = await getSession();

    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 15;

    const result = await getSubscribers({
        page,
        limit,
        search: searchParams.search,
        status: searchParams.status,
    });

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load subscribers</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { subscribers, stats } = result.data;

    const revalidate = async () => {
        "use server";
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AdminNewsletterHeader stats={stats} />

            <Tabs defaultValue="subscribers" className="space-y-6">
                <div className="flex flex-col w-full gap-4">
                    <TabsList>
                        <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                        <TabsTrigger value="compose">Compose</TabsTrigger>
                        <TabsTrigger value="history">Campaign History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="subscribers">
                        <SubscribersTable subscribers={subscribers} onUpdate={revalidate} />
                    </TabsContent>
                    <TabsContent value="compose">
                        <ComposeNewsletter />
                    </TabsContent>
                    <TabsContent value="history">
                        <CampaignHistory />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default async function AdminNewsletterPage({ searchParams }: AdminNewsletterPageProps) {
    const resolvedParams = await searchParams;

    return (
        <AdminNewsletterContent searchParams={resolvedParams} />
    );
}