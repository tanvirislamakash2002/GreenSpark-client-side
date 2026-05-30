import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MyVotesSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                </div>
            </div>

            {/* Filter Bar Skeleton */}
            <div className="flex gap-3">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-[140px] rounded-md" />
                <Skeleton className="h-10 w-[150px] rounded-md" />
                <Skeleton className="h-10 w-[160px] rounded-md" />
            </div>

            {/* Vote Cards Skeleton */}
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Skeleton className="sm:w-24 h-24 rounded-md" />
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20 rounded-md" />
                                        <Skeleton className="h-8 w-20 rounded-md" />
                                    </div>
                                    <Skeleton className="h-8 w-24 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

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