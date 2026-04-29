'use client';

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoriesHeaderProps {
    onAddClick: () => void;
}

export function CategoriesHeader({ onAddClick }: CategoriesHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
                <p className="text-muted-foreground">
                    Manage sustainability idea categories
                </p>
            </div>
            <Button onClick={onAddClick} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
            </Button>
        </div>
    );
}