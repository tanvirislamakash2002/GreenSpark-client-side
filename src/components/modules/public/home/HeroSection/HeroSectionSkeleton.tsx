import { Skeleton } from "@/components/ui/skeleton";

export function HeroSectionSkeleton() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge Skeleton */}
                    <div className="flex justify-center mb-6">
                        <Skeleton className="h-8 w-48 rounded-full" />
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-3 mb-6">
                        <Skeleton className="h-12 md:h-16 w-full max-w-3xl mx-auto" />
                        <Skeleton className="h-12 md:h-16 w-2/3 max-w-2xl mx-auto" />
                    </div>

                    {/* Subtitle Skeleton */}
                    <div className="space-y-2 mb-8">
                        <Skeleton className="h-5 md:h-6 w-full max-w-2xl mx-auto" />
                        <Skeleton className="h-5 md:h-6 w-3/4 max-w-xl mx-auto" />
                    </div>

                    {/* CTA Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Skeleton className="h-11 md:h-12 w-36 rounded-full" />
                        <Skeleton className="h-11 md:h-12 w-36 rounded-full" />
                    </div>

                    {/* Search Bar Skeleton */}
                    <div className="max-w-2xl mx-auto">
                        <Skeleton className="h-12 md:h-14 w-full rounded-full" />
                    </div>

                    {/* Trust Indicators Skeleton */}
                    <div className="mt-16 flex flex-wrap gap-8 justify-center">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="text-center space-y-2">
                                <Skeleton className="h-7 w-20 mx-auto" />
                                <Skeleton className="h-3 w-24 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}