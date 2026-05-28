import { Calendar, User, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminIdeaDetailsHeaderProps {
    title: string;
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    isPaid: boolean;
    authorName: string;
    authorImage: string | null;
    authorEmail: string;
    createdAt: string;
    categories: { id: string; name: string; slug: string }[];
}

const statusConfig = {
    DRAFT: { label: "Draft", className: "bg-gray-500" },
    PENDING: { label: "Pending", className: "bg-amber-500" },
    APPROVED: { label: "Approved", className: "bg-green-500" },
    REJECTED: { label: "Rejected", className: "bg-red-500" },
};

export function AdminIdeaDetailsHeader({
    title,
    status,
    isPaid,
    authorName,
    authorImage,
    authorEmail,
    createdAt,
    categories,
}: AdminIdeaDetailsHeaderProps) {
    const statusInfo = statusConfig[status];
    const initials = authorName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="mb-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <Badge key={category.id} variant="secondary">
                        {category.name}
                    </Badge>
                ))}
                <Badge className={statusInfo.className}>
                    {statusInfo.label}
                </Badge>
                {isPaid && (
                    <Badge variant="default" className="bg-amber-500">
                        Premium
                    </Badge>
                )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 text-muted-foreground">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={authorImage || undefined} />
                    <AvatarFallback className="bg-green-100 text-green-700">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span className="text-sm font-medium">{authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs">{authorEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">
                            Submitted on {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}