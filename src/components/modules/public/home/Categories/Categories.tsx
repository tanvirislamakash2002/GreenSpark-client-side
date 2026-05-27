import { 
    Zap, 
    Recycle, 
    Car, 
    Apple, 
    Droplet, 
    Leaf,
    Building,
    Shirt,
    Microscope,
    Users,
    FileText,
    Waves
} from "lucide-react";
import { CategoriesCard } from "./CategoriesCard";
import { getCategoryCounts } from "@/actions/category.action";

const categoryConfig = [
    { name: "Energy", slug: "energy", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-950/30" },
    { name: "Waste Reduction", slug: "waste-reduction", icon: Recycle, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-950/30" },
    { name: "Transportation", slug: "transportation", icon: Car, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-950/30" },
    { name: "Food & Agriculture", slug: "food-agriculture", icon: Apple, color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-950/30" },
    { name: "Water Conservation", slug: "water-conservation", icon: Droplet, color: "text-cyan-500", bgColor: "bg-cyan-100 dark:bg-cyan-950/30" },
    { name: "Biodiversity", slug: "biodiversity", icon: Leaf, color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-950/30" },
    { name: "Green Building", slug: "green-building", icon: Building, color: "text-orange-500", bgColor: "bg-orange-100 dark:bg-orange-950/30" },
    { name: "Sustainable Fashion", slug: "sustainable-fashion", icon: Shirt, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-950/30" },
    { name: "Clean Technology", slug: "clean-technology", icon: Microscope, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-950/30" },
    { name: "Community Action", slug: "community-action", icon: Users, color: "text-indigo-500", bgColor: "bg-indigo-100 dark:bg-indigo-950/30" },
    { name: "Policy & Advocacy", slug: "policy-advocacy", icon: FileText, color: "text-slate-500", bgColor: "bg-slate-100 dark:bg-slate-950/30" },
    { name: "Ocean Conservation", slug: "ocean-conservation", icon: Waves, color: "text-teal-500", bgColor: "bg-teal-100 dark:bg-teal-950/30" },
];

interface CategoriesProps {
    limit?: number;
}

export async function Categories({ limit = 6 }: CategoriesProps) {
    const result = await getCategoryCounts();

    if (!result.success || !result.data) {
        return null;
    }

    // Create a map of category counts
    const countsMap = new Map<string, number>();
    result.data.forEach((cat: { slug: string; count: number }) => {
        countsMap.set(cat.slug, cat.count);
    });

    // Filter and limit categories
    const displayCategories = categoryConfig.slice(0, limit);

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
                    {displayCategories.map((category) => (
                        <CategoriesCard
                            key={category.slug}
                            name={category.name}
                            slug={category.slug}
                            icon={category.icon}
                            count={countsMap.get(category.slug) || 0}
                            color={category.color}
                            bgColor={category.bgColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}