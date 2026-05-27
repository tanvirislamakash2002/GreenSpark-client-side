import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface IdeaDetailsHeaderProps {
    title: string;
    status: string;
    isPaid: boolean;
    authorName: string;
    authorImage: string | null;
    authorEmail: string;
    createdAt: string;
    categories: { id: string; name: string; slug: string }[];
}

export function IdeaDetailsHeader({
    title,
    status,
    isPaid,
    authorName,
    authorImage,
    authorEmail,
    createdAt,
    categories,
}: IdeaDetailsHeaderProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const statusColors = {
        DRAFT: "bg-gray-500",
        PENDING: "bg-amber-500",
        APPROVED: "bg-green-500",
        REJECTED: "bg-red-500",
    };

    return (
        <div className="mb-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <Badge key={category.id} variant="secondary">
                        {category.name}
                    </Badge>
                ))}
                <Badge className={statusColors[status as keyof typeof statusColors]}>
                    {status}
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
                        {getInitials(authorName)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span className="text-sm">{authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">
                            Published on {formatDate(createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}