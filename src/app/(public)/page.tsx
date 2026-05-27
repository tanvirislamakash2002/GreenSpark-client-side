import { FeaturedIdeas, FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { HeroSection } from "@/components/modules/public/home/HeroSection/HeroSection";
import { TopVotedIdeas } from "@/components/modules/public/home/TopVotedIdeas";

export default async function Home() {

  return (
    <main>
      <HeroSection />
      <FeaturedIdeas limit={6} />
      <TopVotedIdeas limit={3} />
    </main>
  );
}
