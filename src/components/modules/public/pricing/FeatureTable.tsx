import { Check, X } from 'lucide-react';
import { PricingFeature } from '@/types/pricing.type';
import { cn } from '@/lib/utils';

interface FeatureTableProps {
    features: PricingFeature[];
}

export function FeatureTable({ features }: FeatureTableProps) {
    return (
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Compare All Features</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-4 px-4 font-semibold">Feature</th>
                            <th className="text-center py-4 px-4 font-semibold bg-green-50 dark:bg-green-950/20 rounded-t-lg">Free</th>
                            <th className="text-center py-4 px-4 font-semibold bg-green-100 dark:bg-green-900/30">Premium</th>
                            <th className="text-center py-4 px-4 font-semibold bg-green-50 dark:bg-green-950/20 rounded-t-lg">Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((item, index) => (
                            <tr key={index} className={cn(
                                "border-b",
                                index % 2 === 0 ? "bg-muted/30" : ""
                            )}>
                                <td className="py-3 px-4 text-sm font-medium">{item.feature}</td>
                                <td className="text-center py-3 px-4">
                                    {typeof item.free === 'boolean' ? (
                                        item.free ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">{item.free}</span>
                                    )}
                                </td>
                                <td className="text-center py-3 px-4 bg-green-50/50 dark:bg-green-950/10">
                                    {typeof item.premium === 'boolean' ? (
                                        item.premium ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">{item.premium}</span>
                                    )}
                                </td>
                                <td className="text-center py-3 px-4">
                                    {typeof item.enterprise === 'boolean' ? (
                                        item.enterprise ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">{item.enterprise}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}