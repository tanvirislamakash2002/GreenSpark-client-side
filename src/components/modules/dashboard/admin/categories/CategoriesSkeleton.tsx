import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-36" />
            </div>
            
            <Skeleton className="h-10 w-full" />
            
            <div className="border rounded-lg overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 gap-4 bg-muted/50 p-4">
                    <Skeleton className="col-span-1 h-4" />
                    <Skeleton className="col-span-3 h-4" />
                    <Skeleton className="col-span-2 h-4" />
                    <Skeleton className="col-span-3 h-4" />
                    <Skeleton className="col-span-1 h-4" />
                    <Skeleton className="col-span-2 h-4" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t">
                        <Skeleton className="md:col-span-1 h-10 w-10" />
                        <div className="md:col-span-3 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24 md:hidden" />
                        </div>
                        <Skeleton className="hidden md:block md:col-span-2 h-6 w-24" />
                        <Skeleton className="md:col-span-3 h-4 w-full" />
                        <Skeleton className="md:col-span-1 h-6 w-12 mx-auto" />
                        <div className="md:col-span-2 flex justify-end gap-2">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}