'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const sortOptions = [
    { value: 'recent', label: 'Recently Saved' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'votes', label: 'Most Votes' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'title', label: 'Title (A-Z)' },
];

const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'energy', label: 'Energy' },
    { value: 'waste-reduction', label: 'Waste Reduction' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food-agriculture', label: 'Food & Agriculture' },
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'biodiversity', label: 'Biodiversity' },
];

export function BookmarksFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const currentSearch = searchParams.get('search') || '';
    const currentSort = searchParams.get('sortBy') || 'recent';
    const currentCategory = searchParams.get('category') || 'all';

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page');
        router.push(`/member/bookmarks?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        params.delete('page');
        router.push(`/member/bookmarks?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push('/member/bookmarks');
    };

    const hasActiveFilters = currentSearch || currentCategory !== 'all' || currentSort !== 'recent';

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search bookmarked ideas..."
                        value={currentSearch}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="pl-9 pr-8"
                    />
                    {currentSearch && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
                
                <Select value={currentCategory} onValueChange={(v) => updateFilter('category', v)}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select value={currentSort} onValueChange={(v) => updateFilter('sortBy', v)}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                {hasActiveFilters && (
                    <Button variant="ghost" onClick={resetFilters} className="gap-2">
                        <X className="h-4 w-4" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
}