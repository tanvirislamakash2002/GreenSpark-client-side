"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const statusOptions = [
    { value: "all", label: "All Comments" },
    { value: "reported", label: "Reported" },
    { value: "deleted", label: "Deleted" },
];

const reportStatusOptions = [
    { value: "all", label: "All Reports" },
    { value: "PENDING", label: "Pending" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "DISMISSED", label: "Dismissed" },
];

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "mostReported", label: "Most Reported" },
];

export function AdminCommentsFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";
    const currentStatus = searchParams.get("status") || "all";
    const currentReportStatus = searchParams.get("reportStatus") || "all";
    const currentSort = searchParams.get("sortBy") || "newest";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("page");
        router.push(`/admin/comments?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.delete("page");
        router.push(`/admin/comments?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push("/admin/comments");
    };

    const hasActiveFilters = currentSearch || currentStatus !== "all" || currentReportStatus !== "all" || currentSort !== "newest";

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by user, email, or comment content..."
                        value={currentSearch}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        className="pl-9 pr-8"
                    />
                    {currentSearch && (
                        <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>

                <Select value={currentStatus} onValueChange={(v) => updateFilter("status", v)}>
                    <SelectTrigger className="w-full sm:w-[140px]">
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

                <Select value={currentReportStatus} onValueChange={(v) => updateFilter("reportStatus", v)}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Report Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {reportStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={currentSort} onValueChange={(v) => updateFilter("sortBy", v)}>
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

                {hasActiveFilters && (
                    <Button variant="ghost" onClick={resetFilters} className="gap-2">
                        <X className="h-4 w-4" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
}