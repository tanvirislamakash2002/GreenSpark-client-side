interface MyVotesHeaderProps {
    totalVotes: number;
    upvotes: number;
    downvotes: number;
}

export function MyVotesHeader({ totalVotes, upvotes, downvotes }: MyVotesHeaderProps) {
    const upvotePercentage = totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 0;
    const downvotePercentage = totalVotes > 0 ? Math.round((downvotes / totalVotes) * 100) : 0;

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Votes</h1>
            <p className="text-muted-foreground mb-6">
                Track and manage all the ideas you've voted on
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Votes</p>
                    <p className="text-2xl font-bold">{totalVotes}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-600 dark:text-green-400">Upvotes</p>
                    <p className="text-2xl font-bold text-green-600">{upvotes}</p>
                    <p className="text-xs text-muted-foreground">{upvotePercentage}% of votes</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-red-600 dark:text-red-400">Downvotes</p>
                    <p className="text-2xl font-bold text-red-600">{downvotes}</p>
                    <p className="text-xs text-muted-foreground">{downvotePercentage}% of votes</p>
                </div>
            </div>
        </div>
    );
}