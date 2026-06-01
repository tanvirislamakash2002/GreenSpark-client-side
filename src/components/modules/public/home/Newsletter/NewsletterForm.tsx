'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/actions/newsletter/newsletter.action';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        const result = await subscribeToNewsletter(email);
        
        if (result.success) {
            setIsSuccess(true);
            setEmail('');
            toast.success(result.message);
            setTimeout(() => setIsSuccess(false), 3000);
        } else {
            toast.error(result.message || 'Failed to subscribe. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="h-11"
                        style={{ paddingLeft: '34px' }}
                    aria-label="Email address"
                />
            </div>
            <Button 
                type="submit" 
                disabled={isLoading || isSuccess}
                className="bg-green-600 hover:bg-green-700 h-11"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Subscribed!
                    </>
                ) : (
                    'Subscribe'
                )}
            </Button>
        </form>
    );
}