'use client';

import { memo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { sortOptions } from '@/constants/categories';
import { Category } from '@/types/category.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchInput } from './SearchInput';

interface IdeasFilterBarProps {
    categories: Category[];
}

export const IdeasFilterBar = memo(function IdeasFilterBar({ categories }: IdeasFilterBarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showMobileFilters, setShowMobileFilters] = useState(false); // You'll need to add useState back

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
        params.delete('page');
        router.push(`/ideas?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push('/ideas');
    };

    const FilterContent = () => (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <SearchInput />

            <Select value={currentCategory} onValueChange={(v) => updateFilters('category', v)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                            <div className="flex items-center gap-2">
                                {cat?.imageUrl ?
                                    <Avatar className="h-5 w-5">
                                        <AvatarImage src={cat.imageUrl || undefined} />
                                        <AvatarFallback>{cat.name.charAt(0)}</AvatarFallback>
                                    </Avatar> :
                                    <Sparkles className='h-4 w-4 text-green-700' />
                                }
                                <span>{cat.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

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

            <Button type="button" variant="outline" onClick={resetFilters} className="gap-2">
                <X className="h-4 w-4" />
                Reset
            </Button>
        </div>
    );

    return (
        <>
            <div className="hidden sm:block mb-6">
                <FilterContent />
            </div>

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

            {showMobileFilters && (
                <div className="sm:hidden mb-6 p-4 border rounded-lg bg-muted/30">
                    <FilterContent />
                </div>
            )}
        </>
    );
});