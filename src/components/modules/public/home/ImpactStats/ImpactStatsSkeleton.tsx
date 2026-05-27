import { Skeleton } from "@/components/ui/skeleton";

export function ImpactStatsSkeleton() {
    return (
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20">
            <div className="container mx-auto px-4">
                {/* Section Header Skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="h-9 w-48 mx-auto mb-3" />
                    <Skeleton className="h-5 w-64 mx-auto" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl border bg-card">
                            <Skeleton className="h-14 w-14 rounded-full mb-4" />
                            <Skeleton className="h-8 w-24 mb-1" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}