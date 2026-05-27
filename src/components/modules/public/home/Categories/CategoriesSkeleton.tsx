import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header Skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="h-9 w-48 mx-auto mb-3" />
                    <Skeleton className="h-5 w-64 mx-auto" />
                </div>

                {/* Categories Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-xl border bg-card">
                            <Skeleton className="h-32 w-full" />
                            <div className="p-4 text-center">
                                <Skeleton className="h-5 w-24 mx-auto mb-1" />
                                <Skeleton className="h-4 w-16 mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}