'use client';

import { useEffect, useState, useRef } from 'react';
import * as Icons from 'lucide-react';

interface ImpactStatsCardProps {
    iconName: string;
    value: number;
    label: string;
    color: string;
    bgColor: string;
    suffix?: string;
}

export function ImpactStatsCard({ iconName, value, label, color, bgColor, suffix = '' }: ImpactStatsCardProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Dynamically get the icon component
    const Icon = (Icons as any)[iconName];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const step = value / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    if (!Icon) {
        return null;
    }

    return (
        <div
            ref={cardRef}
            className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <div className={`p-3 rounded-full ${bgColor} mb-4`}>
                <Icon className={`h-8 w-8 ${color}`} />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-1">
                {formatNumber(count)}{suffix}
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}