'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, CheckCircle, XCircle, Trash2, ExternalLink, EyeIcon, ThumbsUp, MessageSquareIcon, MessageSquareMoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminIdea } from '@/types/idea/admin-idea.type';
import { ApproveModal } from './ApproveModal';
import { RejectModal } from './RejectModal';
import { DeleteModal } from './DeleteModal';
import { approveIdea, rejectIdea, deleteIdea } from '@/actions/idea/admin-idea.action';
import { toast } from 'sonner';

interface AdminIdeasRowProps {
    idea: AdminIdea;
    onUpdate: () => void;
}

const statusConfig = {
    DRAFT: { label: 'Draft', className: 'bg-gray-500' },
    PENDING: { label: 'Pending', className: 'bg-amber-500' },
    APPROVED: { label: 'Approved', className: 'bg-green-500' },
    REJECTED: { label: 'Rejected', className: 'bg-red-500' },
};

export function AdminIdeasRow({ idea, onUpdate }: AdminIdeasRowProps) {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const status = statusConfig[idea.status];
    const initials = idea.author.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleApprove = async () => {
        setIsLoading(true);
        const result = await approveIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsApproveModalOpen(false);
    };

    const handleReject = async (feedback: string) => {
        setIsLoading(true);
        const result = await rejectIdea(idea.id, feedback);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsRejectModalOpen(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        const result = await deleteIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onUpdate();
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge className={status.className}>
                            {status.label}
                        </Badge>
                        {idea.isPaid && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                Premium
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                            {new Date(idea.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <Link href={`/ideas/${idea.id}`} className="font-medium hover:text-green-600 transition-colors">
                        {idea.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={idea.author.image || undefined} />
                                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                            </Avatar>
                            <span>{idea.author.name}</span>
                        </div>
                        <span>{idea.categories[0]?.name || 'Uncategorized'}</span>
                        <span className='flex items-center justify-center gap-2'><ThumbsUp size={15}/> {idea.voteScore}</span>
                        <span className='flex items-center justify-center gap-2'><EyeIcon size={15}/> {idea.viewCount}</span>
                        <span className='flex items-center justify-center gap-2'><MessageSquareMoreIcon size={15}/> {idea.commentCount}</span>
                    </div>
                </div>
                
                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 mt-3 lg:mt-0">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/ideas/${idea.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/dashboard/admin/ideas/${idea.id}`}>
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                    
                    {idea.status === 'PENDING' && (
                        <>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setIsApproveModalOpen(true)}
                                className="text-green-600"
                            >
                                <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setIsRejectModalOpen(true)}
                                className="text-red-600"
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    
                    {(idea.status === 'APPROVED' || idea.status === 'REJECTED') && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
            
            <ApproveModal
                open={isApproveModalOpen}
                onOpenChange={setIsApproveModalOpen}
                onConfirm={handleApprove}
                ideaTitle={idea.title}
                isLoading={isLoading}
            />
            
            <RejectModal
                open={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                onConfirm={handleReject}
                ideaTitle={idea.title}
                isLoading={isLoading}
            />
            
            <DeleteModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                ideaTitle={idea.title}
                isLoading={isLoading}
            />
        </>
    );
}