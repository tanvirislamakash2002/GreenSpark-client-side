'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createCategory, checkSlug } from '@/actions/category.action';
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
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const slugManuallyEditedRef = useRef(false);

    const generateSlug = (nameValue: string) => {
        return nameValue
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const checkSlugAvailability = useCallback(async (slugValue: string) => {
        if (!slugValue) return;
        
        setIsCheckingSlug(true);
        try {
            const result = await checkSlug(slugValue);
            if (result.success && result.data) {
                setSlugAvailable({
                    available: result.data.available,
                    suggestions: result.data.suggestions,
                });
            } else {
                setSlugAvailable({ available: true });
            }
        } catch (error) {
            console.error('Slug check error:', error);
            setSlugAvailable({ available: true });
        } finally {
            setIsCheckingSlug(false);
        }
    }, []);

    // ✅ Debounced slug check - waits 300ms after user stops typing
    const debouncedCheckSlug = useCallback((slugValue: string) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            if (slugValue) {
                checkSlugAvailability(slugValue);
            }
        }, 300); // ✅ Reduced from 500ms to 300ms for faster feedback
    }, [checkSlugAvailability]);

    // Handle name change - auto-generates slug
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        
        // Only auto-generate slug if user hasn't manually edited it
        if (!slugManuallyEditedRef.current) {
            const generatedSlug = generateSlug(newName);
            setSlug(generatedSlug);
            // ✅ Check availability of auto-generated slug
            if (generatedSlug) {
                debouncedCheckSlug(generatedSlug);
            }
        }
    };

    // Handle slug change - manual editing with debounced check
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawSlug = e.target.value;
        const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        setSlug(cleanSlug);
        
        // Mark that user has manually edited the slug
        slugManuallyEditedRef.current = true;
        
        // ✅ Check slug availability while typing (debounced)
        debouncedCheckSlug(cleanSlug);
    };

    // Handle slug blur - immediate check when user leaves the field
    const handleSlugBlur = () => {
        if (slug && debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            checkSlugAvailability(slug);
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
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        
        const result = await uploadTempAvatar(uploadFormData);
        if (result.success) {
            setImageUrl(result.data.url);
            setImagePreview(result.data.url);
            toast.success('Image uploaded');
        } else {
            toast.error(result.message || 'Failed to upload image');
        }
        setIsUploading(false);
    };

    const removeImage = () => {
        setImageUrl('');
        setImagePreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!slug.trim()) {
            toast.error('Slug is required');
            return;
        }
        
        // Final slug check before submit
        if (slugAvailable === null) {
            await checkSlugAvailability(slug);
        }
        
        if (slugAvailable && !slugAvailable.available) {
            toast.error('Please choose a different slug');
            return;
        }

        setIsLoading(true);
        const result = await createCategory({
            name: name.trim(),
            slug: slug.trim().toLowerCase(),
            description: description || undefined,
            imageUrl: imageUrl || undefined,
        });

        if (result.success) {
            toast.success('Category created successfully');
            // Reset all state
            setName('');
            setSlug('');
            setDescription('');
            setImageUrl('');
            setImagePreview(null);
            setSlugAvailable(null);
            slugManuallyEditedRef.current = false;
            onOpenChange(false);
            onSuccess();
        } else {
            toast.error(result.message || 'Failed to create category');
        }
        setIsLoading(false);
    };

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            setName('');
            setSlug('');
            setDescription('');
            setImageUrl('');
            setImagePreview(null);
            setSlugAvailable(null);
            slugManuallyEditedRef.current = false;
        }
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
    }, [open]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="e.g., Energy, Waste, Transportation"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Slug Field */}
                    <div>
                        <Label htmlFor="slug">Slug *</Label>
                        <div className="relative">
                            <Input
                                id="slug"
                                type="text"
                                value={slug}
                                onChange={handleSlugChange}
                                onBlur={handleSlugBlur}
                                placeholder="url-friendly-identifier"
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
                            URL: /categories/{slug || '...'}
                        </p>
                    </div>

                    {/* Description Field */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of this category"
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
                        <Button 
                            type="submit" 
                            disabled={isLoading || (slugAvailable !== null && !slugAvailable.available)}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Create Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}