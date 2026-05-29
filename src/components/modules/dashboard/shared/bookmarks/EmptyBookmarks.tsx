import Link from 'next/link';
import { Bookmark, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyBookmarks() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No bookmarked ideas yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                Save interesting ideas by clicking the bookmark button on any idea page.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/ideas">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Ideas
                </Link>
            </Button>
        </div>
    );
}