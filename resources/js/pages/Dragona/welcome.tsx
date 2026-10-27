import { Head, Link } from '@inertiajs/react';
import { Swords } from 'lucide-react';
import type { CSSProperties } from 'react';
import { PostCards } from '@/components/dragona/post-list';
import type { PostCard } from '@/types/posts';

const characterClasses = [
    {
        name: 'Guardian',
        logo: '/storage/Assets/Class/guardian_logo.png',
        accent: '#22d3ee',
        description:
            'A front-line defender built for close combat, heavy armor, and relentless pressure.',
    },
    {
        name: 'Ranger',
        href: '/ranger',
        logo: '/storage/Assets/Class/rander_logo.png',
        accent: '#e879f9',
        description:
            'A swift hunter who controls distance, strikes first, and slips away before danger closes in.',
    },
    {
        name: 'Magician',
        href: '/magician',
        logo: '/storage/Assets/Class/mage_logo.png',
        accent: '#a855f7',
        description:
            'A master of ancient spells who bends elemental force into devastating battlefield power.',
    },
    {
        name: 'Shaman',
        href: '/shaman',
        logo: '/storage/Assets/Class/shaman_logo.png',
        accent: '#facc15',
        description:
            'A spiritual caster who channels dragon rites to protect allies and weaken enemies.',
    },
    {
        name: 'Gunner',
        logo: '/storage/Assets/Class/gunner_logo.png',
        accent: '#f97316',
        href: '/gunner',
        description:
            'A ranged specialist who uses precision weapons and explosive tactics to dominate fights.',
    },
    {
        name: 'Assassin',
        logo: '/storage/Assets/Class/assasin_logo.png',
        accent: '#3b82f6',
        href: '/assassin',
        description:
            'A deadly shadow fighter who punishes exposed targets with fast, decisive strikes.',
    },
    {
        name: 'Sniper',
        href: '/sniper',
        logo: '/storage/Assets/Class/sniper_logo.png',
        accent: '#ef4444',
        description:
            'A patient marksman who finds perfect angles and ends battles before enemies can respond.',
    },
    {
        name: 'Scout',
        href: '/scout',
        logo: '/storage/Assets/Class/scout_logo.png',
        accent: '#84cc16',
        description:
            'A swift trapper who uses shuriken, stealth, and nature-born agility to control the battlefield.',
    },
];

