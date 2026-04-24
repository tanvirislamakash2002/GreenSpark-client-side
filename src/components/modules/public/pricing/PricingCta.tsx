import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingCta() {
    return (
        <section className="text-center py-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl">
            <div className="max-w-2xl mx-auto px-6">
                <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Ready to unlock premium sustainability ideas?
                </h2>
                <p className="text-green-100 mb-6">
                    Join thousands of changemakers who are already accessing premium content and making a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary" className="gap-2">
                        <Link href="/register">
                            Start Free Trial
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        <Link href="/contact">Contact Sales</Link>
                    </Button>
                </div>
                <p className="text-green-100 text-xs mt-4">
                    No credit card required for free trial. Cancel anytime.
                </p>
            </div>
        </section>
    );
}