import Link from "next/link";
import Image from "next/image";
import { FolderOpen } from "lucide-react";

interface CategoriesCardProps {
    name: string;
    slug: string;
    imageUrl: string | null;
    count: number;
}

export function CategoriesCard({ name, slug, imageUrl, count }: CategoriesCardProps) {
    return (
        <Link
            href={`/ideas?category=${slug}`}
            className="group block overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image Section */}
            <div className="relative h-32 w-full overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 200px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FolderOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{name}</h3>
                <p className="text-sm text-muted-foreground">
                    {count} idea{count !== 1 ? "s" : ""}
                </p>
            </div>
        </Link>
    );
}