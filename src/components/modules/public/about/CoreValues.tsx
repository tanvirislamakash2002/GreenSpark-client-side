import { Leaf, Users, Lightbulb, Globe, Lock, Heart } from 'lucide-react';

const values = [
    {
        icon: Leaf,
        title: 'Sustainability First',
        description: 'Every decision prioritizes environmental impact and long-term ecological balance.',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'We believe in the power of collective wisdom and collaborative problem-solving.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We embrace creative solutions and unconventional thinking.',
    },
    {
        icon: Globe,
        title: 'Global Impact',
        description: 'Thinking locally while connecting globally for maximum reach.',
    },
    {
        icon: Lock,
        title: 'Accessibility',
        description: 'Knowledge should be free. Premium features fund our mission.',
    },
    {
        icon: Heart,
        title: 'Passion',
        description: 'Driven by genuine care for our planet and future generations.',
    },
];

export function CoreValues() {
    return (
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        These principles guide everything we do at GreenSpark.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={index} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-background border">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}