import Link from "next/link";
import { 
    Lightbulb, 
    ThumbsUp, 
    ShieldCheck, 
    TrendingUp,
    ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HowItWorksStep } from "./HowItWorksStep";

const steps = [
    {
        step: 1,
        title: "Share Your Idea",
        description: "Submit your sustainability solution with a detailed description and images.",
        icon: Lightbulb,
        iconColor: "text-yellow-500",
        iconBgColor: "bg-yellow-100 dark:bg-yellow-950/30",
    },
    {
        step: 2,
        title: "Community Votes",
        description: "Members upvote and downvote ideas to surface the best solutions.",
        icon: ThumbsUp,
        iconColor: "text-green-500",
        iconBgColor: "bg-green-100 dark:bg-green-950/30",
    },
    {
        step: 3,
        title: "Admin Review",
        description: "Our experts review ideas and provide constructive feedback.",
        icon: ShieldCheck,
        iconColor: "text-blue-500",
        iconBgColor: "bg-blue-100 dark:bg-blue-950/30",
    },
    {
        step: 4,
        title: "Make Impact",
        description: "Top ideas are highlighted and shared with the community.",
        icon: TrendingUp,
        iconColor: "text-purple-500",
        iconBgColor: "bg-purple-100 dark:bg-purple-950/30",
    },
];

export function HowItWorks() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        How GreenSpark Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Four simple steps to turn your idea into real impact
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-muted -z-10" />
                    
                    {steps.map((step) => (
                        <HowItWorksStep
                            key={step.step}
                            step={step.step}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                            iconColor={step.iconColor}
                            iconBgColor={step.iconBgColor}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 group">
                        <Link href="/member/ideas/create">
                            Start Sharing
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}