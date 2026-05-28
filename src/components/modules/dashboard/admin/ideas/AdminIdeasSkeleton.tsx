import { Skeleton } from "@/components/ui/skeleton";

export function AdminIdeasSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>

            {/* Filter Bar Skeleton */}
            <div className="space-y-4">
                <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 w-[160px] rounded-md" />
                    <Skeleton className="h-10 w-[140px] rounded-md" />
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-20 rounded-md" />
                    ))}
                </div>
            </div>

            {/* Table Header Skeleton */}
            <div className="hidden lg:grid grid-cols-12 gap-4 p-4">
                <Skeleton className="col-span-5 h-4" />
                <Skeleton className="col-span-2 h-4" />
                <Skeleton className="col-span-2 h-4" />
                <Skeleton className="col-span-2 h-4" />
                <Skeleton className="col-span-1 h-4" />
            </div>

            {/* Rows Skeleton */}
            <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col lg:flex-row justify-between p-4 border rounded-lg">
                        <div className="space-y-2 flex-1">
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                            <Skeleton className="h-5 w-48" />
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 lg:mt-0">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </div>
    );
}