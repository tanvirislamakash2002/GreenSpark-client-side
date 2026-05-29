'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookmarkCheck, Trash2, Eye, ThumbsUp, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from '@/types/bookmark.type';
import { removeBookmark } from '@/actions/bookmark.action';
import { toast } from 'sonner';
import { RemoveBookmarkModal } from './RemoveBookmarkModal';

interface BookmarkCardProps {
    bookmark: Bookmark;
    onRemove: () => void;
}

const statusConfig = {
    DRAFT: { label: 'Draft', className: 'bg-gray-500' },
    PENDING: { label: 'Pending', className: 'bg-amber-500' },
    APPROVED: { label: 'Approved', className: 'bg-green-500' },
    REJECTED: { label: 'Rejected', className: 'bg-red-500' },
};

export function BookmarkCard({ bookmark, onRemove }: BookmarkCardProps) {
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const status = statusConfig[bookmark.ideaStatus];

    const handleRemove = async () => {
        setIsRemoving(true);
        const result = await removeBookmark(bookmark.ideaId);
        if (result.success) {
            toast.success(result.message);
            onRemove();
        } else {
            toast.error(result.message);
        }
        setIsRemoving(false);
        setIsRemoveModalOpen(false);
    };

    const formattedDate = new Date(bookmark.bookmarkedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <>
            <div className="group relative bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Image Section */}
                <Link href={`/ideas/${bookmark.ideaId}`} className="block relative h-48 overflow-hidden bg-muted">
                    {bookmark.ideaImage ? (
                        <Image
                            src={bookmark.ideaImage}
                            alt={bookmark.ideaTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
                            <Sparkles className="w-12 h-12 text-green-500" />
                        </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 dark:bg-gray-900/90 text-foreground hover:bg-white/90">
                            {bookmark.categoryName}
                        </Badge>
                    </div>
                    
                    {/* Status Badge (if not approved) */}
                    {bookmark.ideaStatus !== 'APPROVED' && (
                        <div className="absolute top-3 right-3">
                            <Badge className={status.className}>
                                {status.label}
                            </Badge>
                        </div>
                    )}
                </Link>

                {/* Content Section */}
                <div className="p-4">
                    <Link href={`/ideas/${bookmark.ideaId}`}>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                            {bookmark.ideaTitle}
                        </h3>
                    </Link>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {bookmark.ideaDescription}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                        <span>By {bookmark.authorName}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{bookmark.ideaVoteScore}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{bookmark.ideaViewCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{bookmark.ideaCommentCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/ideas/${bookmark.ideaId}`}>
                                View Idea
                            </Link>
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRemoveModalOpen(true)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            disabled={isRemoving}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                        </Button>
                    </div>
                </div>
            </div>

            <RemoveBookmarkModal
                open={isRemoveModalOpen}
                onOpenChange={setIsRemoveModalOpen}
                onConfirm={handleRemove}
                ideaTitle={bookmark.ideaTitle}
                isLoading={isRemoving}
            />
        </>
    );
}