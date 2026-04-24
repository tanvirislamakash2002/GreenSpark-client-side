import { Sparkles } from 'lucide-react';

export function PricingHero() {
    return (
        <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Support sustainability while accessing premium ideas and features.
                All plans include access to our growing community.
            </p>
        </section>
    );
}