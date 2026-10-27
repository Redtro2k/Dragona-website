import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { PostCard, PostPagination } from '@/types/posts';

export function PostCards({ posts }: { posts: PostCard[] }) {
    return (
        <div className="divide-y divide-cyan-100/10">
            {posts.map((post) => (
                <article key={post.id} className="p-6">
                    <Link
                        href={post.url}
                        className="group grid gap-5 sm:grid-cols-[140px_1fr]"
                    >
                        <img
                            src={post.cover_url}
                            alt=""
                            loading="lazy"
                            className="aspect-video w-full rounded-sm object-cover sm:aspect-square"
                        />
                        <div className="min-w-0">
                            <p className="font-[Arial,sans-serif] text-xs text-cyan-200">
                                {post.category_label}{' '}
                                <span className="text-slate-400">
                                    {' '}
                                    · {post.date}
                                </span>
                            </p>
                            <h3 className="mt-3 text-lg leading-7 font-bold break-words text-white group-hover:text-cyan-200">
                                {post.title}
                            </h3>
                            <p className="mt-3 line-clamp-3 font-[Arial,sans-serif] text-sm leading-6 break-words text-slate-300">
                                {post.excerpt}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-200">
                                Read post <ArrowRight className="size-4" />
                            </span>
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
}

export function PostPager({ posts }: { posts: PostPagination }) {
    if (posts.last_page <= 1) return null;
    return (
        <nav
            aria-label="Post pagination"
            className="flex items-center justify-between gap-4 border-t border-white/10 p-5 font-[Arial,sans-serif] text-sm"
        >
            {posts.prev_page_url ? (
                <Link href={posts.prev_page_url} className="text-cyan-200">
                    Previous
                </Link>
            ) : (
                <span />
            )}
            <span className="text-slate-400">
                Page {posts.current_page} of {posts.last_page}
            </span>
            {posts.next_page_url ? (
                <Link href={posts.next_page_url} className="text-cyan-200">
                    Next
                </Link>
            ) : (
                <span />
            )}
        </nav>
    );
}
