import { Skeleton } from '@/components/ui/skeleton';

export function TopVotedIdeasSkeleton() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Skeleton className="h-8 w-40 rounded-full" />
                    </div>
                    <Skeleton className="h-9 md:h-10 w-48 mx-auto mb-3" />
                    <Skeleton className="h-5 w-64 mx-auto" />
                </div>

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-center mt-12">
                    <Skeleton className="h-10 w-48 rounded-md" />
                </div>
            </div>
        </section>
    );
}