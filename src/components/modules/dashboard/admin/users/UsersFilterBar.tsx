"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "MEMBER", label: "Members" },
    { value: "ADMIN", label: "Admins" },
];

const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "ACTIVE", label: "Active" },
    { value: "SUSPENDED", label: "Suspended" },
    { value: "BANNED", label: "Banned" },
];

const verifiedOptions = [
    { value: "all", label: "All" },
    { value: "verified", label: "Verified" },
    { value: "unverified", label: "Unverified" },
];

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name_asc", label: "Name (A-Z)" },
    { value: "name_desc", label: "Name (Z-A)" },
    { value: "most_ideas", label: "Most Ideas" },
    { value: "most_comments", label: "Most Comments" },
];

interface UsersFilterBarProps {
    onExport?: () => void;
    isExporting?: boolean;
}

export function UsersFilterBar({ onExport, isExporting }: UsersFilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const currentSearch = searchParams.get("search") || "";
    const currentRole = searchParams.get("role") || "all";
    const currentStatus = searchParams.get("status") || "all";
    const currentVerified = searchParams.get("verified") || "all";
    const currentSort = searchParams.get("sort") || "newest";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("page");
        router.push(`/admin/users?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.delete("page");
        router.push(`/admin/users?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push("/admin/users");
    };

    const hasActiveFilters = currentSearch || currentRole !== "all" || currentStatus !== "all" || currentVerified !== "all" || currentSort !== "newest";

    const activeFiltersCount = [
        currentSearch && "search",
        currentRole !== "all" && "role",
        currentStatus !== "all" && "status",
        currentVerified !== "all" && "verified",
        currentSort !== "newest" && "sort",
    ].filter(Boolean).length;

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or ID..."
                        value={currentSearch}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        className="pl-9 pr-8"
                    />
                    {currentSearch && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
                
                <Select value={currentRole} onValueChange={(v) => updateFilter("role", v)}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select value={currentStatus} onValueChange={(v) => updateFilter("status", v)}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select value={currentVerified} onValueChange={(v) => updateFilter("verified", v)}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Verified" />
                    </SelectTrigger>
                    <SelectContent>
                        {verifiedOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select value={currentSort} onValueChange={(v) => updateFilter("sort", v)}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onExport?.()} disabled={isExporting}>
                            Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onExport?.()} disabled={isExporting}>
                            Export as Excel
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                
                {hasActiveFilters && (
                    <Button variant="ghost" onClick={resetFilters} className="gap-2">
                        <X className="h-4 w-4" />
                        Reset
                        {activeFiltersCount > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}