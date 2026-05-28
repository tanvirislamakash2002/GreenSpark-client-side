"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { approveIdea, rejectIdea, deleteIdea } from "@/actions/idea/admin-idea.action";
import { ApproveModal } from "../ideas/ApproveModal";
import { RejectModal } from "../ideas/RejectModal";
import { DeleteModal } from "../ideas/DeleteModal";

interface AdminIdeaActionsProps {
    ideaId: string;
    ideaTitle: string;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
}

export function AdminIdeaActions({ ideaId, ideaTitle, status }: AdminIdeaActionsProps) {
    const router = useRouter();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const canApprove = status === "PENDING";
    const canReject = status === "PENDING";
    const canDelete = true; // Admin can delete any idea
    const canEdit = true; // Admin can edit any idea (as override)

    const handleApprove = async () => {
        setIsLoading(true);
        const result = await approveIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
            router.push("/dashboard/admin/ideas");
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsApproveModalOpen(false);
    };

    const handleReject = async (feedback: string) => {
        setIsLoading(true);
        const result = await rejectIdea(ideaId, feedback);
        if (result.success) {
            toast.success(result.message);
            router.push("/dashboard/admin/ideas");
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsRejectModalOpen(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        const result = await deleteIdea(ideaId);
        if (result.success) {
            toast.success(result.message);
            router.push("/dashboard/admin/ideas");
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                {canEdit && (
                    <Button asChild variant="outline">
                        <Link href={`/dashboard/admin/ideas/edit/${ideaId}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Idea
                        </Link>
                    </Button>
                )}

                {canApprove && (
                    <Button
                        onClick={() => setIsApproveModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Idea
                    </Button>
                )}

                {canReject && (
                    <Button
                        onClick={() => setIsRejectModalOpen(true)}
                        variant="destructive"
                    >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Idea
                    </Button>
                )}

                {canDelete && (
                    <Button
                        onClick={() => setIsDeleteModalOpen(true)}
                        variant="destructive"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Idea
                    </Button>
                )}
            </div>

            <ApproveModal
                open={isApproveModalOpen}
                onOpenChange={setIsApproveModalOpen}
                onConfirm={handleApprove}
                ideaTitle={ideaTitle}
                isLoading={isLoading}
            />

            <RejectModal
                open={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                onConfirm={handleReject}
                ideaTitle={ideaTitle}
                isLoading={isLoading}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                ideaTitle={ideaTitle}
                isLoading={isLoading}
            />
        </>
    );
}