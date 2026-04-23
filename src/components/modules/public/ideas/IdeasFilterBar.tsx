'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { categories } from '@/constants/categories';
import { sortOptions } from '@/constants/categories';

export function IdeasFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || 'all';
    const currentStatus = searchParams.get('status') || '';
    const currentSort = searchParams.get('sortBy') || 'recent';

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        params.delete('page'); // Reset to first page when filters change
        startTransition(() => {
            router.push(`/ideas?${params.toString()}`);
        });
    };

    const resetFilters = () => {
        startTransition(() => {
            router.push('/ideas');
        });
    };

    const FilterContent = () => (
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search ideas..."
                    defaultValue={currentSearch}
                    onChange={(e) => updateFilters('search', e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Category Select */}
            <Select value={currentCategory} onValueChange={(v) => updateFilters('category', v)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                            {cat.icon} {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Payment Status Select */}
            <Select value={currentStatus} onValueChange={(v) => updateFilters('status', v)}>
                <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="All Ideas" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Ideas</SelectItem>
                    <SelectItem value="free">Free Only</SelectItem>
                    <SelectItem value="paid">Premium Only</SelectItem>
                </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={currentSort} onValueChange={(v) => updateFilters('sortBy', v)}>
                <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button variant="outline" onClick={resetFilters} className="gap-2">
                <X className="h-4 w-4" />
                Reset
            </Button>
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden sm:block mb-6">
                <FilterContent />
            </div>

            {/* Mobile Filter Button */}
            <div className="sm:hidden mb-4">
                <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                    <Filter className="h-4 w-4" />
                    Filters & Sorting
                </Button>
            </div>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
                <div className="sm:hidden mb-6 p-4 border rounded-lg bg-muted/30">
                    <FilterContent />
                </div>
            )}
        </>
    );
}