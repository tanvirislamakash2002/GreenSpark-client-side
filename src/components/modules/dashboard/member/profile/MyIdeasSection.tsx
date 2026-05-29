"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, Send, ThumbsUp, EyeIcon, MessageSquareMoreIcon, ExternalLink, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberIdea } from "@/types/idea/member-idea.type";
import { deleteIdea, submitIdea } from "@/actions/idea/member-idea.action";
import { DeleteModal } from "./DeleteModal";
import { SubmitModal } from "./SubmitModal";
import { toast } from "sonner";

interface MyIdeasSectionProps {
    draftIdeas: MemberIdea[];
    pendingIdeas: MemberIdea[];
    approvedIdeas: MemberIdea[];
    rejectedIdeas: MemberIdea[];
    onUpdate: () => void;
}

const statusConfig = {
    DRAFT: { label: "Draft", className: "bg-gray-500", bgLight: "bg-gray-100 text-gray-700" },
    PENDING: { label: "Pending", className: "bg-amber-500", bgLight: "bg-amber-100 text-amber-700" },
    APPROVED: { label: "Approved", className: "bg-green-500", bgLight: "bg-green-100 text-green-700" },
    REJECTED: { label: "Rejected", className: "bg-red-500", bgLight: "bg-red-100 text-red-700" },
};

function IdeaCard({
    idea,
    onDelete,
    onSubmit,
    onUpdate
}: {
    idea: MemberIdea;
    onDelete: (id: string) => void;
    onSubmit: (id: string) => void;
    onUpdate: () => void;
}) {
    const status = statusConfig[idea.status as keyof typeof statusConfig] || statusConfig.DRAFT;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        const result = await deleteIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onDelete(idea.id);
        } else {
            toast.error(result.message || "Failed to delete idea");
        }
        setIsLoading(false);
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const result = await submitIdea(idea.id);
        if (result.success) {
            toast.success(result.message);
            onSubmit(idea.id);
        } else {
            toast.error(result.message || "Failed to submit idea");
        }
        setIsLoading(false);
        setIsSubmitModalOpen(false);
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };
    console.log(idea);
    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors gap-3">
                {/* Left Section - Idea Info */}
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

                    <Link
                        href={`/ideas/${idea.id}`}
                        className="font-medium hover:text-green-600 transition-colors line-clamp-1"
                    >
                        {idea.title}
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {idea.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                            {/* Idea Image Thumbnail */}
                            {idea.imageUrl && (
                                <div className="flex items-center gap-1">
                                    <div className="h-5 w-5 rounded overflow-hidden bg-muted">
                                        <img
                                            src={idea.imageUrl}
                                            alt={idea.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        <span>{idea.category?.name || "Uncategorized"}</span>
                        <span className="flex items-center gap-1">
                            <ThumbsUp size={12} /> {idea.voteScore || 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <EyeIcon size={12} /> {idea.viewCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquareMoreIcon size={12} /> {idea.commentCount || 0}
                        </span>
                    </div>

                    {idea.feedback && idea.status === "REJECTED" && (
                        <div className="mt-3 p-2 bg-red-50 dark:bg-red-950/20 rounded-md text-xs">
                            <span className="font-semibold text-red-600">Feedback:</span>
                            <span className="text-red-700 dark:text-red-400 ml-1">{idea.feedback}</span>
                        </div>
                    )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2">
                    {/* View Button - Always visible */}
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/ideas/${idea.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                        </Link>
                    </Button>

                    {/* External Link Button */}
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/ideas/${idea.id}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>

                    {/* Edit Button - Only for DRAFT and REJECTED */}
                    {(idea.status === "DRAFT" || idea.status === "REJECTED") && (
                        <Button asChild variant="ghost" size="sm">
                            <Link href={`/member/ideas/edit/${idea.id}`}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    {/* Delete Button - Only for DRAFT and REJECTED */}
                    {(idea.status === "DRAFT" || idea.status === "REJECTED") && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Submit Button - Only for DRAFT */}
                    {idea.status === "DRAFT" && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => setIsSubmitModalOpen(true)}
                            className="bg-amber-600 hover:bg-amber-700"
                        >
                            <Send className="h-4 w-4 mr-1" />
                            Submit
                        </Button>
                    )}
                </div>
            </div>

            <DeleteModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                ideaTitle={idea.title}
                isLoading={isLoading}
            />

            <SubmitModal
                open={isSubmitModalOpen}
                onOpenChange={setIsSubmitModalOpen}
                onConfirm={handleSubmit}
                ideaTitle={idea.title}
                isLoading={isLoading}
            />
        </>
    );
}

function EmptyState({ status, onClearFilters }: { status: string; onClearFilters?: () => void }) {
    const messages: Record<string, { title: string; description: string }> = {
        draft: {
            title: "No draft ideas",
            description: "You don't have any draft ideas. Start creating a new idea!",
        },
        pending: {
            title: "No pending ideas",
            description: "You don't have any ideas waiting for review. Submit a draft to get started.",
        },
        approved: {
            title: "No approved ideas yet",
            description: "Your ideas haven't been approved yet. Keep creating and submitting!",
        },
        rejected: {
            title: "No rejected ideas",
            description: "Great news! None of your ideas have been rejected.",
        },
    };

    const message = messages[status] || messages.draft;

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{message.title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">{message.description}</p>
            {status === "draft" && (
                <Button asChild>
                    <Link href="/member/ideas/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Idea
                    </Link>
                </Button>
            )}
        </div>
    );
}

export function MyIdeasSection({
    draftIdeas,
    pendingIdeas,
    approvedIdeas,
    rejectedIdeas,
    onUpdate
}: MyIdeasSectionProps) {
    const [activeTab, setActiveTab] = useState("draft");

    const handleDelete = (ideaId: string) => {
        onUpdate();
    };

    const handleSubmit = (ideaId: string) => {
        onUpdate();
    };

    const tabs = [
        { value: "draft", label: "Drafts", count: draftIdeas.length, ideas: draftIdeas },
        { value: "pending", label: "Pending", count: pendingIdeas.length, ideas: pendingIdeas },
        { value: "approved", label: "Approved", count: approvedIdeas.length, ideas: approvedIdeas },
        { value: "rejected", label: "Rejected", count: rejectedIdeas.length, ideas: rejectedIdeas },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
                <CardTitle>My Ideas</CardTitle>
                <Button asChild size="sm">
                    <Link href="/member/ideas/create">
                        <Plus className="h-4 w-4 mr-2" />
                        New Idea
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col">
                    <TabsList className="flex-wrap h-auto mb-4">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label} ({tab.count})
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.ideas.length === 0 ? (
                                <EmptyState status={tab.value} />
                            ) : (
                                <div className="space-y-3">
                                    {tab.ideas.map((idea) => (
                                        <IdeaCard
                                            key={idea.id}
                                            idea={idea}
                                            onDelete={handleDelete}
                                            onSubmit={handleSubmit}
                                            onUpdate={onUpdate}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}