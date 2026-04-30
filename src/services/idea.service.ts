import { GetIdeasParams, IdeasResponse, Idea } from '@/types/idea.type';
import { dummyIdeas } from '@/lib/dummy-data';

const ITEMS_PER_PAGE = 12;

// Filter ideas based on params
const filterIdeas = (ideas: Idea[], params: GetIdeasParams): Idea[] => {
    let filtered = [...ideas];

    // Filter by status (only show APPROVED ideas)
    filtered = filtered.filter(idea => idea.status === 'APPROVED');

    // Search filter
    if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(idea =>
            idea.title.toLowerCase().includes(searchLower) ||
            idea.description.toLowerCase().includes(searchLower) ||
            idea.problemStatement.toLowerCase().includes(searchLower)
        );
    }

    // Category filter
    if (params.category && params.category !== 'all') {
        filtered = filtered.filter(idea =>
            idea.categories.some(cat => cat.slug === params.category)
        );
    }

    // Payment status filter
    if (params.status === 'free') {
        filtered = filtered.filter(idea => !idea.isPaid);
    } else if (params.status === 'paid') {
        filtered = filtered.filter(idea => idea.isPaid);
    }

    // Sorting
    switch (params.sortBy) {
        case 'topVoted':
            filtered.sort((a, b) => b.voteScore - a.voteScore);
            break;
        case 'mostCommented':
            filtered.sort((a, b) => b.commentCount - a.commentCount);
            break;
        case 'mostViewed':
            filtered.sort((a, b) => b.viewCount - a.viewCount);
            break;
        case 'recent':
        default:
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
    }

    return filtered;
};

export const ideaService = {
    getIdeas: async (params?: GetIdeasParams): Promise<IdeasResponse> => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const page = params?.page || 1;
            const limit = params?.limit || ITEMS_PER_PAGE;
            
            let filteredIdeas = filterIdeas(dummyIdeas as Idea[], params || {});
            
            const totalItems = filteredIdeas.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedIdeas = filteredIdeas.slice(startIndex, endIndex);

            return {
                success: true,
                data: {
                    ideas: paginatedIdeas,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems,
                        itemsPerPage: limit,
                    },
                },
            };
        } catch (error) {
            console.error('Get ideas error:', error);
            return {
                success: false,
                message: 'Failed to fetch ideas',
            };
        }
    },

    getIdeaById: async (id: string) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const idea = dummyIdeas.find(idea => idea.id === id);
            
            if (!idea) {
                return {
                    success: false,
                    message: 'Idea not found',
                };
            }

            return {
                success: true,
                data: idea,
            };
        } catch (error) {
            console.error('Get idea by ID error:', error);
            return {
                success: false,
                message: 'Something went wrong',
            };
        }
    },
};