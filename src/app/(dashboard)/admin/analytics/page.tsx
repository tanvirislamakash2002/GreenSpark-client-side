import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getAdminAnalytics } from "@/actions/analytics.action";
import { AnalyticsHeader } from "@/components/modules/dashboard/admin/analytics/AnalyticsHeader";
import { OverviewStats } from "@/components/modules/dashboard/admin/analytics/OverviewStats";
import { GrowthCharts } from "@/components/modules/dashboard/admin/analytics/GrowthCharts";
import { DistributionCharts } from "@/components/modules/dashboard/admin/analytics/DistributionCharts";
import { EngagementMetrics } from "@/components/modules/dashboard/admin/analytics/EngagementMetrics";
import { TopLists } from "@/components/modules/dashboard/admin/analytics/TopLists";

interface AnalyticsPageProps {
    searchParams: Promise<{
        range?: string;
    }>;
}

async function AnalyticsContent({ searchParams }: { searchParams: Awaited<AnalyticsPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user || session.data.user.role !== "ADMIN") {
        notFound();
    }

    const range = searchParams.range || "30d";

    const result = await getAdminAnalytics(range);

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load analytics</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { overview, timeSeries, categoryDistribution, statusDistribution, topContributors, topIdeas, engagement } = result.data;

    const handleRangeChange = async (newRange: string) => {
        "use server";
        // Revalidation happens through action
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AnalyticsHeader onRangeChange={handleRangeChange} currentRange={range} />
            <OverviewStats stats={overview} />
            <GrowthCharts data={timeSeries} />
            <DistributionCharts categories={categoryDistribution} statuses={statusDistribution} />
            <EngagementMetrics metrics={engagement} />
            <TopLists contributors={topContributors} ideas={topIdeas} />
        </div>
    );
}

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <AnalyticsContent searchParams={resolvedParams} />
    );
}