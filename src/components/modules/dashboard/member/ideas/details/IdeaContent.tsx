import Image from 'next/image';

interface IdeaContentProps {
    problemStatement: string;
    solution: string;
    description: string;
    imageUrl: string | null;
    isPaid: boolean;
    price: number | null;
}

export function IdeaContent({ problemStatement, solution, description, imageUrl, isPaid, price }: IdeaContentProps) {
    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                    {problemStatement}
                </p>
            </div>

            {/* Proposed Solution */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Proposed Solution</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                    {solution}
                </p>
            </div>

            {/* Detailed Description */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Detailed Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                    {description}
                </p>
            </div>

            {/* Image */}
            {imageUrl && (
                <div>
                    <h2 className="text-xl font-semibold mb-3">Attached Image</h2>
                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border">
                        <Image
                            src={imageUrl}
                            alt="Idea image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            {/* Paid Badge */}
            {isPaid && (
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">
                        <span className="font-semibold">Premium Idea:</span> This idea requires payment to view.
                        {price && <span className="ml-2">Price: ${price.toFixed(2)}</span>}
                    </p>
                </div>
            )}
        </div>
    );
}