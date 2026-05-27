import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoriesCardProps {
    name: string;
    slug: string;
    icon: LucideIcon;
    count: number;
    color: string;
    bgColor: string;
}

export function CategoriesCard({ name, slug, icon: Icon, count, color, bgColor }: CategoriesCardProps) {
    return (
        <Link
            href={`/ideas?category=${slug}`}
            className="group block p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`p-3 rounded-full ${bgColor} mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className={`h-8 w-8 ${color}`} />
                </div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-lg mb-1">{name}</h3>
                
                {/* Idea Count */}
                <p className="text-sm text-muted-foreground">
                    {count} idea{count !== 1 ? "s" : ""}
                </p>
            </div>
        </Link>
    );
}