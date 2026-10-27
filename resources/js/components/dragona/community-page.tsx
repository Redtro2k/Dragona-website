import { PostCards, PostPager } from '@/components/dragona/post-list';
import type { PostPagination } from '@/types/posts';
import type { ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    CalendarDays,
    CircleHelp,
    ScrollText,
    ChevronRight,
    Megaphone,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

const categories = {
    'patch-announcement': {
        label: 'Patch Announcement',
        heading: 'The realm evolves',
        description:
            'Explore published patch notes, gameplay adjustments, and fixes for Dragona Dominion.',
        icon: ScrollText,
        image: '/storage/Assets/Freatures/slide2.webp',
        emptyTitle: 'No patch announcements yet',
        emptyDescription:
            'Patch notes will appear here when an update is announced. Check back for version details, changes, and fixes.',
        guideTitle: 'Inside each update',
        topics: [
            [
                'New content',
                'Discover additions included in published updates.',
            ],
            [
                'Gameplay changes',
                'Review balance adjustments and feature improvements.',
            ],
            ['Fixes', 'Check resolved issues and any update instructions.'],
        ],
    },
    faq: {
        label: 'FAQ',
        heading: 'A guide for your journey',
        description:
            'Find answers about your account, getting started, and keeping up with the realm.',
        icon: CircleHelp,
        image: '/storage/Assets/Freatures/slide1.webp',
        emptyTitle: '',
        emptyDescription: '',
        guideTitle: 'Find your next step',
        topics: [
            [
                'Getting started',
                'Create an account and visit the installation guide.',
            ],
            [
                'Account access',
                'Use your registered email to log in or request a password reset.',
            ],
            [
                'Stay informed',
                'Check notices, patch announcements, and events for published updates.',
            ],
        ],
    },

    announcement: {
        label: 'Announcement',
        heading: 'Words from the realm',
        description:
            'News from the Dragona Dominion team. Discover what is coming next for your journey.',
        icon: Megaphone,
        image: '/storage/Assets/Freatures/slide1.webp',
        emptyTitle: 'The next chapter is on its way',
        emptyDescription:
            'No announcements have been posted yet. Return here for official news and updates from the team.',
        guideTitle: 'From the Dominion team',
        topics: [
            ['Realm news', 'Major updates and messages from the team.'],
            ['New horizons', 'New content, features, and future adventures.'],
            ['Community', 'Stories and milestones from across the realm.'],
        ],
    },
    notice: {
        label: 'Notice',
        heading: 'Stay ready for battle',
        description:
            'Keep track of important service notices, maintenance updates, and information for your account.',
        icon: Bell,
        image: '/storage/Assets/Freatures/slide2.webp',
        emptyTitle: 'No notices to display',
        emptyDescription:
            'Published service notices will appear here. Check back for maintenance details and important player information.',
        guideTitle: 'Before you enter the realm',
        topics: [
            [
                'Maintenance',
                'Check published notices for downtime and update windows.',
            ],
            [
                'Game client',
                'Visit the download page when you need the client.',
            ],
            [
                'Account security',
                'Keep your password private and use the recovery page if you lose access.',
            ],
        ],
    },
    events: {
        label: 'Events',
        heading: 'Answer the call',
        description:
            'Discover adventures, community gatherings, and challenges across Dragona Dominion.',
        icon: Sparkles,
        image: '/storage/Assets/Freatures/slide3.webp',
        emptyTitle: 'New adventures await',
        emptyDescription:
            'No events have been announced yet. Event dates, participation details, and rewards will appear here when published.',
        guideTitle: 'Prepare for your next adventure',
        topics: [
            ['Discover', 'Find upcoming events and their schedules here.'],
            ['Prepare', 'Read each event’s requirements before you join.'],
            [
                'Take part',
                'Follow the published instructions and gather your allies.',
            ],
        ],
    },
};

export default function CommunityPage({
    category,
    children,
}: {
    category: keyof typeof categories;
    children?: ReactNode;
}) {
    const { posts } = usePage<{ posts?: PostPagination }>().props;
    const page = categories[category];
    const Icon = page.icon;

    return (
        <>
            <Head title={page.label} />
            <div className="min-h-screen bg-[#07111d] pb-24 text-slate-100">
                <section className="relative isolate overflow-hidden px-5 pt-64 pb-14 sm:px-8 sm:pt-56 lg:pt-48 lg:pb-20">
                    <div aria-hidden="true" className="absolute inset-0 -z-10">
                        <img
                            src={page.image}
                            alt=""
                            className="h-full w-full object-cover object-center opacity-35"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#07111d]/95 via-[#07111d]/60 to-[#07111d]/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07111d] via-transparent to-[#07111d]/50" />
                    </div>
                    <div className="mx-auto max-w-6xl">
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-10 flex items-center gap-2 font-[Arial,sans-serif] text-xs text-slate-400"
                        >
                            <Link
                                href="/"
                                className="transition hover:text-cyan-100"
                            >
                                Home
                            </Link>
                            <ChevronRight
                                aria-hidden="true"
                                className="size-3"
                            />
                            <span aria-current="page" className="text-cyan-100">
                                {page.label}
                            </span>
                        </nav>
                        <p className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[.25em] text-cyan-200 uppercase">
                            <Icon aria-hidden="true" className="size-4" />{' '}
                            Dominion dispatch
                        </p>
                        <h1 className="text-3xl font-black tracking-[.04em] uppercase sm:text-5xl lg:text-6xl">
                            {page.label}
                        </h1>
                        <div
                            aria-hidden="true"
                            className="my-6 h-px w-32 bg-gradient-to-r from-cyan-200 to-transparent"
                        />
                        <h2 className="text-lg font-bold text-cyan-50 sm:text-2xl">
                            {page.heading}
                        </h2>
                        <p className="mt-4 max-w-xl font-[Arial,sans-serif] text-base leading-7 text-slate-300">
                            {page.description}
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-6xl px-5 sm:px-8 xl:px-0">
                    <nav
                        aria-label="Community pages"
                        className="mb-10 grid grid-cols-2 border-y border-cyan-100/15 bg-slate-950/40 sm:flex sm:flex-wrap"
                    >
                        {(
                            Object.keys(categories) as Array<
                                keyof typeof categories
                            >
                        ).map((key) => {
                            const item = categories[key];
                            return (
                                <Link
                                    key={key}
                                    href={'/' + key}
                                    aria-current={
                                        key === category ? 'page' : undefined
                                    }
                                    className={`relative flex min-h-16 items-center justify-center gap-2 px-1 py-4 text-[9px] font-bold tracking-wider uppercase transition focus-visible:outline-2 focus-visible:outline-cyan-200 sm:px-8 sm:text-xs ${key === category ? 'bg-cyan-200/10 text-cyan-100' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <item.icon
                                        aria-hidden="true"
                                        className="hidden size-4 min-[400px]:block"
                                    />
                                    {item.label}
                                    {key === category && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,.5)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <section
                            aria-labelledby="updates-heading"
                            className="overflow-hidden border border-cyan-100/20 bg-gradient-to-br from-slate-800/40 to-slate-950/70 shadow-[0_18px_44px_rgba(0,0,0,.2)]"
                        >
                            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
                                <CalendarDays
                                    aria-hidden="true"
                                    className="size-4 text-cyan-200"
                                />
                                <h2
                                    id="updates-heading"
                                    className="text-sm font-bold tracking-wider"
                                >
                                    {category === 'faq'
                                        ? 'Frequently asked questions'
                                        : category === 'events'
                                          ? 'Event board'
                                          : 'Latest updates'}
                                </h2>
                            </div>
                            {children ??
                                (posts?.data.length ? (
                                    <div>
                                        <PostCards posts={posts.data} />
                                        <PostPager posts={posts} />
                                    </div>
                                ) : (
                                    <div className="flex min-h-80 flex-col items-center justify-center px-6 py-16 text-center sm:px-12">
                                        <div className="mb-7 flex size-20 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 shadow-[0_0_32px_rgba(34,211,238,.08)]">
                                            <Icon
                                                aria-hidden="true"
                                                className="size-8 text-cyan-200/75"
                                                strokeWidth={1.25}
                                            />
                                        </div>
                                        <h3 className="text-lg leading-8 font-bold sm:text-xl">
                                            {page.emptyTitle}
                                        </h3>
                                        <p className="mt-4 max-w-md font-[Arial,sans-serif] text-sm leading-7 text-slate-400">
                                            {page.emptyDescription}
                                        </p>
                                        <Link
                                            href="/"
                                            className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-cyan-200 transition hover:text-white"
                                        >
                                            Explore the realm{' '}
                                            <ArrowRight
                                                aria-hidden="true"
                                                className="size-4"
                                            />
                                        </Link>
                                    </div>
                                ))}
                        </section>
                        <aside className="space-y-6">
                            <section className="border border-cyan-100/15 bg-slate-900/50 p-6">
                                <ShieldCheck
                                    aria-hidden="true"
                                    className="mb-4 size-5 text-cyan-200"
                                />
                                <h2 className="text-sm leading-6 font-bold text-white">
                                    {page.guideTitle}
                                </h2>
                                <div className="mt-6 space-y-5">
                                    {page.topics.map(([title, description]) => (
                                        <div
                                            key={title}
                                            className="border-l border-cyan-200/25 pl-4"
                                        >
                                            <h3 className="text-xs font-bold text-cyan-100">
                                                {title}
                                            </h3>
                                            <p className="mt-2 font-[Arial,sans-serif] text-sm leading-6 text-slate-400">
                                                {description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="border border-cyan-100/25 bg-gradient-to-br from-cyan-950/60 to-slate-950 p-6">
                                <p className="text-[10px] tracking-[.2em] text-cyan-200 uppercase">
                                    Your journey continues
                                </p>
                                <h2 className="mt-3 text-lg leading-8 font-bold">
                                    Return to the realm
                                </h2>
                                <p className="mt-3 font-[Arial,sans-serif] text-sm leading-6 text-slate-400">
                                    Get the game client and prepare for your
                                    next adventure.
                                </p>
                                <Link
                                    href="/download"
                                    className="mt-5 flex min-h-12 items-center justify-center gap-2 border border-cyan-100/40 bg-cyan-200/5 px-4 text-xs font-bold text-cyan-100 transition hover:bg-cyan-200/15 focus-visible:outline-2 focus-visible:outline-cyan-200"
                                >
                                    Download client{' '}
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                </Link>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
