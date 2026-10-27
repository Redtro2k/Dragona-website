import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    ArrowLeft,
    ArrowUpRight,
    Bold,
    Check,
    FileText,
    Heading2,
    Italic,
    List,
    LoaderCircle,
    Quote,
    Save,
    Send,
    Settings2,
    Trash2,
} from 'lucide-react';
import {
    FormField,
    TextInput,
    TextArea,
    SelectInput,
} from '@/components/dragona/form-controls';
import CoverUpload from '@/components/dragona/cover-upload';
import { postCategories } from '@/types/posts';
import type { PostCard, PostCategory } from '@/types/posts';

type EditablePost = PostCard & { body: string; has_cover: boolean };
const panel =
    'overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/45 to-slate-900/70 shadow-xl shadow-black/10';
const button =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 font-[Arial,sans-serif] text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-cyan-300/20 disabled:cursor-wait disabled:opacity-50';

export default function PostEditor({ post }: { post: EditablePost | null }) {
    const form = useForm({
        title: post?.title ?? '',
        category: post?.category ?? ('announcement' as PostCategory),
        excerpt: post?.excerpt ?? '',
        body: post?.body ?? '',
        status: post?.status ?? 'draft',
        cover: null as File | null,
        remove_cover: false,
    });
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const words = form.data.body.trim()
        ? form.data.body.trim().split(/\s+/).length
        : 0;
    const describe = (id: string) =>
        id +
        '-hint' +
        (form.errors[id as keyof typeof form.errors]
            ? ' ' + id + '-error'
            : '');
    function save(status: 'draft' | 'published') {
        form.transform((data) => ({
            ...data,
            status,
            ...(post ? { _method: 'put' } : {}),
        }));
        form.post(post ? '/admin/posts/' + post.id : '/admin/posts', {
            forceFormData: true,
            preserveScroll: true,
        });
    }
    function insert(before: string, after = '', placeholder = 'text') {
        const input = bodyRef.current;
        if (!input) return;
        const start = input.selectionStart,
            end = input.selectionEnd;
        const selection = form.data.body.slice(start, end) || placeholder;
        form.setData(
            'body',
            form.data.body.slice(0, start) +
                before +
                selection +
                after +
                form.data.body.slice(end),
        );
        requestAnimationFrame(() => {
            input.focus();
            input.setSelectionRange(
                start + before.length,
                start + before.length + selection.length,
            );
        });
    }
    return (
        <>
            <Head title={post ? 'Edit post' : 'Create post'} />
            <div className="command-content">
                <div className="mx-auto max-w-6xl">
                    <Link
                        href="/admin/posts"
                        className="inline-flex items-center gap-2 font-[Arial,sans-serif] text-xs text-slate-400 hover:text-cyan-200"
                    >
                        <ArrowLeft className="size-3.5" /> Back to publications
                    </Link>
                    <header className="mt-7 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[.2em] text-cyan-300/70 uppercase">
                                The scribe forge
                            </p>
                            <h1 className="mt-3 text-2xl font-bold text-slate-100 sm:text-3xl">
                                {post
                                    ? 'Refine your chronicle'
                                    : 'Forge a new chronicle'}
                            </h1>
                            <p className="mt-3 font-[Arial,sans-serif] text-sm text-slate-400">
                                A clear message. A striking cover. Your next
                                update starts here.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-800/70 px-3 py-1.5 font-[Arial,sans-serif] text-xs text-slate-300">
                            <span
                                className={`size-1.5 rounded-full ${post?.status === 'published' ? 'bg-emerald-300' : 'bg-amber-300'}`}
                            />
                            {post?.status === 'published'
                                ? 'Published post'
                                : 'Draft workspace'}
                        </span>
                    </header>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            save(
                                (
                                    e.nativeEvent as SubmitEvent
                                ).submitter?.getAttribute('value') === 'draft'
                                    ? 'draft'
                                    : 'published',
                            );
                        }}
                        className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
                    >
                        <section className={panel}>
                            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5 sm:px-7">
                                <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                                    <FileText className="size-4" />
                                </span>
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-100">
                                        Post details
                                    </h2>
                                    <p className="mt-1 font-[Arial,sans-serif] text-xs text-slate-500">
                                        Tell your players what’s new.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-7 p-5 sm:p-7">
                                <FormField
                                    id="title"
                                    label="Post title"
                                    hint="Keep it clear, specific, and easy to scan."
                                    error={form.errors.title}
                                    counter={form.data.title.length + '/255'}
                                >
                                    <TextInput
                                        id="title"
                                        value={form.data.title}
                                        onChange={(e) =>
                                            form.setData(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        maxLength={255}
                                        placeholder="Give your update a memorable title…"
                                        aria-invalid={!!form.errors.title}
                                        aria-describedby={describe('title')}
                                        className="py-3.5 text-base font-medium"
                                    />
                                </FormField>
                                <FormField
                                    id="excerpt"
                                    label="Short summary"
                                    hint="A quick introduction for the landing page and post cards."
                                    error={form.errors.excerpt}
                                    counter={form.data.excerpt.length + '/500'}
                                >
                                    <TextArea
                                        id="excerpt"
                                        rows={3}
                                        value={form.data.excerpt}
                                        onChange={(e) =>
                                            form.setData(
                                                'excerpt',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        maxLength={500}
                                        placeholder="What should players know at a glance?"
                                        aria-invalid={!!form.errors.excerpt}
                                        aria-describedby={describe('excerpt')}
                                    />
                                </FormField>
                                <FormField
                                    id="body"
                                    label="Post content"
                                    hint="Markdown supported. Use the toolbar for headings, emphasis, and lists."
                                    error={form.errors.body}
                                >
                                    <div
                                        className={`overflow-hidden rounded-xl border bg-slate-950/50 shadow-inner transition focus-within:ring-4 ${form.errors.body ? 'border-rose-400/60 focus-within:ring-rose-400/10' : 'border-slate-700/70 focus-within:border-cyan-400/70 focus-within:ring-cyan-400/10 hover:border-slate-500/80'}`}
                                    >
                                        <div
                                            role="group"
                                            aria-label="Text formatting"
                                            className="flex flex-wrap items-center gap-1 border-b border-slate-700/50 bg-slate-800/45 px-3 py-2"
                                        >
                                            {[
                                                {
                                                    label: 'Heading',
                                                    icon: Heading2,
                                                    before: '\n## ',
                                                    after: '',
                                                    placeholder: 'Heading',
                                                },
                                                {
                                                    label: 'Bold',
                                                    icon: Bold,
                                                    before: '**',
                                                    after: '**',
                                                    placeholder: 'bold text',
                                                },
                                                {
                                                    label: 'Italic',
                                                    icon: Italic,
                                                    before: '*',
                                                    after: '*',
                                                    placeholder: 'italic text',
                                                },
                                                {
                                                    label: 'List',
                                                    icon: List,
                                                    before: '\n- ',
                                                    after: '',
                                                    placeholder: 'List item',
                                                },
                                                {
                                                    label: 'Quote',
                                                    icon: Quote,
                                                    before: '\n> ',
                                                    after: '',
                                                    placeholder: 'Quote',
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    type="button"
                                                    title={item.label}
                                                    aria-label={item.label}
                                                    onClick={() =>
                                                        insert(
                                                            item.before,
                                                            item.after,
                                                            item.placeholder,
                                                        )
                                                    }
                                                    className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-200 focus-visible:bg-cyan-300/10"
                                                >
                                                    <item.icon className="size-4" />
                                                </button>
                                            ))}
                                            <span className="ml-auto hidden rounded-md bg-slate-950/40 px-2 py-1 text-[10px] text-slate-500 sm:block">
                                                MARKDOWN
                                            </span>
                                        </div>
                                        <textarea
                                            ref={bodyRef}
                                            id="body"
                                            rows={15}
                                            value={form.data.body}
                                            onChange={(e) =>
                                                form.setData(
                                                    'body',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            maxLength={100000}
                                            placeholder={
                                                'Tell the full story…\n\nShare what’s changing, what’s coming, and what players need to do.'
                                            }
                                            aria-invalid={!!form.errors.body}
                                            aria-describedby={describe('body')}
                                            className="block min-h-80 w-full resize-y bg-transparent px-5 py-5 font-[Arial,sans-serif] text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600 focus-visible:!outline-none"
                                        />
                                        <div className="flex justify-between gap-3 border-t border-white/5 bg-slate-900/30 px-4 py-2.5 text-[11px] text-slate-500 tabular-nums">
                                            <span>
                                                {words}{' '}
                                                {words === 1 ? 'word' : 'words'}
                                            </span>
                                            <span>
                                                {form.data.body.length.toLocaleString()}{' '}
                                                / 100,000
                                            </span>
                                        </div>
                                    </div>
                                </FormField>
                            </div>
                        </section>
                        <aside className="space-y-5">
                            <section className={panel}>
                                <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
                                    <Settings2 className="size-4 text-cyan-200" />
                                    <h2 className="text-sm font-semibold">
                                        Post settings
                                    </h2>
                                </div>
                                <div className="space-y-6 p-5">
                                    <FormField
                                        id="category"
                                        label="Publication channel"
                                        hint="Choose where this post will appear."
                                        error={form.errors.category}
                                    >
                                        <SelectInput
                                            id="category"
                                            value={form.data.category}
                                            onChange={(e) =>
                                                form.setData(
                                                    'category',
                                                    e.target
                                                        .value as PostCategory,
                                                )
                                            }
                                            aria-invalid={
                                                !!form.errors.category
                                            }
                                            aria-describedby={describe(
                                                'category',
                                            )}
                                        >
                                            {Object.entries(postCategories).map(
                                                ([key, label]) => (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {label}
                                                    </option>
                                                ),
                                            )}
                                        </SelectInput>
                                    </FormField>
                                    <CoverUpload
                                        file={form.data.cover}
                                        currentUrl={
                                            post?.has_cover &&
                                            !form.data.remove_cover
                                                ? post.cover_url
                                                : undefined
                                        }
                                        error={form.errors.cover}
                                        onChange={(file) =>
                                            form.setData('cover', file)
                                        }
                                    />
                                    {post?.has_cover && (
                                        <label className="flex items-center gap-2 text-xs text-slate-400">
                                            <input
                                                type="checkbox"
                                                checked={form.data.remove_cover}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'remove_cover',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="size-4 rounded border-slate-600 accent-cyan-400"
                                            />
                                            Remove the saved cover
                                        </label>
                                    )}
                                </div>
                            </section>
                            <section className={panel + ' p-5'}>
                                <h2 className="text-sm font-semibold">
                                    Ready for the realm?
                                </h2>
                                <p className="mt-3 text-xs leading-6 text-slate-400">
                                    Publish to share this post with your
                                    players, or keep working privately as a
                                    draft.
                                </p>
                                {form.progress && (
                                    <p
                                        role="status"
                                        className="mt-3 text-xs text-cyan-200"
                                    >
                                        Uploading {form.progress.percentage}%
                                    </p>
                                )}
                                <div className="mt-5 space-y-2.5">
                                    <button
                                        type="submit"
                                        name="intent"
                                        value="published"
                                        disabled={form.processing}
                                        className={
                                            button +
                                            ' w-full border border-cyan-300/30 bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-950/50 hover:from-cyan-500 hover:to-sky-500'
                                        }
                                    >
                                        {form.processing ? (
                                            <LoaderCircle className="size-4 animate-spin" />
                                        ) : (
                                            <Send className="size-4" />
                                        )}
                                        {post?.status === 'published'
                                            ? 'Update published post'
                                            : 'Publish post'}
                                        <ArrowUpRight className="ml-auto size-4 opacity-70" />
                                    </button>
                                    <button
                                        type="submit"
                                        name="intent"
                                        value="draft"
                                        disabled={form.processing}
                                        className={
                                            button +
                                            ' w-full border border-slate-600/60 bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                                        }
                                    >
                                        <Save className="size-4" />
                                        Save draft
                                    </button>
                                </div>
                                {form.errors.status && (
                                    <p
                                        role="alert"
                                        className="mt-3 text-xs text-rose-300"
                                    >
                                        {form.errors.status}
                                    </p>
                                )}
                                <p className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                                    <Check className="size-3.5" />
                                    Drafts stay hidden from visitors.
                                </p>
                            </section>
                            {post && (
                                <section className="rounded-xl border border-rose-400/10 bg-rose-950/5 p-4 text-xs">
                                    {!confirmDelete ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setConfirmDelete(true)
                                            }
                                            className="flex items-center gap-2 text-slate-500 hover:text-rose-300"
                                        >
                                            <Trash2 className="size-3.5" />
                                            Delete this post
                                        </button>
                                    ) : (
                                        <>
                                            <p className="mb-3 text-slate-300">
                                                Permanently delete this post?
                                            </p>
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    disabled={deleting}
                                                    onClick={() => {
                                                        setDeleting(true);
                                                        router.delete(
                                                            '/admin/posts/' +
                                                                post.id,
                                                            {
                                                                onFinish: () =>
                                                                    setDeleting(
                                                                        false,
                                                                    ),
                                                            },
                                                        );
                                                    }}
                                                    className="text-rose-300"
                                                >
                                                    {deleting
                                                        ? 'Deleting…'
                                                        : 'Delete permanently'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setConfirmDelete(false)
                                                    }
                                                    className="text-slate-300"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </section>
                            )}
                        </aside>
                    </form>
                </div>
            </div>
        </>
    );
}
