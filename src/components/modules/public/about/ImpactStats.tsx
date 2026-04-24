import { Users, Lightbulb, CheckCircle, Globe } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: '10,000+',
        label: 'Active Members',
        description: 'Join our growing community',
    },
    {
        icon: Lightbulb,
        value: '500+',
        label: 'Ideas Shared',
        description: 'And counting every day',
    },
    {
        icon: CheckCircle,
        value: '200+',
        label: 'Approved Ideas',
        description: 'Quality verified',
    },
    {
        icon: Globe,
        value: '50+',
        label: 'Countries',
        description: 'Global reach',
    },
];

export function ImpactStats() {
    return (
        <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-700 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Impact So Far</h2>
                    <p className="text-green-100 max-w-2xl mx-auto">
                        Together, we're making a difference. Here's what our community has achieved.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm font-medium mb-1">{stat.label}</div>
                                <div className="text-xs text-green-100">{stat.description}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}