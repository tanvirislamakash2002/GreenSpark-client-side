import { BlogPost, GetBlogPostsParams, BlogPostsResponse, PopularPost, CategoryCount } from '@/types/blog.type';
import { dummyBlogPosts } from '@/lib/dummy-blog-data';
import { BlogCategory } from '@/types/blog.type';

const ITEMS_PER_PAGE = 6;

const filterPosts = (posts: BlogPost[], params: GetBlogPostsParams): BlogPost[] => {
    let filtered = [...posts];

    // Search filter
    if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    // Category filter (excluding 'all')
    if (params.category && params.category !== 'all') {
        filtered = filtered.filter(post => post.category === params.category);
    }

    // Sort by published date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return filtered;
};

export const blogService = {
    getBlogPosts: async (params?: GetBlogPostsParams): Promise<BlogPostsResponse> => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const page = params?.page || 1;
            const limit = params?.limit || ITEMS_PER_PAGE;
            
            // Get filtered posts
            let filteredPosts = filterPosts(dummyBlogPosts as BlogPost[], params || {});
            
            // Get featured post
            const featuredPost = filteredPosts.find(post => post.isFeatured);
            
            // Remove featured post from regular list if present
            const regularPosts = featuredPost 
                ? filteredPosts.filter(post => post.id !== featuredPost.id)
                : filteredPosts;
            
            // Pagination for regular posts
            const totalItems = regularPosts.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedPosts = regularPosts.slice(startIndex, endIndex);

            return {
                success: true,
                data: {
                    posts: paginatedPosts,
                    featuredPost: params?.page === 1 ? featuredPost : undefined,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems,
                        itemsPerPage: limit,
                    },
                },
            };
        } catch (error) {
            console.error('Get blog posts error:', error);
            return {
                success: false,
                message: 'Failed to fetch blog posts',
            };
        }
    },

    getPopularPosts: async (limit: number = 5): Promise<PopularPost[]> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const popular = [...dummyBlogPosts]
                .sort((a, b) => b.viewCount - a.viewCount)
                .slice(0, limit)
                .map(post => ({
                    id: post.id,
                    slug: post.slug,
                    title: post.title,
                    viewCount: post.viewCount,
                }));
            
            return popular;
        } catch (error) {
            console.error('Get popular posts error:', error);
            return [];
        }
    },

    getRecentPosts: async (limit: number = 5): Promise<BlogPost[]> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const recent = [...dummyBlogPosts]
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                .slice(0, limit);
            
            return recent;
        } catch (error) {
            console.error('Get recent posts error:', error);
            return [];
        }
    },

    getCategoryCounts: async (): Promise<CategoryCount[]> => {
        try {
            const categories: CategoryCount[] = [
                { name: 'All Posts', slug: 'all', count: dummyBlogPosts.length },
                { name: 'Sustainability Tips', slug: 'tips', count: dummyBlogPosts.filter(p => p.category === 'tips').length },
                { name: 'Success Stories', slug: 'success-stories', count: dummyBlogPosts.filter(p => p.category === 'success-stories').length },
                { name: 'Eco Innovations', slug: 'innovations', count: dummyBlogPosts.filter(p => p.category === 'innovations').length },
                { name: 'Community News', slug: 'news', count: dummyBlogPosts.filter(p => p.category === 'news').length },
                { name: 'Guest Posts', slug: 'guest-posts', count: dummyBlogPosts.filter(p => p.category === 'guest-posts').length },
            ];
            
            return categories;
        } catch (error) {
            console.error('Get category counts error:', error);
            return [];
        }
    },
};