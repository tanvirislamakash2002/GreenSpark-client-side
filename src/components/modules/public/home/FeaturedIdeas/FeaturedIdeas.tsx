import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedIdeas } from '@/actions/idea/idea.action';
import { FeaturedIdeasCard } from './FeaturedIdeasCard';
import { FeaturedIdeasSkeleton } from './FeaturedIdeasSkeleton';

interface FeaturedIdeasProps {
    limit?: number;
}

export async function FeaturedIdeas({ limit = 6 }: FeaturedIdeasProps) {
    const result = await getFeaturedIdeas(limit);
    
    if (!result.success || !result.data || result.data.length === 0) {
        return null;
    }

    const ideas = result.data;
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Curated for You</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Featured Sustainability Ideas
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the most innovative eco-friendly solutions from our community
                    </p>
                </div>

                {/* Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((idea) => (
                        <FeaturedIdeasCard key={idea.id} idea={idea} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline" className="group">
                        <Link href="/ideas">
                            Browse All Ideas
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

// Export skeleton for Suspense fallback
export { FeaturedIdeasSkeleton };