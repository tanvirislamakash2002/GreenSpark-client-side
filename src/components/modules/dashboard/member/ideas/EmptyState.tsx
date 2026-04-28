import Link from 'next/link';
import { Lightbulb, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No ideas yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                You haven't created any ideas yet. Share your first sustainability idea and make an impact!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/member/ideas/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Idea
                </Link>
            </Button>
        </div>
    );
}