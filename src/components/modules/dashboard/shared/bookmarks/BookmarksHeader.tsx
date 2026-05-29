interface BookmarksHeaderProps {
    totalItems: number;
}

export function BookmarksHeader({ totalItems }: BookmarksHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">My Bookmarks</h1>
            <p className="text-muted-foreground">
                Ideas you've saved for later
            </p>
            <p className="text-sm text-muted-foreground mt-1">
                {totalItems} bookmarked idea{totalItems !== 1 ? 's' : ''}
            </p>
        </div>
    );
}