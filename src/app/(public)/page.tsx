import { Categories } from "@/components/modules/public/home/Categories";
import { CTA } from "@/components/modules/public/home/CTA";
import { FeaturedIdeas, FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { HeroSection } from "@/components/modules/public/home/HeroSection/HeroSection";
import { HowItWorks } from "@/components/modules/public/home/HowItWorks";
import { ImpactStats } from "@/components/modules/public/home/ImpactStats";
import { Newsletter } from "@/components/modules/public/home/Newsletter";
import { TopVotedIdeas } from "@/components/modules/public/home/TopVotedIdeas";
export const dynamic = 'force-static';
export default async function Home() {

  return (
    <main>
      <HeroSection />
      <ImpactStats />
      <Categories limit={12} />
      <FeaturedIdeas limit={6} />
      <HowItWorks />
      <TopVotedIdeas limit={3} />
      <Newsletter />
      <CTA />
    </main>
  );
}
