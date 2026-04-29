'use client';

import { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { Loader2, Upload, X, ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createCategory, checkSlug } from '@/actions/admin-category.action';
import { uploadTempAvatar } from '@/actions/upload.action';
import Image from 'next/image';

interface CreateCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function CreateCategoryModal({ open, onOpenChange, onSuccess }: CreateCategoryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingSlug, setIsCheckingSlug] = useState(false);
    const [slugAvailable, setSlugAvailable] = useState<{ available: boolean; suggestions?: string[] } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            imageUrl: '',
        },
        onSubmit: async ({ value }) => {
            if (!value.name.trim()) {
                toast.error('Name is required');
                return;
            }
            if (!value.slug.trim()) {
                toast.error('Slug is required');
                return;
            }
            if (slugAvailable && !slugAvailable.available) {
                toast.error('Please choose a different slug');
                return;
            }

            setIsLoading(true);
            const result = await createCategory({
                name: value.name.trim(),
                slug: value.slug.trim().toLowerCase(),
                description: value.description || undefined,
                imageUrl: value.imageUrl || undefined,
            });

            if (result.success) {
                toast.success('Category created successfully');
                form.reset();
                setImagePreview(null);
                setSlugAvailable(null);
                onOpenChange(false);
                onSuccess();
            } else {
                toast.error(result.message || 'Failed to create category');
            }
            setIsLoading(false);
        },
    });

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (name: string) => {
        form.setFieldValue('name', name);
        const generatedSlug = generateSlug(name);
        form.setFieldValue('slug', generatedSlug);
        if (generatedSlug) {
            checkSlugAvailability(generatedSlug);
        }
    };

    const checkSlugAvailability = async (slug: string) => {
        if (!slug) return;
        setIsCheckingSlug(true);
        const result = await checkSlug(slug);
        if (result.success && result.data) {
            setSlugAvailable({
                available: result.data.available,
                suggestions: result.data.suggestions,
            });
        }
        setIsCheckingSlug(false);
    };

    const handleSlugChange = (slug: string) => {
        const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        form.setFieldValue('slug', cleanSlug);
        if (cleanSlug) {
            checkSlugAvailability(cleanSlug);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be less than 2MB');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        
        const result = await uploadTempAvatar(formData);
        if (result.success) {
            form.setFieldValue('imageUrl', result.data.url);
            setImagePreview(result.data.url);
            toast.success('Image uploaded');
        } else {
            toast.error(result.message || 'Failed to upload image');
        }
        setIsUploading(false);
    };

    const removeImage = () => {
        form.setFieldValue('imageUrl', '');
        setImagePreview(null);
    };

    useEffect(() => {
        if (!open) {
            form.reset();
            setImagePreview(null);
            setSlugAvailable(null);
        }
    }, [open, form]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Energy, Waste, Transportation"
                            value={form.getFieldValue('name')}
                            onChange={(e) => handleNameChange(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <Label htmlFor="slug">Slug *</Label>
                        <div className="relative">
                            <Input
                                id="slug"
                                placeholder="url-friendly-identifier"
                                value={form.getFieldValue('slug')}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                disabled={isLoading || isCheckingSlug}
                                className={slugAvailable && !slugAvailable.available ? 'border-red-500 pr-16' : slugAvailable?.available ? 'border-green-500 pr-16' : ''}
                            />
                            {isCheckingSlug && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}
                            {!isCheckingSlug && slugAvailable && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {slugAvailable.available ? (
                                        <span className="text-green-500 text-xs">✓ Available</span>
                                    ) : (
                                        <span className="text-red-500 text-xs">✗ Taken</span>
                                    )}
                                </div>
                            )}
                        </div>
                        {slugAvailable && !slugAvailable.available && slugAvailable.suggestions && (
                            <p className="text-xs text-red-500 mt-1">
                                Try: {slugAvailable.suggestions.slice(0, 3).join(', ')}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            URL: /categories/{form.getFieldValue('slug') || '...'}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of this category"
                            value={form.getFieldValue('description')}
                            onChange={(e) => form.setFieldValue('description', e.target.value)}
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <Label>Category Image</Label>
                        <div className="mt-1">
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 p-0.5 bg-red-500 rounded-full text-white"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        Upload Image
                                    </Button>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Optional. Max 2MB. JPG, PNG, GIF, WEBP.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || (slugAvailable && !slugAvailable.available)}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Create Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}