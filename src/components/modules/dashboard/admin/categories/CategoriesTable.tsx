'use client';

import { Category } from "@/types/admin-category.type";
import { CategoryRow } from "./CategoryRow";
import { EmptyState } from "./EmptyState";

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onRefresh: () => void;
}

export function CategoriesTable({ categories, onEdit, onDelete, onRefresh }: CategoriesTableProps) {
    if (categories.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 bg-muted/50 p-4 text-sm font-medium">
                <div className="col-span-1">Image</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Slug</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1 text-center">Ideas</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>
            
            {/* Rows */}
            <div className="divide-y">
                {categories.map((category) => (
                    <CategoryRow
                        key={category.id}
                        category={category}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onRefresh={onRefresh}
                    />
                ))}
            </div>
        </div>
    );
}