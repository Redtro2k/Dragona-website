import { SelectInput, TextInput } from '@/components/dragona/form-controls';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Feather,
    Plus,
    Radio,
    Search,
    ScrollText,
    Shield,
    Swords,
} from 'lucide-react';
import { PostPager } from '@/components/dragona/post-list';
import { postCategories } from '@/types/posts';
import type { PostPagination } from '@/types/posts';
export default function PostIndex({
    posts,
    counts,
    filters,
    status,
}: {
    posts: PostPagination;
    counts: { total: number; published: number; draft: number };
    filters: { search?: string; category?: string; status?: string };
    status?: string;
}) {
    const filtered = !!(filters.search || filters.category || filters.status);
    return (
        <>
            <Head title="Command Sanctum" />
            <div className="command-content">
                <section className="command-hero">
                    <img
                        aria-hidden="true"
                        alt=""
                        className="command-hero-art"
                        src="/storage/Assets/Freatures/slide2.webp"
                    />
                    <div className="command-hero-copy">
                        <p className="command-eyebrow">
                            <span /> THE REALM IS IN YOUR HANDS
                        </p>
                        <h1>
                            Command
                            <br />
                            <em>the narrative.</em>
                        </h1>
                        <p className="command-hero-description">
                            Every update begins here. Shape the next chapter of
                            Dragona Dominion and rally your players.
                        </p>
                        <Link
                            className="command-button"
                            href="/admin/posts/create"
                        >
                            <Plus size={17} /> Create a post{' '}
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="command-hero-seal" aria-hidden="true">
                        <Swords size={42} strokeWidth={1} />
                        <span>DOMINION</span>
                        <small>COMMAND SANCTUM</small>
                    </div>
                    <span className="command-hero-corner" aria-hidden="true">
                        ◆
                    </span>
                </section>
                <div className="command-stats">
                    {[
                        {
                            label: 'Total posts',
                            value: counts.total,
                            note: 'Your realm’s chronicle',
                            icon: ScrollText,
                            tone: 'cyan',
                        },
                        {
                            label: 'Published',
                            value: counts.published,
                            note: 'Visible to your players',
                            icon: Radio,
                            tone: 'green',
                        },
                        {
                            label: 'Drafts',
                            value: counts.draft,
                            note: 'Awaiting your command',
                            icon: Feather,
                            tone: 'gold',
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className={'command-stat stat-' + item.tone}
                        >
                            <span className="command-stat-icon">
                                <item.icon size={24} strokeWidth={1.5} />
                            </span>
                            <div>
                                <p>{item.label}</p>
                                <strong>
                                    {String(item.value).padStart(2, '0')}
                                </strong>
                                <small>{item.note}</small>
                            </div>
                            <span className="stat-mark" aria-hidden="true">
                                ◆
                            </span>
                        </div>
                    ))}
                </div>
                {status && (
                    <div role="status" className="command-message">
                        <CheckCircle2 size={18} />
                        {status}
                    </div>
                )}
                <section className="command-panel">
                    <div className="command-panel-heading">
                        <div>
                            <p className="command-eyebrow">THE CHRONICLE</p>
                            <h2>Publication board</h2>
                        </div>
                        <span className="command-count">
                            {posts.total} {posts.total === 1 ? 'post' : 'posts'}
                        </span>
                    </div>
                    <form
                        key={JSON.stringify(filters)}
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.get(
                                '/admin/posts',
                                Object.fromEntries(
                                    new FormData(e.currentTarget),
                                ) as Record<string, string>,
                                { preserveState: true, preserveScroll: true },
                            );
                        }}
                        className="flex flex-wrap items-center gap-3 border-b border-slate-700/40 px-5 pb-6 font-[Arial,sans-serif] sm:px-7"
                    >
                        <label className="relative min-w-48 flex-1">
                            <Search
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-slate-500"
                            />
                            <TextInput
                                className="pl-11"
                                aria-label="Search post titles"
                                name="search"
                                defaultValue={filters.search ?? ''}
                                maxLength={100}
                                placeholder="Search the chronicle…"
                            />
                        </label>
                        <SelectInput
                            aria-label="Category"
                            name="category"
                            defaultValue={filters.category ?? ''}
                        >
                            <option value="">All channels</option>
                            {Object.entries(postCategories).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </SelectInput>
                        <SelectInput
                            aria-label="Status"
                            name="status"
                            defaultValue={filters.status ?? ''}
                        >
                            <option value="">All statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </SelectInput>
                        <button
                            type="submit"
                            className="min-h-12 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                        >
                            Filter
                        </button>
                        {filtered && (
                            <Link
                                href="/admin/posts"
                                className="rounded-lg px-2 py-3 text-xs text-slate-400 transition hover:text-cyan-200"
                            >
                                Reset
                            </Link>
                        )}
                    </form>
                    {posts.data.length ? (
                        <div className="command-post-grid">
                            {posts.data.map((post) => (
                                <article key={post.id} className="command-post">
                                    <Link
                                        href={
                                            '/admin/posts/' + post.id + '/edit'
                                        }
                                        className="command-post-image"
                                    >
                                        <img
                                            src={post.cover_url}
                                            alt=""
                                            loading="lazy"
                                        />
                                        <span
                                            className={
                                                'command-badge badge-' +
                                                post.status
                                            }
                                        >
                                            <span />
                                            {post.status}
                                        </span>
                                    </Link>
                                    <div className="command-post-copy">
                                        <p className="command-post-meta">
                                            {post.category_label}
                                            <span>
                                                {post.date ?? 'Unpublished'}
                                            </span>
                                        </p>
                                        <h3>
                                            <Link
                                                href={
                                                    '/admin/posts/' +
                                                    post.id +
                                                    '/edit'
                                                }
                                            >
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="command-post-excerpt">
                                            {post.excerpt}
                                        </p>
                                        <div className="command-post-actions">
                                            <Link
                                                href={
                                                    '/admin/posts/' +
                                                    post.id +
                                                    '/edit'
                                                }
                                            >
                                                <Feather size={14} /> Edit post
                                            </Link>
                                            {post.status === 'published' && (
                                                <Link href={post.url}>
                                                    View live{' '}
                                                    <ArrowRight size={14} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="command-empty">
                            <div
                                className="command-empty-emblem"
                                aria-hidden="true"
                            >
                                <div />
                                <img
                                    src="/storage/Assets/Class/guardian_logo.png"
                                    alt=""
                                />
                            </div>
                            <p className="command-eyebrow">
                                {filtered
                                    ? 'NO MATCHING ENTRIES'
                                    : 'A NEW CHAPTER AWAITS'}
                            </p>
                            <h3>
                                {filtered
                                    ? 'Nothing in this chapter.'
                                    : 'Let your realm hear you.'}
                            </h3>
                            <p>
                                {filtered
                                    ? 'Try another search or channel to find your post.'
                                    : 'Your chronicle is unwritten. Publish an announcement, reveal a patch, or call your warriors to the next event.'}
                            </p>
                            <Link
                                href={
                                    filtered
                                        ? '/admin/posts'
                                        : '/admin/posts/create'
                                }
                                className="command-button command-button-subtle"
                            >
                                <Feather size={16} />
                                {filtered
                                    ? 'Clear filters'
                                    : 'Create your first post'}
                                <ArrowRight size={16} />
                            </Link>
                            {!filtered && (
                                <div className="command-empty-channels">
                                    <span>Announcements</span>
                                    <span>Patch notes</span>
                                    <span>Notices</span>
                                    <span>Events</span>
                                </div>
                            )}
                        </div>
                    )}
                    <PostPager posts={posts} />
                </section>
                <div className="command-hint">
                    <Shield size={15} />
                    <p>
                        Drafts are yours alone. Published posts appear on the
                        website and their category page.
                    </p>
                </div>
            </div>
        </>
    );
}
