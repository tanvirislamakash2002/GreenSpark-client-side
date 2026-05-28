import { Skeleton } from "@/components/ui/skeleton";

export function AdminIdeaSkeleton() {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            {/* Header Skeleton */}
            <div className="space-y-4 mb-8">
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-4 w-16 mb-2" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                        <Skeleton className="h-6 w-32 mb-3" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </div>
                ))}
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-3 mt-8 pt-6 border-t">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
            </div>
        </div>
    );
}