'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getIdeas } from '@/actions/idea/idea.action';
import { getAllCategories } from '@/actions/category.action';
import { IdeasHeader } from '@/components/modules/public/ideas/IdeasHeader';
import { IdeasFilterBar } from '@/components/modules/public/ideas/IdeasFilterBar';
import { IdeasGrid } from '@/components/modules/public/ideas/IdeasGrid';
import { IdeasPagination } from '@/components/modules/public/ideas/IdeasPagination';
import { Idea } from '@/types/idea/idea.type';
import { Category } from '@/types/category.type';

export default function IdeasPage() {
    const searchParams = useSearchParams();
    
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 12,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Get values directly from URL
    const page = searchParams.get('page') || '1';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || '';
    const search = searchParams.get('search') || '';

    // Load data when URL params change
    useEffect(() => {
        let isMounted = true;
        
        const loadData = async () => {
            setIsLoading(true);
            
            const [ideasResult, categoriesResult] = await Promise.all([
                getIdeas({
                    page: parseInt(page),
                    limit: 12,
                    category: category || undefined,
                    status: status as any || undefined,
                    sortBy: sortBy as any || undefined,
                    search: search || undefined,
                }),
                getAllCategories(),
            ]);

            if (!isMounted) return;

            if (ideasResult.success && ideasResult.data) {
                setIdeas(ideasResult.data.ideas);
                setPagination(ideasResult.data.pagination);
            }
            
            if (categoriesResult.success && categoriesResult.data) {
                setCategories(categoriesResult.data);
            }
            
            setIsLoading(false);
        };

        loadData();
        
        return () => {
            isMounted = false;
        };
    }, [page, category, status, sortBy, search]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-16">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Loading ideas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <IdeasHeader totalItems={pagination.totalItems} />
            <IdeasFilterBar 
                categories={categories} 
            />
            <IdeasGrid ideas={ideas} />
            {pagination.totalPages > 1 && (
                <IdeasPagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={(pageNum) => {
                        const params = new URLSearchParams(searchParams);
                        params.set('page', pageNum.toString());
                        window.location.href = `/ideas?${params.toString()}`;
                    }}
                />
            )}
        </div>
    );
}