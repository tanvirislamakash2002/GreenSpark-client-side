import Link from 'next/link';
import { ThumbsUp, User, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Idea } from '@/types/idea/idea.type';

interface TopVotedIdeasCardProps {
    idea: Idea;
    rank: number;
}

export function TopVotedIdeasCard({ idea, rank }: TopVotedIdeasCardProps) {
    const medalColors = {
        1: "text-yellow-500",
        2: "text-gray-400",
        3: "text-amber-600",
    };

    const medalEmojis = {
        1: "🥇",
        2: "🥈",
        3: "🥉",
    };

    // Truncate description to 100 characters
    const truncatedDescription = idea.description && idea.description.length > 100
        ? `${idea.description.substring(0, 100)}...`
        : idea.description || 'No description available';

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="group relative flex items-start gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-all duration-300">
            {/* Rank Badge */}
            <div className="flex-shrink-0">
                <div className={`text-3xl font-bold ${medalColors[rank as keyof typeof medalColors]}`}>
                    {medalEmojis[rank as keyof typeof medalEmojis]}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <Link href={`/ideas/${idea.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors line-clamp-1">
                        {idea.title}
                    </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {truncatedDescription}
                </p>

                {/* Author & Vote Info */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={idea.author?.image || undefined} />
                            <AvatarFallback className="text-xs bg-green-100 text-green-700">
                                {getInitials(idea.author?.name || 'U')}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                            {idea.author?.name || 'Unknown Author'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-green-600 fill-green-600" />
                            <span className="text-sm font-semibold">{idea.voteScore || 0}</span>
                        </div>
                        <Link 
                            href={`/ideas/${idea.id}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1 group"
                        >
                            Read more
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}