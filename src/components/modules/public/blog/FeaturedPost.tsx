import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Star } from 'lucide-react';
import { BlogPost } from '@/types/blog.type';
import { Badge } from '@/components/ui/badge';
import { getCategoryLabel } from '@/constants/blog';

interface FeaturedPostProps {
    post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border">
                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
                        {post.featuredImage ? (
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 flex items-center justify-center">
                                <Star className="w-16 h-16 text-green-500 opacity-50" />
                            </div>
                        )}
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-amber-500 text-white border-0">
                                ✨ Featured
                            </Badge>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <Badge variant="secondary" className="w-fit mb-3">
                            {getCategoryLabel(post.category)}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-green-600 transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-green-600 font-medium hover:text-green-700 inline-flex items-center gap-1 w-fit"
                        >
                            Read Article →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}