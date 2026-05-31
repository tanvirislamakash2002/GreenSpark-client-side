import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminNewsletterSkeleton() {
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
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-6 w-12" />
                                    </div>
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-2 border-b pb-2">
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-9 w-32 rounded-md" />
            </div>

            {/* Subscribers Table Skeleton */}
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Skeleton className="h-10 w-64 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
                <div className="rounded-md border">
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-5 gap-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                    </div>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="p-4 border-b">
                            <div className="grid grid-cols-5 gap-4">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}