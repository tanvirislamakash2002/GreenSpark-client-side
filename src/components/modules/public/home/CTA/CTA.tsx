import Link from "next/link";
import { Sparkles, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            {/* Decorative Leaves */}
            <div className="absolute bottom-0 left-0 text-white/10">
                <Leaf className="w-48 h-48 rotate-12" />
            </div>
            <div className="absolute top-0 right-0 text-white/10 rotate-45">
                <Leaf className="w-32 h-32" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Join the Movement</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Ready to Make a Difference?
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                        Join our community of changemakers and share your sustainable ideas today.
                        Together, we can build a greener future.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 hover:text-green-100 group">
                            <Link href="/register">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white bg-green-700 text-white hover:bg-white/10">
                            <Link href="/ideas">
                                Explore Ideas
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-green-100 text-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Free to join • No credit card required</span>
                    </div>
                </div>
            </div>
        </section>
    );
}