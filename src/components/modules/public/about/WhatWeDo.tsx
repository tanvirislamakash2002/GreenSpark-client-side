import { Lightbulb, ThumbsUp, Shield, Globe } from 'lucide-react';

const activities = [
    {
        icon: Lightbulb,
        title: 'Share Ideas',
        description: 'Members submit their sustainability solutions, from small lifestyle changes to groundbreaking innovations.',
        color: 'bg-amber-100 dark:bg-amber-950/30 text-amber-600',
    },
    {
        icon: ThumbsUp,
        title: 'Community Voting',
        description: 'The community votes on ideas, ensuring the most impactful solutions rise to the top.',
        color: 'bg-green-100 dark:bg-green-950/30 text-green-600',
    },
    {
        icon: Shield,
        title: 'Expert Review',
        description: 'Our admin team reviews and approves ideas, providing constructive feedback for improvement.',
        color: 'bg-blue-100 dark:bg-blue-950/30 text-blue-600',
    },
    {
        icon: Globe,
        title: 'Impact Showcase',
        description: 'Successful ideas are highlighted and shared with partner organizations for implementation.',
        color: 'bg-purple-100 dark:bg-purple-950/30 text-purple-600',
    },
];

export function WhatWeDo() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What We Do</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        GreenSpark creates an ecosystem where great ideas can flourish and create real change.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {activities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={index} className="text-center p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${activity.color}`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}