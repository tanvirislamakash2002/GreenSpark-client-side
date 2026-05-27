import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
}

export function HowItWorksStep({ step, title, description, icon: Icon, iconColor, iconBgColor }: HowItWorksStepProps) {
    return (
        <div className="relative flex flex-col items-center text-center">
            {/* Step Number Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {step}
                </div>
            </div>

            {/* Icon Container */}
            <div className={`p-4 rounded-full ${iconBgColor} mb-4 mt-4`}>
                <Icon className={`h-8 w-8 ${iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm max-w-xs">
                {description}
            </p>
        </div>
    );
}