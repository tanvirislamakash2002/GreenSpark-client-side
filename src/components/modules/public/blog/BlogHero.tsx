import { BookOpen } from 'lucide-react';

export function BlogHero() {
    return (
        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20 py-16 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>GreenSpark Blog</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                    Sustainability Insights
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover practical tips, inspiring success stories, and the latest eco-innovations.
                </p>
            </div>
        </section>
    );
}