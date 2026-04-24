'use client';

import { cn } from '@/lib/utils';

interface BillingToggleProps {
    billingCycle: 'monthly' | 'yearly';
    onChange: (cycle: 'monthly' | 'yearly') => void;
}

export function BillingToggle({ billingCycle, onChange }: BillingToggleProps) {
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-full inline-flex">
                <button
                    onClick={() => onChange('monthly')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all",
                        billingCycle === 'monthly'
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Monthly
                </button>
                <button
                    onClick={() => onChange('yearly')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all",
                        billingCycle === 'yearly'
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Yearly
                    <span className="ml-1 text-xs text-green-600">Save 20%</span>
                </button>
            </div>
        </div>
    );
}