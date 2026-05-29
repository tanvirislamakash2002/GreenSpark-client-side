"use client";

import { useState } from "react";
import { Users, Ban, UserCheck, Trash2, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bulkAction } from "@/actions/user-management.action";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "sonner";

interface BulkActionsBarProps {
    selectedIds: string[];
    onClearSelection: () => void;
    onUpdate: () => void;
}

export function BulkActionsBar({ selectedIds, onClearSelection, onUpdate }: BulkActionsBarProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogConfig, setDialogConfig] = useState<{
        open: boolean;
        title: string;
        description: string;
        action: () => void;
    }>({
        open: false,
        title: "",
        description: "",
        action: () => {},
    });

    const handleBulkAction = async (action: string) => {
        setDialogConfig({
            open: true,
            title: `Bulk ${action}`,
            description: `Are you sure you want to ${action.toLowerCase()} ${selectedIds.length} selected user${selectedIds.length !== 1 ? "s" : ""}?`,
            action: async () => {
                setIsLoading(true);
                const result = await bulkAction(action, selectedIds);
                if (result.success) {
                    toast.success(result.message || `${selectedIds.length} user${selectedIds.length !== 1 ? "s" : ""} ${action.toLowerCase()}d`);
                    onClearSelection();
                    onUpdate();
                } else {
                    toast.error(result.message || `Failed to ${action.toLowerCase()} users`);
                }
                setIsLoading(false);
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    if (selectedIds.length === 0) return null;

    return (
        <>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-background border rounded-lg shadow-lg p-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <Badge variant="secondary">{selectedIds.length}</Badge>
                        <span className="text-sm">selected</span>
                    </div>
                    
                    <div className="h-6 w-px bg-border" />
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Bulk Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleBulkAction("activate")}>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkAction("suspend")}>
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkAction("delete")} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button variant="ghost" size="sm" onClick={onClearSelection} disabled={isLoading}>
                        Clear
                    </Button>
                </div>
            </div>

            <ConfirmDialog
                open={dialogConfig.open}
                onOpenChange={(open) => setDialogConfig(prev => ({ ...prev, open }))}
                title={dialogConfig.title}
                description={dialogConfig.description}
                onConfirm={dialogConfig.action}
            />
        </>
    );
}