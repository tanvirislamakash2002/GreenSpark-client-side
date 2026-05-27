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
                        <div key={i} className="p-6 rounded-xl border bg-card">
                            <div className="flex flex-col items-center text-center">
                                <Skeleton className="h-14 w-14 rounded-full mb-4" />
                                <Skeleton className="h-5 w-20 mb-1" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}