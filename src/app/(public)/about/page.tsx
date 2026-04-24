import { AboutHero } from '@/components/modules/public/about/AboutHero';
import { ContactInfo } from '@/components/modules/public/about/ContactInfo';
import { CoreValues } from '@/components/modules/public/about/CoreValues';
import { CtaSection } from '@/components/modules/public/about/CtaSection';
import { HowItWorks } from '@/components/modules/public/about/HowItWorks';
import { ImpactStats } from '@/components/modules/public/about/ImpactStats';
import { MissionVision } from '@/components/modules/public/about/MissionVision';
import { OurStory } from '@/components/modules/public/about/OurStory';
import { WhatWeDo } from '@/components/modules/public/about/WhatWeDo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About GreenSpark - Our Mission for a Sustainable Future',
    description: 'Learn about GreenSpark\'s mission to empower communities to share and vote on sustainability ideas. Join us in building a greener future.',
    keywords: 'sustainability, green ideas, eco-friendly, environmental impact, green community',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <AboutHero />
            <MissionVision />
            <OurStory />
            <WhatWeDo />
            <CoreValues />
            <ImpactStats />
            <HowItWorks />
            <CtaSection />
            <ContactInfo />
        </main>
    );
}