import { ImpactStatsCard } from './ImpactStatsCard';
import { getPlatformStats } from '@/actions/stats.action';

// Define icon names as strings instead of actual components
const statsConfig = [
    { key: 'totalIdeas', iconName: 'Lightbulb', label: 'Ideas Shared', color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-950/30' },
    { key: 'activeMembers', iconName: 'Users', label: 'Active Members', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-950/30' },
    { key: 'approvedIdeas', iconName: 'CheckCircle', label: 'Approved Ideas', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-950/30' },
    { key: 'totalCategories', iconName: 'Tag', label: 'Categories', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-950/30' },
];

export async function ImpactStats() {
    const result = await getPlatformStats();

    if (!result.success || !result.data) {
        return null;
    }

    const stats = result.data;

    return (
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Impact So Far</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Together, we're making a difference in the world
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <ImpactStatsCard
                        iconName={statsConfig[0].iconName}
                        value={stats.totalIdeas}
                        label={statsConfig[0].label}
                        color={statsConfig[0].color}
                        bgColor={statsConfig[0].bgColor}
                    />
                    <ImpactStatsCard
                        iconName={statsConfig[1].iconName}
                        value={stats.activeMembers}
                        label={statsConfig[1].label}
                        color={statsConfig[1].color}
                        bgColor={statsConfig[1].bgColor}
                    />
                    <ImpactStatsCard
                        iconName={statsConfig[2].iconName}
                        value={stats.approvedIdeas}
                        label={statsConfig[2].label}
                        color={statsConfig[2].color}
                        bgColor={statsConfig[2].bgColor}
                    />
                    <ImpactStatsCard
                        iconName={statsConfig[3].iconName}
                        value={stats.totalCategories}
                        label={statsConfig[3].label}
                        color={statsConfig[3].color}
                        bgColor={statsConfig[3].bgColor}
                    />
                </div>
            </div>
        </section>
    );
}