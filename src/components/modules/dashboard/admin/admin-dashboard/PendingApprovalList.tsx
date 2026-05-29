import Link from "next/link";
import { Clock, Eye, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PendingIdea } from "@/types/admin.type";
import { approveIdea, rejectIdea } from "@/actions/admin.action";
import { toast } from "sonner";

interface PendingApprovalListProps {
    ideas: PendingIdea[];
}

export function PendingApprovalList({ ideas }: PendingApprovalListProps) {
    const handleApprove = async (ideaId: string) => {
        const result = await approveIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error("Failed to approve idea");
        }
    };

    const handleReject = async (ideaId: string) => {
        const feedback = prompt("Please provide feedback for rejection:");
        if (feedback) {
            const result = await rejectIdea(ideaId, feedback);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error("Failed to reject idea");
            }
        }
    };

    if (ideas.length === 0) {
        return (
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <p className="text-muted-foreground">No ideas pending approval!</p>
                        <p className="text-sm text-muted-foreground">All caught up 🎉</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CardTitle>Pending Review</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {ideas.length}
                    </Badge>
                </div>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/ideas/pending">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {ideas.map((idea) => (
                        <div key={idea.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                        {idea.category.name}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(idea.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <Link href={`/ideas/${idea.id}`} className="font-medium hover:text-green-600 transition-colors">
                                    {idea.title}
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                    <Avatar className="h-5 w-5">
                                        <AvatarImage src={idea.author.image || undefined} />
                                        <AvatarFallback className="text-xs">
                                            {idea.author.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">{idea.author.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 md:mt-0">
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/admin/ideas/${idea.id}`}>
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </Link>
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApprove(idea.id)}
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleReject(idea.id)}
                                >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}