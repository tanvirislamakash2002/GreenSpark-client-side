import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CtaSection() {
    return (
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
            <div className="container mx-auto px-4 text-center">
                <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Make a Difference?
                </h2>
                <p className="text-green-100 max-w-2xl mx-auto mb-8">
                    Join thousands of changemakers who are already sharing and discovering sustainable ideas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary" className="gap-2">
                        <Link href="/register">
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        <Link href="/ideas">Explore Ideas</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}