export function IdeasSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                    <div className="h-48 bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-full" />
                        <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                        <div className="flex justify-between pt-3">
                            <div className="h-4 bg-muted rounded animate-pulse w-20" />
                            <div className="h-4 bg-muted rounded animate-pulse w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}