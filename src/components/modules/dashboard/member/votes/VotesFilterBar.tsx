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

const voteTypeOptions = [
    { value: "all", label: "All Votes" },
    { value: "UP", label: "Upvotes" },
    { value: "DOWN", label: "Downvotes" },
];

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "mostVoted", label: "Most Voted Ideas" },
];

interface VotesFilterBarProps {
    categories: { id: string; name: string; slug: string }[];
}

export function VotesFilterBar({ categories }: VotesFilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentVoteType = searchParams.get("voteType") || "all";
    const currentSort = searchParams.get("sortBy") || "newest";
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") || "all";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("page");
        router.push(`/member/votes?${params.toString()}`);
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.delete("page");
        router.push(`/member/votes?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push("/member/votes");
    };

    const hasActiveFilters = currentVoteType !== "all" || currentSort !== "newest" || currentSearch || currentCategory !== "all";

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search ideas..."
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

                <Select value={currentVoteType} onValueChange={(v) => updateFilter("voteType", v)}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Vote Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {voteTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={currentSort} onValueChange={(v) => updateFilter("sortBy", v)}>
                    <SelectTrigger className="w-full sm:w-[150px]">
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

                <Select value={currentCategory} onValueChange={(v) => updateFilter("category", v)}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name}
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