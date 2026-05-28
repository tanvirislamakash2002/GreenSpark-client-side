'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Loader2,
    DollarSign,
    X,
    Upload,
    ImageIcon,
    Info,
    TrendingUp,
    Leaf,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { updateIdea } from '@/actions/idea/member-idea.action';
import { getCategories } from '@/actions/category.action';
import { uploadTempAvatar } from '@/actions/upload.action';
import Image from 'next/image';
import { Category } from '@/types/category.type';
import { Idea } from '@/types/idea/idea.type';
import { cn } from '@/lib/utils';

// ✅ Zod Schema (same as create)
const editIdeaSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title cannot exceed 100 characters'),
    problemStatement: z.string()
        .min(20, 'Problem statement must be at least 20 characters')
        .max(500, 'Problem statement cannot exceed 500 characters'),
    solution: z.string()
        .min(50, 'Proposed solution must be at least 50 characters')
        .max(1000, 'Proposed solution cannot exceed 1000 characters'),
    description: z.string()
        .min(100, 'Description must be at least 100 characters')
        .max(5000, 'Description cannot exceed 5000 characters'),
    imageUrl: z.string().optional(),
    isPaid: z.boolean(),
    price: z.number().nullable().optional(),
    categoryId: z.string().min(1, 'Please select a category'),
}).refine((data) => {
    if (data.isPaid && (!data.price || data.price <= 0)) {
        return false;
    }
    return true;
}, {
    message: 'Please enter a valid price for paid idea',
    path: ['price'],
});

type EditIdeaFormValues = z.infer<typeof editIdeaSchema>;

interface EditIdeaFormProps {
    idea: Idea;
}

