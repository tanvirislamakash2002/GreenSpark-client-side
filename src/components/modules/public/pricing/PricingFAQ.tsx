'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types/pricing.type';
import { cn } from '@/lib/utils';

interface PricingFAQProps {
    faqs: FAQ[];
}

export function PricingFAQ({ faqs }: PricingFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={faq.id} className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                        >
                            <span>{faq.question}</span>
                            <ChevronDown className={cn(
                                "w-5 h-5 transition-transform duration-200",
                                openIndex === index ? "rotate-180" : ""
                            )} />
                        </button>
                        <div className={cn(
                            "px-4 overflow-hidden transition-all duration-300",
                            openIndex === index ? "pb-4 max-h-96" : "max-h-0"
                        )}>
                            <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}