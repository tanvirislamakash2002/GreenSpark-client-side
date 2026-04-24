import { Shield, Lock, Users, Heart } from 'lucide-react';

const trustItems = [
    {
        icon: Shield,
        title: '30-Day Guarantee',
        description: 'Money-back guarantee if you\'re not satisfied',
    },
    {
        icon: Lock,
        title: 'Secure Payments',
        description: 'SSLCommerz & Stripe encrypted transactions',
    },
    {
        icon: Users,
        title: '10,000+ Members',
        description: 'Trusted by sustainability enthusiasts worldwide',
    },
    {
        icon: Heart,
        title: 'Cancel Anytime',
        description: 'No long-term contracts or hidden fees',
    },
];

export function TrustSection() {
    return (
        <div className="mb-16 py-8 border-t border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {trustItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="text-center">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Icon className="w-5 h-5 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}