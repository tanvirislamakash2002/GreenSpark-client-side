import { Skeleton } from "@/components/ui/skeleton";

export function HowItWorksSkeleton() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header Skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="h-9 w-56 mx-auto mb-3" />
                    <Skeleton className="h-5 w-80 mx-auto" />
                </div>

                {/* Steps Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <Skeleton className="h-16 w-16 rounded-full mb-4 mt-4" />
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48 mb-1" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>

                {/* CTA Button Skeleton */}
                <div className="flex justify-center mt-12">
                    <Skeleton className="h-11 w-36 rounded-md" />
                </div>
            </div>
        </section>
    );
}