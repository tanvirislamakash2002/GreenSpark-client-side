import { Target, Eye, Heart } from 'lucide-react';

export function MissionVision() {
    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Mission Card */}
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Target className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To democratize sustainability by providing a platform where anyone can share, 
                            discover, and vote on eco-friendly ideas that can be implemented locally and globally.
                        </p>
                    </div>
                    
                    {/* Vision Card */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Eye className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            A world where every innovative sustainability idea finds its champion, 
                            and every community has the tools to build a greener tomorrow.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}