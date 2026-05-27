import { HeroSectionSkeleton } from "@/components/modules/public/home/HeroSection/HeroSectionSkeleton";
import { FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";

export default function PublicLoading() {
    return (
        <main>
            <HeroSectionSkeleton />
            <FeaturedIdeasSkeleton />
        </main>
    );
}