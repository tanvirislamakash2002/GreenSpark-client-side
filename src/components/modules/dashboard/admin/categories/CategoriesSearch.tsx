'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function CategoriesSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

    const handleSearch = (value: string) => {
        setSearchValue(value);
        const params = new URLSearchParams(searchParams);
        
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        params.delete('page');
        
        startTransition(() => {
            router.push(`/admin/categories?${params.toString()}`);
        });
    };

    const clearSearch = () => {
        setSearchValue('');
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        params.delete('page');
        router.push(`/admin/categories?${params.toString()}`);
    };

    return (
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search categories..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-8"
            />
            {searchValue && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
            )}
            {isPending && (
                <p className="text-xs text-muted-foreground mt-1">Searching...</p>
            )}
        </div>
    );
}