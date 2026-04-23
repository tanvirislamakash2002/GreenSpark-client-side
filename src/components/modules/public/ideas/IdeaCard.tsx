import Link from 'next/link';
import Image from 'next/image';
import { Idea } from '@/types/idea.type';
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Lock, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IdeaCardProps {
    idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
    const votePercentage = idea.voteScore > 0 
        ? (idea.upvotes / (idea.upvotes + idea.downvotes)) * 100 
        : 0;

    return (
        <div className="group relative bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            {/* Image Section */}
            <Link href={`/ideas/${idea.id}`} className="block relative h-48 overflow-hidden bg-muted">
                {idea.imageUrl ? (
                    <Image
                        src={idea.imageUrl}
                        alt={idea.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
                        <Sparkles className="w-12 h-12 text-green-500" />
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 dark:bg-gray-900/90 text-foreground hover:bg-white/90">
                        {idea.categories[0]?.name}
                    </Badge>
                </div>
                
                {/* Paid Badge */}
                {idea.isPaid && (
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                        </Badge>
                    </div>
                )}
            </Link>

            {/* Content Section */}
            <div className="p-4">
                <Link href={`/ideas/${idea.id}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                        {idea.title}
                    </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {idea.description}
                </p>

                {/* Author & Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="truncate">By {idea.author.name}</span>
                    <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Voting & Interaction */}
                <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">{idea.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium">{idea.downvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{idea.commentCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{idea.viewCount}</span>
                        </div>
                    </div>
                    
                    <Link
                        href={`/ideas/${idea.id}`}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                        View Idea →
                    </Link>
                </div>

                {/* Vote Score Bar (Optional) */}
                <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${votePercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}