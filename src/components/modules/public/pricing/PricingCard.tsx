import Link from 'next/link';
import { Check, X, Star } from 'lucide-react';
import { PricingPlan } from '@/types/pricing.type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: 'monthly' | 'yearly';
    isLoggedIn: boolean;
}

export function PricingCard({ plan, billingCycle, isLoggedIn }: PricingCardProps) {
    const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    const priceDisplay = price === 0 ? 'Free' : `$${price}`;
    const period = price === 0 ? '' : billingCycle === 'monthly' ? '/month' : '/year';
    
    const getButtonLink = () => {
        if (plan.slug === 'free') return plan.buttonLink;
        if (!isLoggedIn) return `/login?redirect=/pricing`;
        return plan.buttonLink;
    };

    return (
        <div className={cn(
            "relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg",
            plan.isPopular && "border-green-500 shadow-md"
        )}>
            {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600 text-white gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                    </Badge>
                </div>
            )}
            
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                    <span className="text-4xl font-bold">{priceDisplay}</span>
                    {period && <span className="text-muted-foreground">{period}</span>}
                </div>
                <Button 
                    asChild 
                    size="lg"
                    className={cn(
                        "w-full",
                        plan.isPopular 
                            ? "bg-green-600 hover:bg-green-700" 
                            : plan.slug === 'free' 
                                ? "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20" 
                                : ""
                    )}
                    variant={plan.slug === 'free' ? 'outline' : 'default'}
                >
                    <Link href={getButtonLink()}>
                        {plan.buttonText}
                    </Link>
                </Button>
            </div>
            
            <div className="space-y-3">
                <p className="text-sm font-medium mb-2">Features included:</p>
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                    </div>
                ))}
                
                {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <>
                        <p className="text-sm font-medium mt-4 mb-2">Not included:</p>
                        {plan.notIncluded.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                                <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}