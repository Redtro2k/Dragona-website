export const postCategories = {
    announcement: 'Announcement',
    'patch-announcement': 'Patch Announcement',
    notice: 'Notice',
    events: 'Event',
};
export type PostCategory = keyof typeof postCategories;
export type PostCard = {
    id: number;
    title: string;
    slug: string;
    category: PostCategory;
    category_label: string;
    excerpt: string;
    status: 'draft' | 'published';
    published_at: string | null;
    date: string | null;
    cover_url: string;
    url: string;
};
export type PostPagination = {
    data: PostCard[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
};