export default function Welcome({
    latestPosts = [],
}: {
    latestPosts?: PostCard[];
}) {
    return (
        <>
            <Head title="Welcome" />
            <section className="dragona-home-hero relative flex items-center justify-center overflow-hidden px-6 pt-8 pb-16 text-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    <video
                        autoPlay
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source
                            src="/storage/Assets/Background.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#07111d]/78 to-[#07111d]" />
                </div>
                <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
                    <img
                        src="/storage/Assets/Logo2.png"
                        alt="Dragona Dominion"
                        className="dragona-hero-logo h-auto w-[min(92vw,920px)] max-w-none object-contain mix-blend-screen drop-shadow-[0_0_24px_rgba(34,211,238,0.5)]"
                    />
                    <p className="-mt-6 text-sm font-bold tracking-[0.14em] text-white uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:-mt-9 sm:text-lg">
                        Where dragons rise, kingdoms fall.
                    </p>
                </div>
            </section>
            <section
                className="relative z-10 -mt-px bg-[#07111d] bg-cover bg-fixed bg-center px-6 py-24"
                style={{
                    backgroundImage:
                        "url('/storage/Assets/BackgroundContent.jpg')",
                }}
            >
                <div className="relative z-10 mx-auto mb-20 max-w-6xl text-center">
                    <h2 className="text-4xl font-black tracking-[0.08em] text-white uppercase drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] sm:text-6xl lg:text-7xl">
                        Welcome to Dragona Dominion
                    </h2>
                    <div className="mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                    <p className="dragona-story-copy mx-auto mt-8 max-w-4xl text-base leading-8 text-white/82 drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)] sm:text-xl">
                        A legendary realm of dragons, magic, and war awaits.
                        Awaken your dragon blood, face the darkness of Bartan,
                        and begin your journey to restore honor to the name of
                        Dragona.
                    </p>
                </div>
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#07111d] to-transparent" />
                <section
                    id="announcement"
                    aria-labelledby="latest-news-heading"
                    className="relative z-10 mx-auto max-w-6xl"
                >
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <h2
                            id="latest-news-heading"
                            className="text-2xl font-black tracking-wider text-white uppercase sm:text-3xl"
                        >
                            Latest from the realm
                        </h2>
                        <Link
                            href="/announcement"
                            className="text-sm text-cyan-200 hover:text-white"
                        >
                            All announcements →
                        </Link>
                    </div>
                    {latestPosts.length ? (
                        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                            <article className="overflow-hidden border border-cyan-100/20 bg-black/60 shadow-[0_18px_44px_rgba(0,0,0,.5)]">
                                <Link
                                    href={latestPosts[0].url}
                                    className="group block"
                                >
                                    <img
                                        src={latestPosts[0].cover_url}
                                        alt=""
                                        className="aspect-video w-full object-cover"
                                    />
                                    <div className="p-6 sm:p-8">
                                        <p className="font-[Arial,sans-serif] text-xs text-cyan-200">
                                            {latestPosts[0].category_label} ·{' '}
                                            {latestPosts[0].date}
                                        </p>
                                        <h3 className="mt-4 text-2xl leading-tight font-black break-words text-white group-hover:text-cyan-100 sm:text-3xl">
                                            {latestPosts[0].title}
                                        </h3>
                                        <p className="mt-4 font-[Arial,sans-serif] text-sm leading-7 break-words text-slate-300">
                                            {latestPosts[0].excerpt}
                                        </p>
                                        <span className="mt-6 block text-xs text-cyan-200">
                                            Read full post →
                                        </span>
                                    </div>
                                </Link>
                            </article>
                            <div className="border border-cyan-100/20 bg-black/60">
                                {latestPosts.length > 1 ? (
                                    <PostCards posts={latestPosts.slice(1)} />
                                ) : (
                                    <div className="p-8">
                                        <h3 className="text-lg font-bold text-white">
                                            Stay connected
                                        </h3>
                                        <p className="mt-4 font-[Arial,sans-serif] text-sm leading-7 text-slate-300">
                                            Find more news, service notices,
                                            patch notes, and events on our
                                            community pages.
                                        </p>
                                        <Link
                                            href="/events"
                                            className="mt-5 block text-sm text-cyan-200"
                                        >
                                            Explore events →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="border border-cyan-100/20 bg-black/60 px-6 py-12 text-center">
                            <h3 className="text-xl font-bold text-white">
                                The next chapter is on its way
                            </h3>
                            <p className="mt-4 font-[Arial,sans-serif] text-sm text-slate-300">
                                Published announcements, patch notes, notices,
                                and events will appear here.
                            </p>
                        </div>
                    )}
                </section>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[#07111d]/88 to-black backdrop-blur-[6px]" />
            </section>
            <section
                id="classes"
                className="relative z-10 scroll-mt-28 bg-black px-6 py-24"
            >
                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl font-black tracking-[0.08em] text-white uppercase drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] sm:text-6xl">
                        Who Will You Become?
                    </h2>
                    <div className="mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                    <p className="dragona-story-copy mx-auto mt-8 max-w-4xl text-base leading-8 text-white/82 drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)] sm:text-xl">
                        Choose your path as a Dragona warrior and awaken the
                        power hidden within your blood. Master ancient
                        abilities, face fearsome enemies, and rise through
                        battle to claim your place in the legend of Dragona
                        Dominion.
                    </p>
                </div>
                <div className="relative z-10 mt-16 overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
                    <div className="dragona-marquee flex w-max gap-6">
                        {[...characterClasses, ...characterClasses].map(
                            (characterClass, index) => (
                                <article
                                    className="group min-h-72 w-64 shrink-0 rounded-md border border-white/14 bg-white/[0.035] p-5 text-center transition duration-200 hover:border-[var(--class-accent)] hover:bg-white/[0.07] hover:shadow-[0_0_24px_var(--class-accent)]"
                                    key={`${characterClass.name}-${index}`}
                                    style={
                                        {
                                            '--class-accent':
                                                characterClass.accent,
                                        } as CSSProperties
                                    }
                                >
                                    <img
                                        src={characterClass.logo}
                                        alt={`${characterClass.name} class logo`}
                                        className="dragona-class-logo mx-auto h-28 w-28 object-contain drop-shadow-[0_0_16px_var(--class-accent)] transition duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_24px_var(--class-accent)]"
                                    />
                                    <h3 className="text-xl font-black tracking-[0.12em] text-white uppercase transition group-hover:text-[var(--class-accent)] group-hover:drop-shadow-[0_0_10px_var(--class-accent)]">
                                        {characterClass.name}
                                    </h3>
                                    <div className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-[var(--class-accent)] to-transparent" />
                                    <p className="mt-4 text-sm leading-6 text-white/68 transition group-hover:text-white/84">
                                        {characterClass.description}
                                    </p>
                                    {characterClass.href ? (
                                        <Link
                                            className="mt-6 inline-flex h-10 items-center justify-center gap-2 border border-white/28 px-5 text-xs font-black tracking-[0.18em] text-white uppercase transition hover:border-[var(--class-accent)] hover:bg-white/10 hover:text-[var(--class-accent)] hover:drop-shadow-[0_0_10px_var(--class-accent)]"
                                            href={characterClass.href}
                                        >
                                            <Swords className="size-4 text-white/85 transition group-hover:text-[var(--class-accent)]" />
                                            Choose
                                        </Link>
                                    ) : (
                                        <span
                                            aria-disabled="true"
                                            className="mt-6 inline-flex h-10 cursor-not-allowed items-center justify-center gap-2 border border-white/14 px-5 text-xs font-black tracking-[0.18em] text-white/40 uppercase"
                                        >
                                            <Swords className="size-4" />
                                            Coming Soon
                                        </span>
                                    )}
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
