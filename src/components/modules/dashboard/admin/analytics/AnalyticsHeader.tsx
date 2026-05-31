"use client";

import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { exportAnalytics } from "@/actions/analytics.action";
import { toast } from "sonner";

interface AnalyticsHeaderProps {
    onRangeChange: (range: string) => void;
    currentRange: string;
}

const rangeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "This Year" },
    { value: "all", label: "All Time" },
];

export function AnalyticsHeader({ onRangeChange, currentRange }: AnalyticsHeaderProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format: string) => {
        setIsExporting(true);
        try {
            console.log("Starting export...");
            const result = await exportAnalytics(format, currentRange);
            console.log("Export result:", result);

            if (result.success && result.data) {
                // Create a blob and download the file
                const blob = new Blob([result.data], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `analytics_${new Date().toISOString().split("T")[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                toast.success("Data exported successfully");
            } else {
                console.error("Export failed:", result.message);
                toast.error(result.message || "Failed to export data");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export data");
        }
        setIsExporting(false);
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">
                        Track platform growth, engagement, and revenue metrics
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Select value={currentRange} onValueChange={onRangeChange}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                {rangeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" onClick={() => handleExport("csv")} disabled={isExporting}>
                        <Download className="h-4 w-4 mr-2" />
                        {isExporting ? "Exporting..." : "Export CSV"}
                    </Button>
                </div>
            </div>
        </div>
    );
}