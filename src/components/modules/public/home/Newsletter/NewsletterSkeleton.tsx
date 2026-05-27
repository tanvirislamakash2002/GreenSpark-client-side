import { Skeleton } from "@/components/ui/skeleton";

export function NewsletterSkeleton() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header Skeleton */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Skeleton className="h-8 w-32 rounded-full" />
                        </div>
                        <Skeleton className="h-9 w-48 mx-auto mb-3" />
                        <Skeleton className="h-5 w-64 mx-auto" />
                    </div>

                    {/* Form Skeleton */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Skeleton className="flex-1 h-11 rounded-md" />
                        <Skeleton className="h-11 w-24 rounded-md" />
                    </div>

                    {/* Privacy Note Skeleton */}
                    <div className="flex justify-center mt-3">
                        <Skeleton className="h-3 w-64" />
                    </div>

                    {/* Benefits Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-6 border-t">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}