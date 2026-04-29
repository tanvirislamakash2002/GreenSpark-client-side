'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '@/actions/admin-category.action';
import { CategoriesHeader } from '@/components/modules/dashboard/admin/categories/CategoriesHeader';
import { CategoriesSearch } from '@/components/modules/dashboard/admin/categories/CategoriesSearch';
import { CategoriesTable } from '@/components/modules/dashboard/admin/categories/CategoriesTable';
import { CategoriesPagination } from '@/components/modules/dashboard/admin/categories/CategoriesPagination';
import { CategoriesSkeleton } from '@/components/modules/dashboard/admin/categories/CategoriesSkeleton';
import { CreateCategoryModal } from '@/components/modules/dashboard/admin/categories/CreateCategoryModal';
import { EditCategoryModal } from '@/components/modules/dashboard/admin/categories/EditCategoryModal';
import { DeleteCategoryModal } from '@/components/modules/dashboard/admin/categories/DeleteCategoryModal';
import { Category } from '@/types/admin-category.type';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 });
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        const result = await getCategories();
        if (result.success && result.data) {
            setCategories(result.data.categories);
            setPagination(result.data.pagination);
        } else {
            toast.error(result.message || 'Failed to load categories');
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSuccess = () => {
        fetchCategories();
    };

    if (isLoading) {
        return (
            <div className="container mx-auto">
                <CategoriesSkeleton />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <CategoriesHeader onAddClick={() => setIsCreateModalOpen(true)} />
            <CategoriesSearch />
            <CategoriesTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={fetchCategories}
                onAddClick={() => setIsCreateModalOpen(true)}
            />
            <CategoriesPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />

            <CreateCategoryModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSuccess={handleSuccess}
            />

            <EditCategoryModal
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                category={selectedCategory}
                onSuccess={handleSuccess}
            />

            <DeleteCategoryModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                category={selectedCategory}
                onSuccess={handleSuccess}
            />
        </div>
    );
}