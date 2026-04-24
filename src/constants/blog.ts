import { BlogCategory, CategoryCount } from '@/types/blog.type';

export const blogCategories: { label: string; value: BlogCategory; color: string }[] = [
    { label: 'All Posts', value: 'all', color: 'bg-gray-500' },
    { label: 'Sustainability Tips', value: 'tips', color: 'bg-green-500' },
    { label: 'Success Stories', value: 'success-stories', color: 'bg-blue-500' },
    { label: 'Eco Innovations', value: 'innovations', color: 'bg-purple-500' },
    { label: 'Community News', value: 'news', color: 'bg-orange-500' },
    { label: 'Guest Posts', value: 'guest-posts', color: 'bg-amber-500' },
];

export const getCategoryColor = (category: BlogCategory): string => {
    const found = blogCategories.find(c => c.value === category);
    return found?.color || 'bg-gray-500';
};

export const getCategoryLabel = (category: BlogCategory): string => {
    const found = blogCategories.find(c => c.value === category);
    return found?.label || category;
};