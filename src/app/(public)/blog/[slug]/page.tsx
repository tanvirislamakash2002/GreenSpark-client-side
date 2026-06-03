import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Eye, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { dummyBlogPosts } from '@/lib/dummy-blog-data';
import { getCategoryLabel, getCategoryColor } from '@/constants/blog';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    return dummyBlogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = dummyBlogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | GreenSpark Blog`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.featuredImage ? [post.featuredImage] : [],
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
        },
    };
}

async function BlogPostContent({ slug }: { slug: string }) {
    const post = dummyBlogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = dummyBlogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    // Get author's other posts
    const authorPosts = dummyBlogPosts
        .filter((p) => p.author.name === post.author.name && p.id !== post.id)
        .slice(0, 2);

    return (
        <article className="min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20 pt-12 pb-8">
                <div className="container mx-auto px-4">
                    {/* Back button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Category Badge */}
                    <Badge className={`mb-4 ${getCategoryColor(post.category)} text-white`}>
                        {getCategoryLabel(post.category)}
                    </Badge>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
                        {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar || undefined} />
                                <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                                    {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{post.author.name}</span>
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
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.viewCount.toLocaleString()} views</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="container mx-auto px-4 -mt-8 mb-8">
                    <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="prose prose-green dark:prose-invert max-w-none">
                            <p className="lead">{post.excerpt}</p>
                            <h2>Introduction</h2>
                            <p>
                                {post.excerpt} This article explores the topic in depth, providing actionable 
                                insights and practical tips for implementing sustainable practices in your daily life.
                            </p>
                            <h2>Key Insights</h2>
                            <p>
                                Sustainability is more than just a trend—it's a necessary shift in how we approach 
                                our relationship with the planet. By making small changes in our daily habits, 
                                we can collectively create a significant positive impact on the environment.
                            </p>
                            <h3>Why This Matters</h3>
                            <p>
                                The choices we make today determine the world we leave for future generations. 
                                Embracing sustainable practices isn't just about reducing waste—it's about creating 
                                a regenerative system that supports both people and the planet.
                            </p>
                            <h3>Practical Steps You Can Take</h3>
                            <ul>
                                <li>Start with one small change and build momentum</li>
                                <li>Educate yourself and others about sustainable alternatives</li>
                                <li>Support businesses and initiatives that prioritize sustainability</li>
                                <li>Measure and track your progress to stay motivated</li>
                            </ul>
                            <h2>Conclusion</h2>
                            <p>
                                Every action counts. Whether you're just beginning your sustainability journey or 
                                you're a seasoned eco-warrior, your efforts contribute to a larger movement toward 
                                a greener, more sustainable future.
                            </p>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-4">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                                {post.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?search=${tag}`}>
                                        <Badge variant="outline" className="hover:bg-muted">
                                            #{tag}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        )}

                        <Separator />

                        {/* Engagement Buttons */}
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" className="gap-2">
                                <ThumbsUp className="w-4 h-4" />
                                Like
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Bookmark className="w-4 h-4" />
                                Save
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>

                        <Separator />

                        {/* Author Bio */}
                        <div className="bg-muted/30 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={post.author.avatar || undefined} />
                                    <AvatarFallback className="bg-green-100 text-green-700">
                                        {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{post.author.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {post.author.bio || 'Sustainability writer and environmental advocate'}
                                    </p>
                                    {authorPosts.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium mb-2">More from {post.author.name.split(' ')[0]}</p>
                                            <div className="space-y-1">
                                                {authorPosts.map((authorPost) => (
                                                    <Link
                                                        key={authorPost.id}
                                                        href={`/blog/${authorPost.slug}`}
                                                        className="text-sm text-green-600 hover:underline block"
                                                    >
                                                        {authorPost.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Table of Contents */}
                        <div className="rounded-xl border bg-card p-5">
                            <h3 className="font-semibold text-lg mb-3">Table of Contents</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#introduction" className="text-muted-foreground hover:text-green-600">Introduction</Link></li>
                                <li><Link href="#key-insights" className="text-muted-foreground hover:text-green-600">Key Insights</Link></li>
                                <li><Link href="#why-this-matters" className="text-muted-foreground hover:text-green-600">Why This Matters</Link></li>
                                <li><Link href="#practical-steps" className="text-muted-foreground hover:text-green-600">Practical Steps</Link></li>
                                <li><Link href="#conclusion" className="text-muted-foreground hover:text-green-600">Conclusion</Link></li>
                            </ul>
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="rounded-xl border bg-card p-5">
                                <h3 className="font-semibold text-lg mb-4">Related Posts</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="flex gap-3 group"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-muted">
                                                {relatedPost.featuredImage ? (
                                                    <Image
                                                        src={relatedPost.featuredImage}
                                                        alt={relatedPost.title}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                                                        <span className="text-2xl">🌿</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-green-600 transition-colors">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(relatedPost.publishedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Newsletter */}
                        <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white">
                            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
                            <p className="text-sm text-green-100 mb-4">
                                Get the latest sustainability insights delivered to your inbox.
                            </p>
                            <form className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-3 py-2 rounded-lg text-foreground bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <Button variant="secondary" size="sm" className="w-full">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    return (
        <main className="min-h-screen">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4" />
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                    </div>
                </div>
            }>
                <BlogPostContent slug={slug} />
            </Suspense>
        </main>
    );
}