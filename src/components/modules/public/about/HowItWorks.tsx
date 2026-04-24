import { PenTool, ThumbsUp, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const steps = [
    {
        icon: PenTool,
        title: 'Submit Your Idea',
        description: 'Share your sustainability solution with the community.',
        step: '01',
    },
    {
        icon: ThumbsUp,
        title: 'Community Votes',
        description: 'Members upvote and comment on the best ideas.',
        step: '02',
    },
    {
        icon: Award,
        title: 'Admin Review',
        description: 'Experts approve quality ideas for publication.',
        step: '03',
    },
    {
        icon: TrendingUp,
        title: 'Make Impact',
        description: 'Top ideas get highlighted and implemented.',
        step: '04',
    },
];

export function HowItWorks() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">How GreenSpark Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Four simple steps to turn your idea into impact.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative text-center">
                                {/* Connector line (except last) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-muted -z-10" />
                                )}
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                                        <Icon className="w-8 h-8 text-green-600" />
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="text-center mt-12">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                        <Link href="/register">Start Your Journey</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}