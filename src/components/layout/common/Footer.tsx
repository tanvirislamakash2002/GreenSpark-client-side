"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Lightbulb, Users, Leaf, Heart, Globe, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubscribing(true);
        // TODO: Connect to your newsletter API endpoint
        setTimeout(() => {
            toast.success("Successfully subscribed to newsletter!");
            setEmail("");
            setIsSubscribing(false);
        }, 500);
    };

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                            GreenSpark
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Igniting sustainable ideas for a greener future. Join our community to share, discover, and vote on eco-friendly solutions.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>hello@greenspark.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+880 1234 567890</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-green-600 transition">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-green-600 transition">Contact Us</Link></li>
                            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-green-600 transition">Blog</Link></li>
                            <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-green-600 transition">FAQs</Link></li>
                            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-green-600 transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-green-600 transition">Terms of Use</Link></li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link href="/ideas" className="text-sm text-muted-foreground hover:text-green-600 transition">All Ideas</Link></li>
                            <li><Link href="/ideas?category=energy" className="text-sm text-muted-foreground hover:text-green-600 transition">Energy Solutions</Link></li>
                            <li><Link href="/ideas?category=waste" className="text-sm text-muted-foreground hover:text-green-600 transition">Waste Reduction</Link></li>
                            <li><Link href="/ideas?category=transportation" className="text-sm text-muted-foreground hover:text-green-600 transition">Transportation</Link></li>
                            <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-green-600 transition">Premium Ideas</Link></li>
                            <li><Link href="/top-voted" className="text-sm text-muted-foreground hover:text-green-600 transition">Top Voted Ideas</Link></li>
                        </ul>
                    </div>

                    {/* Why GreenSpark */}
                    <div>
                        <h3 className="font-semibold mb-4">Why GreenSpark?</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Share Your Eco Ideas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Join 10,000+ Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Leaf className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Make Real Impact</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Vote & Support Best Ideas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Global Community</span>
                            </div>
                        </div>
                        
                        {/* Social Links */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                <Link href="#" className="text-muted-foreground hover:text-green-600 transition">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-green-600 transition">
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-green-600 transition">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-green-600 transition">
                                    <Youtube className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section - Full Width */}
                <div className="border-t my-8 pt-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex justify-center mb-3">
                            <Sparkles className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Stay Updated with GreenSpark</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to our newsletter and get the latest sustainable ideas delivered to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {isSubscribing ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                        <p className="text-xs text-muted-foreground mt-3">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="border-t pt-6 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} GreenSpark. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <Link href="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-green-600 transition">Terms & Conditions</Link>
                        <Link href="/cookies" className="hover:text-green-600 transition">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}