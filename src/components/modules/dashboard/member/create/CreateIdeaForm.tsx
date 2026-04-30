'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { Loader2, Eye, EyeOff, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createIdea } from '@/actions/member-idea.action';
import { getCategories } from '@/actions/category.action';
import { uploadTempAvatar } from '@/actions/upload.action';
import Image from 'next/image';
import { Category } from '@/types/category.type';

export function CreateIdeaForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const form = useForm({
        defaultValues: {
            title: '',
            problemStatement: '',
            solution: '',
            description: '',
            imageUrl: '',
            isPaid: false,
            price: '',
            categoryId: '',
        },
        onSubmit: async ({ value }) => {
            // Validation
            if (!value.title.trim()) {
                toast.error('Title is required');
                return;
            }
            if (value.title.length < 5) {
                toast.error('Title must be at least 5 characters');
                return;
            }
            if (!value.problemStatement.trim()) {
                toast.error('Problem statement is required');
                return;
            }
            if (value.problemStatement.length < 20) {
                toast.error('Problem statement must be at least 20 characters');
                return;
            }
            if (!value.solution.trim()) {
                toast.error('Proposed solution is required');
                return;
            }
            if (value.solution.length < 50) {
                toast.error('Proposed solution must be at least 50 characters');
                return;
            }
            if (!value.description.trim()) {
                toast.error('Description is required');
                return;
            }
            if (value.description.length < 100) {
                toast.error('Description must be at least 100 characters');
                return;
            }
            if (!value.categoryId) {
                toast.error('Please select a category');
                return;
            }
            if (value.isPaid && (!value.price || parseFloat(value.price) <= 0)) {
                toast.error('Please enter a valid price for paid idea');
                return;
            }

            setIsLoading(true);
            const result = await createIdea({
                title: value.title.trim(),
                problemStatement: value.problemStatement.trim(),
                solution: value.solution.trim(),
                description: value.description.trim(),
                imageUrl: value.imageUrl || undefined,
                isPaid: value.isPaid,
                price: value.isPaid ? parseFloat(value.price) : undefined,
                categoryId: value.categoryId,
            });

            if (result.success) {
                toast.success('Idea created successfully!');
                router.push('/dashboard/member/ideas');
            } else {
                toast.error(result.message || 'Failed to create idea');
            }
            setIsLoading(false);
        },
    });

    const isPaid = form.getFieldValue('isPaid');

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
        const fetchCategories = async () => {
            const result = await getCategories();
            if (result.success && result.data) {
                setCategories(result.data);
            }
            setIsLoadingCategories(false);
        };
        fetchCategories();
    }, []);

    const titleChars = form.getFieldValue('title').length;
    const problemChars = form.getFieldValue('problemStatement').length;
    const solutionChars = form.getFieldValue('solution').length;
    const descriptionChars = form.getFieldValue('description').length;

    return (
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-8 max-w-3xl mx-auto">
            {/* Title */}
            <form.Field name="title">
                {(field) => (
                    <div>
                        <Label htmlFor="title" className="flex justify-between">
                            <span>Title *</span>
                            <span className={`text-xs ${titleChars > 100 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {titleChars}/100
                            </span>
                        </Label>
                        <Input
                            id="title"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g., Solar-Powered Water Purification System"
                            maxLength={100}
                            className="mt-1"
                        />
                    </div>
                )}
            </form.Field>

            {/* Category */}
            <form.Field name="categoryId">
                {(field) => (
                    <div>
                        <Label>Category *</Label>
                        <Select
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                            disabled={isLoadingCategories}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select a category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </form.Field>

            {/* Problem Statement */}
            <form.Field name="problemStatement">
                {(field) => (
                    <div>
                        <Label htmlFor="problemStatement" className="flex justify-between">
                            <span>Problem Statement *</span>
                            <span className={`text-xs ${problemChars > 500 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {problemChars}/500
                            </span>
                        </Label>
                        <Textarea
                            id="problemStatement"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Describe the problem your idea solves..."
                            rows={4}
                            maxLength={500}
                            className="mt-1"
                        />
                    </div>
                )}
            </form.Field>

            {/* Proposed Solution */}
            <form.Field name="solution">
                {(field) => (
                    <div>
                        <Label htmlFor="solution" className="flex justify-between">
                            <span>Proposed Solution *</span>
                            <span className={`text-xs ${solutionChars > 1000 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {solutionChars}/1000
                            </span>
                        </Label>
                        <Textarea
                            id="solution"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Describe your solution in detail..."
                            rows={6}
                            maxLength={1000}
                            className="mt-1"
                        />
                    </div>
                )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
                {(field) => (
                    <div>
                        <Label htmlFor="description" className="flex justify-between">
                            <span>Detailed Description *</span>
                            <span className={`text-xs ${descriptionChars > 5000 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {descriptionChars}/5000
                            </span>
                        </Label>
                        <Textarea
                            id="description"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Provide a comprehensive description of your idea..."
                            rows={8}
                            maxLength={5000}
                            className="mt-1"
                        />
                    </div>
                )}
            </form.Field>

            {/* Image Upload */}
            <div>
                <Label>Image (Optional)</Label>
                <div className="mt-1">
                    {imagePreview ? (
                        <div className="relative inline-block">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                width={120}
                                height={120}
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
                                onClick={() => document.getElementById('idea-image-upload')?.click()}
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
                                id="idea-image-upload"
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

            {/* Premium Options */}
            <div className="border rounded-lg p-4">
                <form.Field name="isPaid">
                    {(field) => (
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="isPaid" className="font-medium">Mark as Paid Idea</Label>
                                <p className="text-sm text-muted-foreground">
                                    Other members must pay to view this idea
                                </p>
                            </div>
                            <Switch
                                id="isPaid"
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                            />
                        </div>
                    )}
                </form.Field>

                {isPaid && (
                    <form.Field name="price">
                        {(field) => (
                            <div className="mt-4">
                                <Label htmlFor="price" className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Price *
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0.99"
                                    max="99.99"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="9.99"
                                    className="mt-1 max-w-[200px]"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Set a price between $0.99 and $99.99
                                </p>
                            </div>
                        )}
                    </form.Field>
                )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        'Submit for Review'
                    )}
                </Button>
            </div>
        </form>
    );
}