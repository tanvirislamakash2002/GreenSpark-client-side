import { Eye, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface IdeaStatsProps {
    viewCount: number;
    voteScore: number;
    commentCount: number;
    createdAt: string;
}

export function IdeaStats({ viewCount, voteScore, commentCount, createdAt }: IdeaStatsProps) {
    const stats = [
        {
            icon: Eye,
            label: 'Views',
            value: viewCount,
            color: 'text-blue-500',
        },
        {
            icon: ThumbsUp,
            label: 'Votes',
            value: voteScore,
            color: 'text-green-500',
        },
        {
            icon: MessageCircle,
            label: 'Comments',
            value: commentCount,
            color: 'text-purple-500',
        },
        {
            icon: Calendar,
            label: 'Created',
            value: new Date(createdAt).toLocaleDateString(),
            color: 'text-orange-500',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <p className="text-xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}