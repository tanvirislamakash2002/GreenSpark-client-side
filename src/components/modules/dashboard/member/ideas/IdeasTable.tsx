'use client';

import { MemberIdea } from '@/types/member-idea.type';
import { IdeaRow } from './IdeaRow';
import { EmptyState } from './EmptyState';

interface IdeasTableProps {
    ideas: MemberIdea[];
    onUpdate: () => void;
}

export function IdeasTable({ ideas, onUpdate }: IdeasTableProps) {
    if (ideas.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-2">
            {ideas.map((idea) => (
                <IdeaRow key={idea.id} idea={idea} onUpdate={onUpdate} />
            ))}
        </div>
    );
}