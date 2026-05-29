"use client";

import { useState } from "react";
import { 
    MoreVertical, 
    Ban, 
    CheckCircle, 
    UserCog, 
    Trash2, 
    Eye,
    Shield,
    Mail,
    Check,
    X,
    AlertCircle,
    Users as UsersIcon  
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    banUser, 
    unbanUser, 
    suspendUser, 
    activateUser, 
    changeUserRole, 
    deleteUser 
} from "@/actions/user-management.action";
import { toast } from "sonner";
import { UserDetailsModal } from "./UserDetailsModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { User } from "@/types";

interface UsersTableProps {
    users: User[];
    onUpdate: () => void;
    onBulkSelect?: (selectedIds: string[]) => void;
}

const statusConfig = {
    ACTIVE: { label: "Active", className: "bg-green-100 text-green-700" },
    SUSPENDED: { label: "Suspended", className: "bg-orange-100 text-orange-700" },
    BANNED: { label: "Banned", className: "bg-red-100 text-red-700" },
};

export function UsersTable({ users, onUpdate, onBulkSelect }: UsersTableProps) {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState<{
        open: boolean;
        title: string;
        description: string;
        action: () => void;
        variant?: "default" | "destructive";
    }>({
        open: false,
        title: "",
        description: "",
        action: () => {},
    });

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
            onBulkSelect?.([]);
        } else {
            const allIds = users.map(u => u.id);
            setSelectedUsers(allIds);
            onBulkSelect?.(allIds);
        }
    };

    const handleSelectUser = (userId: string) => {
        const newSelected = selectedUsers.includes(userId)
            ? selectedUsers.filter(id => id !== userId)
            : [...selectedUsers, userId];
        setSelectedUsers(newSelected);
        onBulkSelect?.(newSelected);
    };

    const handleBan = async (user: User) => {
        setDialogConfig({
            open: true,
            title: `Ban User`,
            description: `Are you sure you want to ban "${user.name}"? This user will not be able to access the platform.`,
            variant: "destructive",
            action: async () => {
                const result = await banUser(user.id);
                if (result.success) {
                    toast.success(`User ${user.name} has been banned`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to ban user");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleUnban = async (user: User) => {
        setDialogConfig({
            open: true,
            title: `Unban User`,
            description: `Are you sure you want to unban "${user.name}"? They will regain access to the platform.`,
            action: async () => {
                const result = await unbanUser(user.id);
                if (result.success) {
                    toast.success(`User ${user.name} has been unbanned`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to unban user");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleSuspend = async (user: User) => {
        setDialogConfig({
            open: true,
            title: `Suspend User`,
            description: `Are you sure you want to suspend "${user.name}"? They will be temporarily restricted.`,
            variant: "destructive",
            action: async () => {
                const result = await suspendUser(user.id);
                if (result.success) {
                    toast.success(`User ${user.name} has been suspended`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to suspend user");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleActivate = async (user: User) => {
        setDialogConfig({
            open: true,
            title: `Activate User`,
            description: `Are you sure you want to activate "${user.name}"?`,
            action: async () => {
                const result = await activateUser(user.id);
                if (result.success) {
                    toast.success(`User ${user.name} has been activated`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to activate user");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleChangeRole = async (user: User, newRole: string) => {
        setDialogConfig({
            open: true,
            title: `Change Role`,
            description: `Are you sure you want to change "${user.name}"'s role to ${newRole}?`,
            action: async () => {
                const result = await changeUserRole(user.id, newRole);
                if (result.success) {
                    toast.success(`User role changed to ${newRole}`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to change role");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleDelete = async (user: User) => {
        setDialogConfig({
            open: true,
            title: `Delete User`,
            description: `Are you sure you want to permanently delete "${user.name}"? This action cannot be undone.`,
            variant: "destructive",
            action: async () => {
                const result = await deleteUser(user.id);
                if (result.success) {
                    toast.success(`User ${user.name} has been deleted`);
                    onUpdate();
                } else {
                    toast.error(result.message || "Failed to delete user");
                }
                setDialogConfig(prev => ({ ...prev, open: false }));
            },
        });
    };

    const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setIsDetailsOpen(true);
    };

    if (users.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <UsersIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => {
                            const status = statusConfig[user.accountStatus as keyof typeof statusConfig] || statusConfig.ACTIVE;
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onCheckedChange={() => handleSelectUser(user.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.image || undefined} />
                                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                            </Avatar>
                                            <span>{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={status.className}>
                                            {status.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.emailVerified ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <X className="h-4 w-4 text-red-500" />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleChangeRole(user, user.role === "ADMIN" ? "MEMBER" : "ADMIN")}>
                                                    <UserCog className="h-4 w-4 mr-2" />
                                                    Make {user.role === "ADMIN" ? "Member" : "Admin"}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {user.accountStatus === "ACTIVE" && (
                                                    <>
                                                        <DropdownMenuItem onClick={() => handleSuspend(user)}>
                                                            <AlertCircle className="h-4 w-4 mr-2" />
                                                            Suspend
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleBan(user)}>
                                                            <Ban className="h-4 w-4 mr-2" />
                                                            Ban
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                {user.accountStatus === "SUSPENDED" && (
                                                    <DropdownMenuItem onClick={() => handleActivate(user)}>
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Activate
                                                    </DropdownMenuItem>
                                                )}
                                                {user.accountStatus === "BANNED" && (
                                                    <DropdownMenuItem onClick={() => handleUnban(user)}>
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Unban
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <UserDetailsModal
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                userId={selectedUser?.id}
                onUpdate={onUpdate}
            />

            <ConfirmDialog
                open={dialogConfig.open}
                onOpenChange={(open) => setDialogConfig(prev => ({ ...prev, open }))}
                title={dialogConfig.title}
                description={dialogConfig.description}
                onConfirm={dialogConfig.action}
                variant={dialogConfig.variant}
            />
        </>
    );
}