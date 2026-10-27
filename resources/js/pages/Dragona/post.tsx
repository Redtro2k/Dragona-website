import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { PostCard } from '@/types/posts';

export default function Post({
    post,
}: {
    post: PostCard & { body_html: string };
}) {
    return (
        <>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt} />
            </Head>
            <div className="min-h-screen bg-[#07111d] px-5 pt-64 pb-24 text-slate-100 sm:pt-56 lg:pt-48">
                <article className="mx-auto max-w-4xl">
                    <Link
                        href={'/' + post.category}
                        className="inline-flex items-center gap-2 text-xs text-cyan-200"
                    >
                        <ArrowLeft className="size-4" /> {post.category_label}
                    </Link>
                    <p className="mt-10 font-[Arial,sans-serif] text-sm text-cyan-200">
                        {post.category_label} · {post.date}
                    </p>
                    <h1 className="mt-5 text-3xl leading-tight font-black break-words sm:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mt-6 font-[Arial,sans-serif] text-lg leading-8 break-words text-slate-300">
                        {post.excerpt}
                    </p>
                    <img
                        src={post.cover_url}
                        alt=""
                        className="mt-10 aspect-video w-full border border-cyan-100/20 object-cover"
                    />
                    <div
                        className="post-body mt-10 font-[Arial,sans-serif] text-base leading-8 break-words text-slate-200"
                        dangerouslySetInnerHTML={{ __html: post.body_html }}
                    />
                    <div className="mt-12 border-t border-cyan-100/15 pt-8">
                        <Link
                            href={'/' + post.category}
                            className="text-sm text-cyan-200"
                        >
                            More {post.category_label.toLowerCase()} posts →
                        </Link>
                    </div>
                </article>
            </div>
        </>
    );
}
