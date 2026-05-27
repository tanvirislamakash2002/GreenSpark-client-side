import { Categories } from "@/components/modules/public/home/Categories";
import { FeaturedIdeas, FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { HeroSection } from "@/components/modules/public/home/HeroSection/HeroSection";
import { HowItWorks } from "@/components/modules/public/home/HowItWorks";
import { TopVotedIdeas } from "@/components/modules/public/home/TopVotedIdeas";

export default async function Home() {

  return (
    <main>
      <HeroSection />
      <Categories limit={12} />
      <FeaturedIdeas limit={6} />
      <TopVotedIdeas limit={3} />
      <HowItWorks />
    </main>
  );
}
