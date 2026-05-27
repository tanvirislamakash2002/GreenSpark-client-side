import { HeroSectionSkeleton } from "@/components/modules/public/home/HeroSection/HeroSectionSkeleton";
import { FeaturedIdeasSkeleton } from "@/components/modules/public/home/FeaturedIdeas";
import { TopVotedIdeasSkeleton } from "@/components/modules/public/home/TopVotedIdeas";
import { CategoriesSkeleton } from "@/components/modules/public/home/Categories";
import { HowItWorksSkeleton } from "@/components/modules/public/home/HowItWorks";
import { ImpactStatsSkeleton } from "@/components/modules/public/home/ImpactStats";
import { CTASkeleton } from "@/components/modules/public/home/CTA";

export default function PublicLoading() {
    return (
        <main>
            <HeroSectionSkeleton />
            <CategoriesSkeleton />
            <FeaturedIdeasSkeleton />
            <HowItWorksSkeleton /> 
            <TopVotedIdeasSkeleton /> 
            <ImpactStatsSkeleton  /> 
            <CTASkeleton  /> 
        </main>
    );
}