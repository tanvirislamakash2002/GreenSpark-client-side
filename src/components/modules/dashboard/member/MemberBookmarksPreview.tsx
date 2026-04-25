import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MemberBookmark } from "@/types/member.type";

interface MemberBookmarksPreviewProps {
    bookmarks: MemberBookmark[];
}

export function MemberBookmarksPreview({ bookmarks }: MemberBookmarksPreviewProps) {
    if (bookmarks.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                        No bookmarked ideas yet.
                    </p>
                    <div className="text-center">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/ideas">
                                Browse Ideas
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Bookmarks</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/member/bookmarks">
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div>
                                <Link href={`/ideas/${bookmark.ideaId}`} className="font-medium hover:text-green-600 transition-colors">
                                    {bookmark.ideaTitle}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                    By {bookmark.authorName} • 👍 {bookmark.voteScore}
                                </p>
                            </div>
                            <Bookmark className="h-4 w-4 text-green-600 fill-green-600" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}