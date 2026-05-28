interface AdminIdeasHeaderProps {
    totalItems: number;
}

export function AdminIdeasHeader({ totalItems }: AdminIdeasHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Manage Ideas</h1>
            <p className="text-muted-foreground">
                Review and moderate all sustainability ideas submitted by members
            </p>
            <p className="text-sm text-muted-foreground mt-1">
                {totalItems} total ideas in the system
            </p>
        </div>
    );
}