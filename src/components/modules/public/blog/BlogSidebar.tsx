import Link from 'next/link';
import { BlogPost, PopularPost, CategoryCount } from '@/types/blog.type';
import { Eye, TrendingUp, FolderOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogSidebarProps {
    popularPosts: PopularPost[];
    recentPosts: BlogPost[];
    categoryCounts: CategoryCount[];
}

export function BlogSidebar({ popularPosts, recentPosts, categoryCounts }: BlogSidebarProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Popular Posts */}
            <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Popular Posts</h3>
                </div>
                <div className="space-y-3">
                    {popularPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        >
                            <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-2 group-hover:text-green-600 transition-colors">
                                    {post.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{post.viewCount} views</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Posts */}
            <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold text-lg mb-4">Recent Posts</h3>
                <div className="space-y-3">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="block group"
                        >
                            <p className="text-sm font-medium line-clamp-2 group-hover:text-green-600 transition-colors">
                                {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <FolderOpen className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Categories</h3>
                </div>
                <div className="space-y-2">
                    {categoryCounts.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/blog?category=${category.slug}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            <span className="text-sm">{category.name}</span>
                            <Badge variant="secondary" className="text-xs">
                                {category.count}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}