import Link from 'next/link';
import Image from 'next/image';
import { ThumbsUp, Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Idea } from '@/types/idea.type';

interface FeaturedIdeasCardProps {
    idea: Idea;
}

export function FeaturedIdeasCard({ idea }: FeaturedIdeasCardProps) {
    // Get the first category for the badge
    const primaryCategory = idea.categories[0];

    // Truncate description to 120 characters
    const truncatedDescription = idea.description.length > 120
        ? `${idea.description.substring(0, 120)}...`
        : idea.description;

    return (
        <div className="group relative flex flex-col h-full rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
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
                        <span className="text-4xl">🌿</span>
                    </div>
                )}
                
                {/* Category Badge */}
                {primaryCategory && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 dark:bg-gray-900/90 text-foreground hover:bg-white/90 backdrop-blur-sm">
                            {primaryCategory.name}
                        </Badge>
                    </div>
                )}

                {/* Paid Badge */}
                {idea.isPaid && (
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                            Premium
                        </Badge>
                    </div>
                )}
            </Link>

            {/* Content Section */}
            <div className="flex-1 p-4">
                <Link href={`/ideas/${idea.id}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                        {idea.title}
                    </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {truncatedDescription}
                </p>

                {/* Author & Vote Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="text-xs truncate max-w-[100px]">
                            {idea.author.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-medium">{idea.voteScore}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span className="text-xs">{idea.viewCount}</span>
                        </div>
                    </div>
                </div>

                {/* View Button */}
                <Button asChild variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors">
                    <Link href={`/ideas/${idea.id}`}>
                        View Idea
                    </Link>
                </Button>
            </div>
        </div>
    );
}