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

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "mostVoted", label: "Most Voted" },
];

const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
];

export function CommentsFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";
    const currentSort = searchParams.get("sortBy") || "newest";
    const currentDateRange = searchParams.get("dateRange") || "all";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("page");
        router.push(`/member/comments?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.delete("page");
        router.push(`/member/comments?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push("/member/comments");
    };

    const hasActiveFilters = currentSearch || currentSort !== "newest" || currentDateRange !== "all";

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by idea title or comment..."
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

                <Select value={currentDateRange} onValueChange={(v) => updateFilter("dateRange", v)}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                        {dateRangeOptions.map((option) => (
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