export function EditIdeaForm({ idea }: EditIdeaFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(idea.imageUrl || null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [activeTab, setActiveTab] = useState('basic');

    // Get the current category ID from the idea
    const currentCategoryId = idea.categories?.[0]?.id || '';

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid, isDirty },
        trigger
    } = useForm<EditIdeaFormValues>({
        resolver: zodResolver(editIdeaSchema),
        defaultValues: {
            title: idea.title,
            problemStatement: idea.problemStatement,
            solution: idea.solution,
            description: idea.description,
            imageUrl: idea.imageUrl || '',
            isPaid: idea.isPaid,
            price: idea.price,
            categoryId: currentCategoryId,
        },
        mode: 'onChange',
    });

    const isPaid = watch('isPaid');
    const titleChars = watch('title')?.length || 0;
    const problemChars = watch('problemStatement')?.length || 0;
    const solutionChars = watch('solution')?.length || 0;
    const descriptionChars = watch('description')?.length || 0;

    const titleProgress = Math.min((titleChars / 100) * 100, 100);
    const problemProgress = Math.min((problemChars / 500) * 100, 100);
    const solutionProgress = Math.min((solutionChars / 1000) * 100, 100);
    const descriptionProgress = Math.min((descriptionChars / 5000) * 100, 100);
    const overallProgress = Math.round((titleProgress + problemProgress + solutionProgress + descriptionProgress) / 4);

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
            setValue('imageUrl', result.data.url);
            setImagePreview(result.data.url);
            toast.success('Image uploaded');
        } else {
            toast.error(result.message || 'Failed to upload image');
        }
        setIsUploading(false);
    };

    const removeImage = () => {
        setValue('imageUrl', '');
        setImagePreview(null);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getCategories();
            if (result.success && result.data) {
                setCategories(result.data.categories);
            }
            setIsLoadingCategories(false);
        };
        fetchCategories();
    }, []);

    const onSubmit = async (data: EditIdeaFormValues) => {
        setIsLoading(true);

        const result = await updateIdea(idea.id, {
            title: data.title.trim(),
            problemStatement: data.problemStatement.trim(),
            solution: data.solution.trim(),
            description: data.description.trim(),
            imageUrl: data.imageUrl || undefined,
            isPaid: data.isPaid,
            price: data.isPaid ? data.price || undefined : undefined,
            categoryId: data.categoryId,
        });

        if (result.success) {
            toast.success('Idea updated successfully!');
            router.push('/member/ideas');
        } else {
            toast.error(result.message || 'Failed to update idea');
        }
        setIsLoading(false);
    };

    // Check if form has any changes
    const hasChanges = isDirty;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <Card className="mb-6 border-green-100 dark:border-green-900/30 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/10">
                <CardContent className="pt-4 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {isValid && hasChanges ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                            <span className="text-sm font-medium">
                                {isValid && hasChanges ? "Ready to update" : hasChanges ? "Complete all required fields" : "No changes made"}
                            </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {overallProgress}% complete
                        </span>
                    </div>
                    <Progress value={overallProgress} className="h-1.5" />
                </CardContent>
            </Card>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 flex flex-col">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                        <TabsTrigger value="basic" className="gap-2 text-sm">
                            <Info className="h-3.5 w-3.5" />
                            Basic Info
                        </TabsTrigger>
                        <TabsTrigger value="content" className="gap-2 text-sm">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Content
                        </TabsTrigger>
                        <TabsTrigger value="media" className="gap-2 text-sm">
                            <ImageIcon className="h-3.5 w-3.5" />
                            Media
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                        {/* Basic Info Tab */}
                        <TabsContent value="basic" className="space-y-4 mt-0">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Basic Information</CardTitle>
                                    <CardDescription className="text-sm">
                                        Edit your idea's basic information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="title" className="text-sm font-medium">
                                                Title <span className="text-red-500">*</span>
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                {titleChars}/100
                                            </span>
                                        </div>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Solar-Powered Water Purification System"
                                            maxLength={100}
                                            className={cn(
                                                "h-10 text-sm w-full",
                                                errors.title && "border-red-500 focus-visible:ring-red-500"
                                            )}
                                            {...register('title')}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500">{errors.title.message}</p>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Category <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            defaultValue={currentCategoryId}
                                            onValueChange={(value) => {
                                                setValue('categoryId', value);
                                                trigger('categoryId');
                                            }}
                                            disabled={isLoadingCategories}
                                        >
                                            <SelectTrigger className={cn(
                                                "h-10",
                                                errors.categoryId && "border-red-500 ring-red-500"
                                            )}>
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
                                        {errors.categoryId && (
                                            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Content Tab */}
                        <TabsContent value="content" className="space-y-4 mt-0">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Idea Content</CardTitle>
                                    <CardDescription className="text-sm">
                                        Edit the problem and your solution
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    {/* Problem Statement */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="problemStatement" className="text-sm font-medium">
                                                Problem Statement <span className="text-red-500">*</span>
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                {problemChars}/500
                                            </span>
                                        </div>
                                        <Textarea
                                            id="problemStatement"
                                            placeholder="What problem does your idea solve? Be specific and detailed..."
                                            rows={4}
                                            maxLength={500}
                                            className={cn(
                                                "resize-none text-sm",
                                                errors.problemStatement && "border-red-500 focus-visible:ring-red-500"
                                            )}
                                            {...register('problemStatement')}
                                        />
                                        {errors.problemStatement && (
                                            <p className="text-sm text-red-500">{errors.problemStatement.message}</p>
                                        )}
                                    </div>

                                    {/* Proposed Solution */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="solution" className="text-sm font-medium">
                                                Proposed Solution <span className="text-red-500">*</span>
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                {solutionChars}/1000
                                            </span>
                                        </div>
                                        <Textarea
                                            id="solution"
                                            placeholder="How does your solution work? Explain the mechanism, approach, or technology..."
                                            rows={5}
                                            maxLength={1000}
                                            className={cn(
                                                "resize-none text-sm",
                                                errors.solution && "border-red-500 focus-visible:ring-red-500"
                                            )}
                                            {...register('solution')}
                                        />
                                        {errors.solution && (
                                            <p className="text-sm text-red-500">{errors.solution.message}</p>
                                        )}
                                    </div>

                                    {/* Detailed Description */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="description" className="text-sm font-medium">
                                                Detailed Description <span className="text-red-500">*</span>
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                {descriptionChars}/5000
                                            </span>
                                        </div>
                                        <Textarea
                                            id="description"
                                            placeholder="Provide a comprehensive description of your idea, including implementation details, potential challenges, and expected impact..."
                                            rows={8}
                                            maxLength={5000}
                                            className={cn(
                                                "resize-none text-sm",
                                                errors.description && "border-red-500 focus-visible:ring-red-500"
                                            )}
                                            {...register('description')}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500">{errors.description.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Media & Settings Tab */}
                        <TabsContent value="media" className="space-y-4 mt-0">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Media & Settings</CardTitle>
                                    <CardDescription className="text-sm">
                                        Update visuals and premium options
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Featured Image</Label>
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                                            {imagePreview ? (
                                                <div className="relative inline-block">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        width={160}
                                                        height={160}
                                                        className="rounded-lg object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="p-3 rounded-full bg-muted">
                                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => document.getElementById('idea-image-upload')?.click()}
                                                            disabled={isUploading}
                                                        >
                                                            {isUploading ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                                    Uploading...
                                                                </>
                                                            ) : (
                                                                'Choose Image'
                                                            )}
                                                        </Button>
                                                        <input
                                                            id="idea-image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        JPG, PNG, GIF, WEBP. Max 2MB.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Premium Options */}
                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                            <div>
                                                <Label htmlFor="isPaid" className="text-sm font-medium">Premium Idea</Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Other members must pay to view this idea
                                                </p>
                                            </div>
                                            <Switch
                                                id="isPaid"
                                                checked={isPaid}
                                                onCheckedChange={(checked) => {
                                                    setValue('isPaid', checked);
                                                    if (!checked) {
                                                        setValue('price', null);
                                                    }
                                                    trigger('price');
                                                }}
                                            />
                                        </div>

                                        {isPaid && (
                                            <div className="space-y-2">
                                                <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                                                    <DollarSign className="h-4 w-4" />
                                                    Price <span className="text-red-500">*</span>
                                                </Label>
                                                <div className="relative max-w-[200px]">
                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.99"
                                                        max="99.99"
                                                        placeholder="9.99"
                                                        className={cn(
                                                            "pl-8 h-9 text-sm",
                                                            errors.price && "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                        {...register('price', { valueAsNumber: true })}
                                                    />
                                                </div>
                                                {errors.price && (
                                                    <p className="text-sm text-red-500">{errors.price.message}</p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    Set a price between $0.99 and $99.99
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>

                {/* Form Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isLoading}
                        className="sm:w-auto w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 sm:w-auto w-full"
                        disabled={isLoading || !isValid || !hasChanges}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Leaf className="mr-2 h-4 w-4" />
                                Update Idea
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}