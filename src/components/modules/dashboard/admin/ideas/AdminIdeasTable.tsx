'use client';

import { AdminIdea } from '@/types/idea/admin-idea.type';
import { AdminIdeasRow } from './AdminIdeasRow';
import { EmptyState } from './EmptyState';

interface AdminIdeasTableProps {
    ideas: AdminIdea[];
    onUpdate: () => void;
}

export function AdminIdeasTable({ ideas, onUpdate }: AdminIdeasTableProps) {
    if (ideas.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-2">
            {/* Rows */}
            <div className="space-y-2">
                {ideas.map((idea) => (
                    <AdminIdeasRow key={idea.id} idea={idea} onUpdate={onUpdate} />
                ))}
            </div>
        </div>
    );
}