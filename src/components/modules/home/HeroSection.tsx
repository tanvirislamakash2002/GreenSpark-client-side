"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function HeroSection() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Check if user is logged in (you can get this from your auth context)
    const { data: session } = authClient.useSession();
    const isAuthenticated = !!session?.user;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setIsSearching(true);
        router.push(`/ideas?search=${encodeURIComponent(searchTerm)}`);
    };

    const handleShareIdea = () => {
        if (isAuthenticated) {
            router.push("/dashboard/member/ideas/create");
        } else {
            router.push("/login?redirect=/dashboard/member/ideas/create");
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
            </div>

            {/* Decorative Leaves */}
            <div className="absolute bottom-0 left-0 text-green-100 dark:text-green-950/20">
                <Leaf className="w-48 h-48 opacity-20" />
            </div>
            <div className="absolute top-0 right-0 text-green-100 dark:text-green-950/20 rotate-45">
                <Leaf className="w-32 h-32 opacity-20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        <span>Join the Sustainability Movement</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 bg-clip-text text-transparent animate-fade-in-up">
                        Ignite Sustainable Ideas
                        <br />
                        for a Greener Future
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                        Share your eco-friendly innovations, discover groundbreaking solutions, 
                        and vote for ideas that will shape tomorrow's sustainable world.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group">
                            <Link href="/ideas">
                                Explore Ideas
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={handleShareIdea}
                            className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                        >
                            Share Your Idea
                            <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                type="text"
                                placeholder="Search for sustainable ideas... (e.g., solar energy, plastic waste)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-24 py-6 text-base rounded-full border-2 focus:border-green-500 focus:ring-green-500"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Button 
                                type="submit" 
                                size="sm"
                                disabled={isSearching}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-600 hover:bg-green-700"
                            >
                                {isSearching ? "Searching..." : "Search"}
                            </Button>
                        </form>
                        
                        {/* Popular Searches */}
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            <span className="text-xs text-muted-foreground">Popular:</span>
                            {["Solar Energy", "Plastic Free", "Composting", "Electric Vehicles"].map((term) => (
                                <button
                                    key={term}
                                    onClick={() => {
                                        setSearchTerm(term);
                                        router.push(`/ideas?search=${encodeURIComponent(term)}`);
                                    }}
                                    className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 flex flex-wrap gap-8 justify-center animate-fade-in-up animation-delay-800">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">10,000+</div>
                            <div className="text-xs text-muted-foreground">Active Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">500+</div>
                            <div className="text-xs text-muted-foreground">Ideas Shared</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">50+</div>
                            <div className="text-xs text-muted-foreground">Countries</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations - Add to your global CSS */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                .animation-delay-800 {
                    animation-delay: 0.8s;
                }
            `}</style>
        </section>
    );
}