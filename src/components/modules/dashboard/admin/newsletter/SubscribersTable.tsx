"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Mail, User, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Subscriber } from "@/types/newsletter.type";
import { deleteSubscriber, exportSubscribers } from "@/actions/newsletter/admin-newsletter.action";
import { toast } from "sonner";

interface SubscribersTableProps {
    subscribers: Subscriber[];
    onUpdate: () => void;
}

export function SubscribersTable({ subscribers, onUpdate }: SubscribersTableProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filteredSubscribers = subscribers.filter(sub => {
        const matchesSearch = sub.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || 
            (statusFilter === "active" && sub.isSubscribed) ||
            (statusFilter === "unsubscribed" && !sub.isSubscribed);
        return matchesSearch && matchesStatus;
    });

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        const result = await deleteSubscriber(deleteId);
        if (result.success) {
            toast.success("Subscriber removed");
            onUpdate();
        } else {
            toast.error(result.message || "Failed to remove subscriber");
        }
        setIsLoading(false);
        setDeleteId(null);
    };

    const handleExport = async () => {
        const result = await exportSubscribers("csv");
        if (result.success && result.data) {
            const blob = new Blob([result.data], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Subscribers exported");
        } else {
            toast.error(result.message || "Failed to export");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}
                </div>
                
                <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Button variant="outline" onClick={handleExport}>
                        Export CSV
                    </Button>
                </div>
            </div>

            {filteredSubscribers.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">No subscribers found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Subscribed</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSubscribers.map((subscriber) => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                                    <TableCell>
                                        {subscriber.user ? (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{subscriber.user.name}</span>
                                            </div>
                                        ) : (
                                            <Badge variant="outline">Guest</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {subscriber.isSubscribed ? (
                                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                                        ) : (
                                            <Badge variant="destructive">Unsubscribed</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(subscriber.subscribedAt), { addSuffix: true })}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeleteId(subscriber.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Remove Subscriber"
                description="Are you sure you want to remove this subscriber? They will no longer receive newsletters."
                confirmText="Remove"
                onConfirm={handleDelete}
                variant="destructive"
                isLoading={isLoading}
            />
        </div>
    );
}