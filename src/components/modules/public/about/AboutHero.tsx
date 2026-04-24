import { Leaf } from 'lucide-react';

export function AboutHero() {
    return (
        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20 py-20 md:py-28 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 opacity-30">
                <Leaf className="w-32 h-32 text-green-200 dark:text-green-900 rotate-12" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-30">
                <Leaf className="w-24 h-24 text-emerald-200 dark:text-emerald-900 -rotate-12" />
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                    About GreenSpark
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Empowering communities to spark sustainable change, one idea at a time.
                </p>
            </div>
        </section>
    );
}