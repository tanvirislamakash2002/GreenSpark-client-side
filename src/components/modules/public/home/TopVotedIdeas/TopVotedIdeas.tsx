import Link from 'next/link';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTopVotedIdeas } from '@/actions/idea.action';
import { TopVotedIdeasCard } from './TopVotedIdeasCard';
import { TopVotedIdeasSkeleton } from './TopVotedIdeasSkeleton';

interface TopVotedIdeasProps {
    limit?: number;
}

export async function TopVotedIdeas({ limit = 3 }: TopVotedIdeasProps) {
    const result = await getTopVotedIdeas(limit);

    if (!result.success || !result.data || result.data.length === 0) {
        return null;
    }

    const ideas = result.data;

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium mb-4">
                        <Flame className="w-4 h-4" />
                        <span>Community Favorites</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Top Voted Ideas
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The most loved ideas by our community members
                    </p>
                </div>

                {/* Top 3 Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {ideas.map((idea, index) => (
                        <TopVotedIdeasCard 
                            key={idea.id} 
                            idea={idea} 
                            rank={index + 1} 
                        />
                    ))}
                </div>

                {/* Browse All Button */}
                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg" className="group">
                        <Link href="/ideas?sortBy=topVoted">
                            Browse All Top Voted Ideas
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

// Export skeleton for Suspense fallback
export { TopVotedIdeasSkeleton };