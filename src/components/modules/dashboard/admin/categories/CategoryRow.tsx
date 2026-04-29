'use client';

import { Pencil, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/admin-category.type";
import Image from "next/image";

interface CategoryRowProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onRefresh: () => void;
}

export function CategoryRow({ category, onEdit, onDelete }: CategoryRowProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-start md:items-center hover:bg-muted/50 transition-colors">
            {/* Image */}
            <div className="md:col-span-1">
                {category.imageUrl ? (
                    <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-md object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                )}
            </div>
            
            {/* Name */}
            <div className="md:col-span-3">
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground md:hidden">
                    Slug: {category.slug}
                </p>
            </div>
            
            {/* Slug - Desktop only */}
            <div className="hidden md:block md:col-span-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                    {category.slug}
                </code>
            </div>
            
            {/* Description */}
            <div className="md:col-span-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description || "—"}
                </p>
            </div>
            
            {/* Ideas Count */}
            <div className="md:col-span-1 text-center">
                <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-muted text-sm">
                    {category.ideasCount}
                </span>
            </div>
            
            {/* Actions */}
            <div className="md:col-span-2 flex justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(category)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(category)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}