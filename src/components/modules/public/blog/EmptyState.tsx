import { BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                We couldn't find any articles matching your criteria. Try adjusting your search or category filter.
            </p>
            <Button asChild variant="outline">
                <Link href="/blog">View all posts</Link>
            </Button>
        </div>
    );
}