import Link from "next/link";
import { MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No comments yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                You haven't commented on any ideas yet. Start engaging with the community!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/ideas">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Browse Ideas
                </Link>
            </Button>
        </div>
    );
}