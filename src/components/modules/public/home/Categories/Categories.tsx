import Image from "next/image";
import { CategoriesCard } from "./CategoriesCard";
import { getAllCategories } from "@/actions/category.action";
import { Category } from "@/types/category.type";

interface CategoriesProps {
    limit?: number;
}

export async function Categories({ limit = 6 }: CategoriesProps) {
    const result = await getAllCategories();

    if (!result.success || !result.data || result.data.length === 0) {
        return null;
    }

    // Filter and limit categories
    const displayCategories = result.data.slice(0, limit);

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Browse by Category
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore sustainability ideas in your area of interest
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {displayCategories.map((category: Category) => (
                        <CategoriesCard
                            key={category.id}
                            name={category.name}
                            slug={category.slug}
                            imageUrl={category.imageUrl}
                            count={category.ideasCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}