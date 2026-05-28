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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusTabs = [
    { value: 'all', label: 'All' },
    { value: 'DRAFT', label: 'Drafts' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' },
];

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'votes', label: 'Most Votes' },
    { value: 'views', label: 'Most Views' },
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

export function AdminIdeasFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const currentSearch = searchParams.get('search') || '';
    const currentStatus = searchParams.get('status') || 'all';
    const currentSort = searchParams.get('sortBy') || 'newest';
    const currentCategory = searchParams.get('category') || 'all';

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page');
        router.push(`/dashboard/admin/ideas?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        params.delete('page');
        router.push(`/dashboard/admin/ideas?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push('/dashboard/admin/ideas');
    };

    const hasActiveFilters = currentSearch || currentCategory !== 'all' || currentStatus !== 'all' || currentSort !== 'newest';

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search ideas by title, author, or content..."
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
                    <SelectTrigger className="w-full sm:w-[140px]">
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
            
            <Tabs value={currentStatus} onValueChange={(v) => updateFilter('status', v)}>
                <TabsList className="flex-wrap h-auto">
                    {statusTabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}