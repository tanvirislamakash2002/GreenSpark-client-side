'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { blogCategories } from '@/constants/blog';

interface BlogCategoryFilterProps {
    categoryCounts: { slug: string; count: number }[];
}

export function BlogCategoryFilter({ categoryCounts }: BlogCategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'all';

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category === 'all') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        params.delete('page');
        router.push(`/blog?${params.toString()}`);
    };

    const getCount = (slug: string) => {
        const found = categoryCounts.find(c => c.slug === slug);
        return found?.count || 0;
    };

    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
                {blogCategories.map((category) => {
                    const isActive = currentCategory === category.value;
                    const count = getCount(category.value);
                    
                    return (
                        <button
                            key={category.value}
                            onClick={() => handleCategoryChange(category.value)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-green-600 text-white shadow-md"
                                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {category.label}
                            <span className={cn(
                                "ml-2 text-xs",
                                isActive ? "text-green-100" : "text-muted-foreground"
                            )}>
                                ({count})
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}