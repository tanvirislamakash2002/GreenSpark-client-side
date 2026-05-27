import { Skeleton } from "@/components/ui/skeleton";

export function CTASkeleton() {
    return (
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-700">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge Skeleton */}
                    <div className="flex justify-center mb-6">
                        <Skeleton className="h-8 w-32 rounded-full bg-white/20" />
                    </div>

                    {/* Heading Skeleton */}
                    <Skeleton className="h-10 md:h-12 w-64 mx-auto mb-4 bg-white/20" />

                    {/* Subheading Skeleton */}
                    <div className="space-y-2 mb-8">
                        <Skeleton className="h-5 w-full max-w-md mx-auto bg-white/20" />
                        <Skeleton className="h-5 w-3/4 max-w-sm mx-auto bg-white/20" />
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Skeleton className="h-11 w-36 rounded-md bg-white/20" />
                        <Skeleton className="h-11 w-36 rounded-md bg-white/20" />
                    </div>

                    {/* Trust Badge Skeleton */}
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-4 w-48 bg-white/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}