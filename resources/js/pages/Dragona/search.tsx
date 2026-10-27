import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { PostCard } from '@/types/posts';

type PageResult = {
    title: string;
    type: string;
    description: string;
    url: string;
};

export default function SearchPage({
    query,
    pageResults,
    postResults,
}: {
    query: string;
    pageResults: PageResult[];
    postResults: PostCard[];
}) {
    const [value, setValue] = useState(query);
    const resultCount = pageResults.length + postResults.length;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = value.trim();

        router.get('/search', trimmed ? { q: trimmed } : {}, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <>
            <Head title="Search" />
            <main className="min-h-screen bg-[#07111d] px-5 pt-48 pb-24 text-slate-100 sm:pt-56">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <p className="text-xs font-black tracking-[0.3em] text-cyan-200 uppercase">
                            The Dominion archive
                        </p>
                        <h1 className="mt-5 text-4xl font-black tracking-[0.08em] text-white uppercase sm:text-6xl">
                            Search the realm
                        </h1>
                        <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
                            Find news, classes, support guides, and other paths
                            through Dragona Dominion.
                        </p>
                    </div>

                    <form className="relative mt-12 max-w-4xl" onSubmit={submit}>
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-5 size-6 -translate-y-1/2 text-cyan-100/70" />
                        <input
                            aria-label="Search the website"
                            autoFocus
                            className="h-16 w-full border border-cyan-100/25 bg-black/45 pr-32 pl-16 text-lg text-white outline-none transition placeholder:text-white/35 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-200/15"
                            onChange={(event) => setValue(event.target.value)}
                            placeholder="Search announcements, classes, guides..."
                            type="search"
                            value={value}
                        />
                        <button
                            className="absolute top-2 right-2 bottom-2 border border-cyan-100/40 bg-cyan-100/10 px-5 text-xs font-black tracking-[0.16em] text-cyan-50 uppercase transition hover:bg-cyan-100/20"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>

                    {query ? (
                        <p className="mt-8 text-sm text-white/55">
                            {resultCount} {resultCount === 1 ? 'result' : 'results'}{' '}
                            for <span className="text-cyan-100">“{query}”</span>
                        </p>
                    ) : (
                        <p className="mt-8 text-sm text-white/55">
                            Try searching for a class, event, patch, or guide.
                        </p>
                    )}

                    {query && resultCount === 0 ? (
                        <div className="mt-12 border border-cyan-100/15 bg-black/30 p-10">
                            <h2 className="text-2xl font-black text-white">
                                No paths found
                            </h2>
                            <p className="mt-3 text-white/65">
                                Try a broader search term or explore the main
                                navigation above.
                            </p>
                        </div>
                    ) : null}

                    {pageResults.length ? (
                        <section className="mt-12">
                            <h2 className="text-xl font-black tracking-[0.12em] text-white uppercase">
                                Pages and classes
                            </h2>
                            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {pageResults.map((result) => (
                                    <Link
                                        className="group border border-cyan-100/15 bg-black/35 p-6 transition hover:border-cyan-100/55 hover:bg-cyan-100/[0.06]"
                                        href={result.url}
                                        key={result.url}
                                    >
                                        <p className="text-xs font-bold tracking-[0.18em] text-cyan-200 uppercase">
                                            {result.type}
                                        </p>
                                        <h3 className="mt-3 text-xl font-black text-white group-hover:text-cyan-100">
                                            {result.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-6 text-white/60">
                                            {result.description}
                                        </p>
                                        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-200 uppercase">
                                            Explore <ArrowRight className="size-4" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {postResults.length ? (
                        <section className="mt-16">
                            <h2 className="text-xl font-black tracking-[0.12em] text-white uppercase">
                                Chronicle entries
                            </h2>
                            <div className="mt-5 divide-y divide-cyan-100/10 border border-cyan-100/15 bg-black/30">
                                {postResults.map((post) => (
                                    <Link
                                        className="group flex flex-col gap-5 p-6 transition hover:bg-cyan-100/[0.05] sm:flex-row"
                                        href={post.url}
                                        key={post.id}
                                    >
                                        <img
                                            alt=""
                                            className="aspect-video w-full object-cover sm:h-28 sm:w-48"
                                            src={post.cover_url}
                                        />
                                        <div>
                                            <p className="text-xs text-cyan-200">
                                                {post.category_label} · {post.date}
                                            </p>
                                            <h3 className="mt-2 text-xl font-black text-white group-hover:text-cyan-100">
                                                {post.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ) : null}
                </div>
            </main>
        </>
    );
}
