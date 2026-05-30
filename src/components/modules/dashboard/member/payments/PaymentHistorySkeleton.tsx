import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentHistorySkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-4 mt-4">
                    <Skeleton className="h-20 w-32 rounded-lg" />
                    <Skeleton className="h-20 w-32 rounded-lg" />
                </div>
            </div>

            {/* Payment Cards Skeleton */}
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                            <Skeleton className="sm:w-32 h-32" />
                            <div className="flex-1 p-4 space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <div className="flex gap-3">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-16" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
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