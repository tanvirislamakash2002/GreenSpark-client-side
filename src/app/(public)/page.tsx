import { FeaturedIdeas, FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { HeroSection } from "@/components/modules/public/home/HeroSection/HeroSection";

export default async function Home() {

  return (
    <main>
      <HeroSection />
      <FeaturedIdeas limit={6} />
    </main>
  );
}
