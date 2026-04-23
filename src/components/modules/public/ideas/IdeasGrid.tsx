import { Idea } from '@/types/idea.type';
import { IdeaCard } from './IdeaCard';
import { EmptyState } from './EmptyState';

interface IdeasGridProps {
    ideas: Idea[];
}

export function IdeasGrid({ ideas }: IdeasGridProps) {
    if (ideas.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
        </div>
    );
}