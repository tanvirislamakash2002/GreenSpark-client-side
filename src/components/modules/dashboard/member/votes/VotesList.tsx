import { UserVote } from "@/types/vote.type";
import { VoteCard } from "./VoteCard";
import { EmptyState } from "./EmptyState";

interface VotesListProps {
    votes: UserVote[];
    voteType: string;
    onVoteChange: () => void;
}

export function VotesList({ votes, voteType, onVoteChange }: VotesListProps) {
    if (votes.length === 0) {
        return <EmptyState voteType={voteType} />;
    }

    return (
        <div className="space-y-3">
            {votes.map((vote) => (
                <VoteCard key={vote.id} vote={vote} onVoteChange={onVoteChange} />
            ))}
        </div>
    );
}