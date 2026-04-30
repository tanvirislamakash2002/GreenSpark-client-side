'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteCategory } from '@/actions/category.action';
import { Category } from '@/types/category.type';

interface DeleteCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
    onSuccess: () => void;
}

export function DeleteCategoryModal({ open, onOpenChange, category, onSuccess }: DeleteCategoryModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!category) return;
        
        setIsLoading(true);
        const result = await deleteCategory(category.id);
        
        if (result.success) {
            toast.success(result.message);
            onOpenChange(false);
            onSuccess();
        } else {
            toast.error(result.message || 'Failed to delete category');
        }
        setIsLoading(false);
    };

    if (!category) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <DialogTitle>Delete Category</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to delete "{category.name}"?
                    </DialogDescription>
                </DialogHeader>
                
                {category.ideasCount > 0 && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800 dark:text-amber-400">
                            ⚠️ This category is used by {category.ideasCount} idea{category.ideasCount !== 1 ? 's' : ''}. 
                            Deleting it will remove the category from those ideas.
                        </p>
                    </div>
                )}
                
                <p className="text-sm text-muted-foreground">
                    This action cannot be undone.
                </p>
                
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={handleDelete} 
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Delete Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}