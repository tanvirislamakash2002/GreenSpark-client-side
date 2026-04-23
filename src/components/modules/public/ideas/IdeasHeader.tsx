interface IdeasHeaderProps {
    totalItems: number;
}

export function IdeasHeader({ totalItems }: IdeasHeaderProps) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                Explore Sustainability Ideas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover innovative eco-friendly solutions shared by our community.
                Vote for the ideas that can make a real impact.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
                {totalItems} idea{totalItems !== 1 ? 's' : ''} shared by our community
            </p>
        </div>
    );
}