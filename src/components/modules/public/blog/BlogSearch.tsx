'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BlogSearch() {
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
            router.push(`/blog?${params.toString()}`);
        });
    };

    const clearSearch = () => {
        setSearchValue('');
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        params.delete('page');
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9 pr-10"
                />
                {searchValue && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                )}
            </div>
            {isPending && (
                <p className="text-xs text-muted-foreground text-center mt-2">Searching...</p>
            )}
        </div>
    );
}