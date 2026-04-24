import { Suspense } from 'react';
import { Metadata } from 'next';
import { pricingPlans, featureComparison, pricingFAQ } from '@/constants/pricing';
import { getCurrentUser } from '@/actions/payment.action';
import { PricingHero } from '@/components/modules/public/pricing/PricingHero';
import { PricingGrid } from '@/components/modules/public/pricing/PricingGrid';
import { FeatureTable } from '@/components/modules/public/pricing/FeatureTable';
import { PricingFAQ } from '@/components/modules/public/pricing/PricingFAQ';
import { TrustSection } from '@/components/modules/public/pricing/TrustSection';
import { PricingCta } from '@/components/modules/public/pricing/PricingCta';

export const metadata: Metadata = {
    title: 'Pricing - GreenSpark | Choose Your Plan',
    description: 'Simple, transparent pricing for sustainability ideas. Choose the plan that works for you - Free, Premium, or Enterprise.',
    keywords: 'pricing, subscription, premium ideas, sustainability membership',
};

async function PricingContent() {
    const { data: user } = await getCurrentUser();
    const isLoggedIn = !!user;

    return (
        <div className="container mx-auto px-4 py-12">
            <PricingHero />
            <PricingGrid plans={pricingPlans} isLoggedIn={isLoggedIn} />
            <FeatureTable features={featureComparison} />
            <TrustSection />
            <PricingFAQ faqs={pricingFAQ} />
            <PricingCta />
        </div>
    );
}

export default async function PricingPage() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
                        <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
                    </div>
                </div>
            }>
                <PricingContent />
            </Suspense>
        </main>
    );
}