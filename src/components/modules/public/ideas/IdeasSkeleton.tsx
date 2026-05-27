import { Skeleton } from "@/components/ui/skeleton";

export function IdeasSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="text-center space-y-3">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-5 w-96 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
            </div>

            {/* Filter Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-[180px] rounded-md" />
                <Skeleton className="h-10 w-[140px] rounded-md" />
                <Skeleton className="h-10 w-[160px] rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
            </div>

            {/* Active Filters Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="group rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all duration-300">
                        {/* Image Skeleton */}
                        <div className="relative h-48 overflow-hidden bg-muted">
                            <Skeleton className="h-full w-full" />
                            {/* Category Badge Skeleton */}
                            <div className="absolute top-3 left-3">
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-5 w-3/4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                            
                            {/* Author & Stats Skeleton */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-4 w-8" />
                                </div>
                            </div>

                            {/* Button Skeleton */}
                            <Skeleton className="h-9 w-full rounded-md mt-2" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center pt-6 border-t">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                </div>
            </div>
        </div>
    );
}