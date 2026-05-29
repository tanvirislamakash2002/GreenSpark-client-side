import { StatusBadge } from '@/components/modules/dashboard/member/ideas/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IdeaDetailsHeaderProps {
    title: string;
    status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    authorName: string;
    authorImage: string | null;
    authorEmail: string;
    createdAt: string;
}

export function IdeaDetailsHeader({ title, status, authorName, authorImage, authorEmail, createdAt }: IdeaDetailsHeaderProps) {
    const initials = authorName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <StatusBadge status={status} />
                <span className="text-sm text-muted-foreground">
                    Created on {new Date(createdAt).toLocaleDateString()}
                </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={authorImage || undefined} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{authorName}</p>
                    <p className="text-sm text-muted-foreground">{authorEmail}</p>
                </div>
            </div>
        </div>
    );
}