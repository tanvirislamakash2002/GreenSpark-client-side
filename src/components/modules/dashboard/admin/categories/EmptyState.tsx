'use client';

import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <FolderOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                Create your first category to help organize sustainability ideas.
            </p>
            <Button onClick={onAddClick} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Category
            </Button>
        </div>
    );
}