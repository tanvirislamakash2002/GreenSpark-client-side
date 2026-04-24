'use client';

import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/actions/blog.action';

export function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubscribing(true);
        const result = await subscribeToNewsletter(email);
        if (result.success) {
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
        } else {
            toast.error('Failed to subscribe. Please try again.');
        }
        setIsSubscribing(false);
    };

    return (
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
            <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                    <Mail className="w-4 h-4" />
                    <span>Stay Updated</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    Get Blog Updates
                </h3>
                <p className="text-green-100 mb-6">
                    Subscribe to receive the latest sustainability insights and tips directly in your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/90 border-0 focus:ring-2 focus:ring-white"
                    />
                    <Button 
                        type="submit" 
                        disabled={isSubscribing}
                        variant="secondary"
                        className="gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                </form>
                <p className="text-green-100 text-xs mt-4">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}