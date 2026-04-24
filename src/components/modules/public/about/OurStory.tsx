import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export function OurStory() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image/Illustration placeholder */}
                        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                            <Sparkles className="w-20 h-20 text-green-600 dark:text-green-400 opacity-50" />
                        </div>
                        
                        {/* Story Content */}
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                GreenSpark was born from a simple observation: brilliant sustainability ideas 
                                often stay confined to small communities or never see the light of day.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                In 2024, a group of environmental enthusiasts, technologists, and dreamers came 
                                together to build a platform that would change this. We believed that the best 
                                solutions for our planet's challenges already exist in someone's mind — they just 
                                need a spark to ignite.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Today, GreenSpark connects thousands of changemakers worldwide, transforming 
                                individual ideas into collective impact. From solar innovations to waste reduction 
                                strategies, we're building the world's largest library of actionable sustainability 
                                solutions.
                            </p>
                            <div className="pt-4">
                                <div className="flex items-center gap-2 text-green-600">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-medium">Founded with purpose, growing with passion.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}