import Link from "next/link";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminIdeaNotFound() {
    return (
        <div className="container mx-auto py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Idea Not Found</h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                The idea you're looking for doesn't exist or has been deleted.
            </p>
            <Button asChild variant="outline">
                <Link href="/dashboard/admin/ideas">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Ideas
                </Link>
            </Button>
        </div>
    );
}