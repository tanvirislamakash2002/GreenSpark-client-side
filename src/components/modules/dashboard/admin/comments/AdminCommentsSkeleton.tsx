import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminCommentsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-96" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <Skeleton className="h-3 w-16 mb-2" />
                                        <Skeleton className="h-6 w-12" />
                                    </div>
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Filter Bar Skeleton */}
            <div className="flex gap-3">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-[140px] rounded-md" />
                <Skeleton className="h-10 w-[140px] rounded-md" />
                <Skeleton className="h-10 w-[140px] rounded-md" />
            </div>

            {/* Comments List Skeleton */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </div>
                </div>
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