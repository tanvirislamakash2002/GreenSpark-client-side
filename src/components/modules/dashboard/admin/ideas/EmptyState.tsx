import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState() {
    const handleReset = () => {
        window.location.href = '/dashboard/admin/ideas';
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                No ideas match your current filters. Try adjusting your search or filter criteria.
            </p>
            <Button onClick={handleReset} variant="outline">
                Clear all filters
            </Button>
        </div>
    );
}