import { HeroSectionSkeleton } from "@/components/modules/public/home/HeroSection/HeroSectionSkeleton";
import { FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { TopVotedIdeasSkeleton } from "@/components/modules/public/home/TopVotedIdeas";
import { CategoriesSkeleton } from "@/components/modules/public/home/Categories";

export default function PublicLoading() {
    return (
        <main>
            <HeroSectionSkeleton />
            <CategoriesSkeleton />
            <FeaturedIdeasSkeleton />
            <TopVotedIdeasSkeleton /> 
        </main>
    );
}