import { Bell, TrendingUp, Sparkles, Mail } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

const benefits = [
    {
        icon: Bell,
        title: 'New Ideas',
        description: 'Get notified about fresh sustainability ideas',
    },
    {
        icon: TrendingUp,
        title: 'Top Voted',
        description: "See what's trending in the community",
    },
    {
        icon: Sparkles,
        title: 'Announcements',
        description: 'Platform updates and new features',
    },
];

export function Newsletter() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
                            <Mail className="w-4 h-4" />
                            <span>Stay Connected</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            Stay Updated
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Get the latest sustainable ideas delivered to your inbox
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <NewsletterForm />

                    {/* Privacy Note */}
                    <p className="text-xs text-center text-muted-foreground mt-3">
                        We respect your privacy. Unsubscribe at any time.
                    </p>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-6 border-t">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{benefit.title}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}