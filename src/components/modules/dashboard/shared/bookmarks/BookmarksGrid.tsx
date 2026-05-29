import { Bookmark } from '@/types/bookmark.type';
import { BookmarkCard } from './BookmarkCard';
import { EmptyBookmarks } from './EmptyBookmarks';

interface BookmarksGridProps {
    bookmarks: Bookmark[];
    onRemove: () => void;
}

export function BookmarksGrid({ bookmarks, onRemove }: BookmarksGridProps) {
    if (bookmarks.length === 0) {
        return <EmptyBookmarks />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}