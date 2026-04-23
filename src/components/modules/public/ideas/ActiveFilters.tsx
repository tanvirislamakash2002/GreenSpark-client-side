'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface ActiveFiltersProps {
    search: string;
    category: string;
    status: string;
    sortBy: string;
}

export function ActiveFilters({ search, category, status, sortBy }: ActiveFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        if (key === 'page') params.delete('page');
        router.push(`/ideas?${params.toString()}`);
    };

    const clearAllFilters = () => {
        router.push('/ideas');
    };

    const hasActiveFilters = search || (category && category !== 'all') || status || (sortBy !== 'recent');

    if (!hasActiveFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {search && (
                <Badge variant="secondary" className="gap-1">
                    Search: {search}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('search')} />
                </Badge>
            )}
            
            {category && category !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                    Category: {category}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('category')} />
                </Badge>
            )}
            
            {status && (
                <Badge variant="secondary" className="gap-1">
                    Status: {status === 'free' ? 'Free' : 'Paid'}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('status')} />
                </Badge>
            )}
            
            {sortBy !== 'recent' && (
                <Badge variant="secondary" className="gap-1">
                    Sort: {sortBy === 'topVoted' ? 'Top Voted' : sortBy === 'mostCommented' ? 'Most Commented' : 'Most Viewed'}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('sortBy')} />
                </Badge>
            )}
            
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 text-xs">
                Clear all
            </Button>
        </div>
    );
}