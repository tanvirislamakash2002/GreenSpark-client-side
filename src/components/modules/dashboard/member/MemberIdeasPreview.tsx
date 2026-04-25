import Link from "next/link";
import { PlusCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MemberIdea } from "@/types/member.type";

const statusConfig = {
    DRAFT: { label: "Draft", color: "bg-gray-500" },
    PENDING: { label: "Pending", color: "bg-amber-500" },
    APPROVED: { label: "Approved", color: "bg-green-500" },
    REJECTED: { label: "Rejected", color: "bg-red-500" },
};

interface MemberIdeasPreviewProps {
    ideas: MemberIdea[];
}

export function MemberIdeasPreview({ ideas }: MemberIdeasPreviewProps) {
    if (ideas.length === 0) {
        return (
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>My Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You haven't shared any ideas yet.</p>
                        <Button asChild>
                            <Link href="/dashboard/member/ideas/create">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Create Your First Idea
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Ideas</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/member/ideas">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {ideas.map((idea) => {
                        const status = statusConfig[idea.status];
                        return (
                            <div key={idea.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className={status.color}>
                                            {status.label}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(idea.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Link href={`/ideas/${idea.id}`} className="font-medium hover:text-green-600 transition-colors">
                                        {idea.title}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4 mt-3 sm:mt-0 text-sm text-muted-foreground">
                                    <span>👍 {idea.voteScore}</span>
                                    <span>👁️ {idea.viewCount}</span>
                                    <span>💬 {idea.commentCount}</span>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/dashboard/member/ideas/edit/${idea.id}`}>
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 text-center">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/member/ideas/create">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create New Idea
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}