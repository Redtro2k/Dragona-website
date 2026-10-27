import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowUpRight,
    Compass,
    Home,
    ShieldQuestion,
    Sparkles,
} from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <Head title="404 · Lost in the realm">
                <meta name="robots" content="noindex" />
            </Head>
            <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#060d17] text-slate-100">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                >
                    <img
                        src="/storage/Assets/background1.jpg"
                        alt=""
                        className="h-full w-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#060d17]/80 via-[#060d17]/65 to-[#060d17]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(34,211,238,0.10),transparent_60%)]" />
                </div>
                <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-10">
                    <Link href="/" aria-label="Dragona Dominion home">
                        <img
                            src="/storage/Assets/DragonaLogoD.png"
                            alt="Dragona Dominion"
                            className="h-16 w-44 object-contain drop-shadow-[0_0_18px_rgba(34,211,238,.2)] sm:w-52"
                        />
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-[Arial,sans-serif] text-xs text-slate-400 transition hover:text-cyan-100"
                    >
                        <ArrowLeft className="size-4" /> Back to the realm
                    </Link>
                </header>
                <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:py-12">
                    <div
                        aria-hidden="true"
                        className="relative mb-7 flex h-44 w-full items-center justify-center sm:h-56"
                    >
                        <div className="absolute size-40 rotate-45 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.025] shadow-[0_0_75px_rgba(34,211,238,.08)] sm:size-48" />
                        <div className="absolute size-48 rounded-full border border-dashed border-cyan-200/10 sm:size-60" />
                        <span className="relative bg-gradient-to-b from-cyan-50 via-cyan-200 to-sky-800 bg-clip-text font-[Georgia,serif] text-[130px] leading-none font-bold tracking-[.06em] text-transparent drop-shadow-[0_8px_35px_rgba(34,211,238,.12)] sm:text-[180px]">
                            404
                        </span>
                        <span className="absolute -bottom-1 flex size-10 items-center justify-center rounded-xl border border-cyan-200/25 bg-[#0c1b2b] text-cyan-200">
                            <Compass className="size-5" />
                        </span>
                    </div>
                    <p className="mt-4 font-[Arial,sans-serif] text-[10px] font-semibold tracking-[.3em] text-cyan-200/70 uppercase">
                        Beyond the known realm
                    </p>
                    <h1 className="mt-5 text-2xl leading-tight font-black sm:text-4xl">
                        This path has faded.
                    </h1>
                    <p className="mt-5 max-w-md font-[Arial,sans-serif] text-sm leading-7 text-slate-400 sm:text-base">
                        The page you’re looking for may have moved, been
                        removed, or never existed. Your adventure doesn’t end
                        here.
                    </p>
                    <div className="mt-8 flex w-full flex-col justify-center gap-3 font-[Arial,sans-serif] sm:w-auto sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-800 to-sky-900 px-7 text-sm font-semibold text-cyan-50 shadow-[0_0_25px_rgba(34,211,238,.1)] transition hover:border-cyan-200 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                        >
                            <Home className="size-4" /> Return home
                        </Link>
                        <Link
                            href="/faq"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-600/50 bg-slate-900/60 px-7 text-sm text-slate-300 transition hover:border-cyan-200/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                        >
                            <ShieldQuestion className="size-4" /> Visit the FAQ
                        </Link>
                    </div>
                    <div className="mt-12 w-full max-w-lg border-t border-cyan-100/10 pt-6">
                        <p className="mb-4 flex items-center justify-center gap-2 font-[Arial,sans-serif] text-[10px] tracking-[.15em] text-slate-500 uppercase">
                            <Sparkles className="size-3" /> Choose another path
                        </p>
                        <nav
                            aria-label="Explore the realm"
                            className="flex flex-wrap justify-center gap-x-7 gap-y-4 font-[Arial,sans-serif] text-xs text-slate-400"
                        >
                            {[
                                ['Sniper', '/sniper'],
                                ['Shaman', '/shaman'],
                                ['Latest news', '/announcement'],
                                ['Events', '/events'],
                            ].map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="inline-flex items-center gap-1 transition hover:text-cyan-200"
                                >
                                    {label}
                                    <ArrowUpRight className="size-3" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </section>
                <footer className="px-6 py-6 text-center font-[Arial,sans-serif] text-[9px] tracking-[.2em] text-slate-600 uppercase">
                    Dragona Dominion · Where dragons rise, kingdoms fall.
                </footer>
            </main>
        </>
    );
}
