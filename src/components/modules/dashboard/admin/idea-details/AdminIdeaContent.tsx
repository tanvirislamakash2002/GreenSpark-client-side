import Image from "next/image";

interface AdminIdeaContentProps {
    problemStatement: string;
    solution: string;
    description: string;
    imageUrl: string | null;
}

export function AdminIdeaContent({ problemStatement, solution, description, imageUrl }: AdminIdeaContentProps) {
    return (
        <div className="space-y-8">
            {/* Problem Statement */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {problemStatement}
                    </p>
                </div>
            </div>

            {/* Proposed Solution */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Proposed Solution</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {solution}
                    </p>
                </div>
            </div>

            {/* Detailed Description */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Detailed Description</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Image */}
            {imageUrl && (
                <div>
                    <h2 className="text-xl font-semibold mb-3">Attached Media</h2>
                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border bg-muted">
                        <Image
                            src={imageUrl}
                            alt="Idea image"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 800px"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}