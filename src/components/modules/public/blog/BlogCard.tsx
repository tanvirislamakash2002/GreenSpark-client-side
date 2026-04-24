import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '@/types/blog.type';
import { Badge } from '@/components/ui/badge';
import { getCategoryLabel } from '@/constants/blog';

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image */}
            <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-muted">
                {post.featuredImage ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                        <span className="text-4xl">🌿</span>
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                        {getCategoryLabel(post.category)}
                    </Badge>
                </div>
            </Link>
            
            {/* Content */}
            <div className="p-4">
                <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                        {post.title}
                    </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min</span>
                    </div>
                </div>
                <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
}