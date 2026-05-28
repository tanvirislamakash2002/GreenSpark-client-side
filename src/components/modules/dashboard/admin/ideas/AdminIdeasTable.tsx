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
            {/* Table Header - Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-4 bg-muted/50 p-4 text-sm font-medium rounded-lg">
                <div className="col-span-5">Idea</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Stats</div>
                <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {/* Rows */}
            <div className="space-y-2">
                {ideas.map((idea) => (
                    <AdminIdeasRow key={idea.id} idea={idea} onUpdate={onUpdate} />
                ))}
            </div>
        </div>
    );
}