import { Skeleton } from "@/components/ui/skeleton";

export default function IdeaDetailsLoading() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
}