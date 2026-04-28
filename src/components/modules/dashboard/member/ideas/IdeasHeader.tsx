import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IdeasHeaderProps {
    stats: {
        total: number;
        draft: number;
        pending: number;
        approved: number;
        rejected: number;
    };
}

export function IdeasHeader({ stats }: IdeasHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">My Ideas</h1>
                <p className="text-muted-foreground">
                    You have {stats.total} idea{stats.total !== 1 ? 's' : ''} in total
                </p>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/member/ideas/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Idea
                </Link>
            </Button>
        </div>
    );
}