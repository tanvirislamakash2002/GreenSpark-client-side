export function BlogSkeleton() {
    return (
        <div className="space-y-8">
            {/* Featured Post Skeleton */}
            <div className="rounded-2xl border bg-card overflow-hidden animate-pulse">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="h-64 bg-muted rounded-xl" />
                    <div className="space-y-3">
                        <div className="h-6 bg-muted rounded w-24" />
                        <div className="h-8 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                        <div className="flex gap-4">
                            <div className="h-4 bg-muted rounded w-20" />
                            <div className="h-4 bg-muted rounded w-24" />
                            <div className="h-4 bg-muted rounded w-16" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card overflow-hidden animate-pulse">
                        <div className="h-48 bg-muted" />
                        <div className="p-4 space-y-3">
                            <div className="h-5 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-2/3" />
                            <div className="flex gap-3 pt-2">
                                <div className="h-3 bg-muted rounded w-16" />
                                <div className="h-3 bg-muted rounded w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}