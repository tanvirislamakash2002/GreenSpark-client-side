'use client';

import { useState } from 'react';
import { PricingPlan } from '@/types/pricing.type';
import { PricingCard } from './PricingCard';
import { BillingToggle } from './BillingToggle';

interface PricingGridProps {
    plans: PricingPlan[];
    isLoggedIn: boolean;
}

export function PricingGrid({ plans, isLoggedIn }: PricingGridProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="mb-16">
            <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        plan={plan}
                        billingCycle={billingCycle}
                        isLoggedIn={isLoggedIn}
                    />
                ))}
            </div>
        </div>
    );
}