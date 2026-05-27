import { HeroSectionSkeleton } from "@/components/modules/public/home/HeroSection/HeroSectionSkeleton";
import { FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { TopVotedIdeasSkeleton } from "@/components/modules/public/home/TopVotedIdeas";

export default function PublicLoading() {
    return (
        <main>
            <HeroSectionSkeleton />
            <FeaturedIdeasSkeleton />
            <TopVotedIdeasSkeleton /> 
        </main>
    );
}