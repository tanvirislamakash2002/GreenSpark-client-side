import { Skeleton } from "@/components/ui/skeleton";

export default function IdeaDetailsLoading() {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <div className="flex items-center gap-4 mt-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                </div>
                <div>
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div>
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-3 mt-8 pt-6 border-t">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-28" />
            </div>
        </div>
    );
}