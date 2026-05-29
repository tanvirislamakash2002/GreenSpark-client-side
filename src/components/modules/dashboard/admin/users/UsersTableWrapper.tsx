"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsersTable } from "./UsersTable";
import { BulkActionsBar } from "./BulkActionsBar";
import { User } from "@/types/user.type";

interface UsersTableWrapperProps {
    initialUsers: User[];
}

export function UsersTableWrapper({ initialUsers }: UsersTableWrapperProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const router = useRouter();

    const handleUpdate = () => {
        router.refresh();
        setSelectedIds([]);
    };

    return (
        <>
            <UsersTable 
                users={initialUsers} 
                onUpdate={handleUpdate}
                onBulkSelect={setSelectedIds}
            />
            <BulkActionsBar 
                selectedIds={selectedIds}
                onClearSelection={() => setSelectedIds([])}
                onUpdate={handleUpdate}
            />
        </>
    );
}