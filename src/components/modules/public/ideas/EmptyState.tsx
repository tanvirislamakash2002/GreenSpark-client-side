import { Lightbulb, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                We couldn't find any ideas matching your criteria. Try adjusting your filters or search term.
            </p>
            <div className="flex gap-3">
                <Button asChild variant="outline">
                    <Link href="/ideas">Clear all filters</Link>
                </Button>
                <Button asChild>
                    <Link href="/member/ideas/create">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Share an idea
                    </Link>
                </Button>
            </div>
        </div>
    );
}