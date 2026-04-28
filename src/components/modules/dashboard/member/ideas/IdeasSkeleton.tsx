import { Skeleton } from "@/components/ui/skeleton";

export function IdeasSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-36" />
            </div>
            
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                        <div className="space-y-2 flex-1">
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                            <Skeleton className="h-5 w-48" />
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 md:mt-0">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}