import { Link, usePage } from '@inertiajs/react';
import SiteMenu, { type MenuItem } from '@/components/dragona/menu';
import { Download, Menu as MenuIcon, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export default function Navigation({
    authItems = [],
    mainItems = [],
}: {
    authItems?: MenuItem[];
    mainItems?: MenuItem[];
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const updateScrolled = () => setIsScrolled(window.scrollY > 12);

        updateScrolled();
        window.addEventListener('scroll', updateScrolled, { passive: true });

        return () => window.removeEventListener('scroll', updateScrolled);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [url]);

    useEffect(() => {
        if (!isMobileOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileOpen(false);
            }
        };
        const closeOnDesktop = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setIsMobileOpen(false);
            }
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', closeOnEscape);
        window.addEventListener('resize', closeOnDesktop);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', closeOnEscape);
            window.removeEventListener('resize', closeOnDesktop);
        };
    }, [isMobileOpen]);

    return (
        <nav
            aria-label="Primary navigation"
            className={cn(
                'relative z-50 px-3 py-2 transition duration-300 sm:px-4',
                (isScrolled || isMobileOpen) &&
                    'bg-[#07111d]/92 shadow-[0_10px_30px_rgba(0,0,0,0.42)] backdrop-blur-md',
            )}
        >
            <div className="relative z-50 mx-auto flex max-w-[1840px] items-center justify-between gap-2 sm:gap-4">
                <div className="flex min-w-0 items-center gap-4 lg:gap-9">
                    <Link
                        className="group relative flex size-14 shrink-0 items-center sm:size-16 md:size-20 lg:size-24"
                        href="/"
                        aria-label="Dragona Dominion home"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <img
                            src="/storage/Assets/Logo_nav2.png"
                            alt="Dragona Dominion"
                            className="object-contain object-center drop-shadow-[0_0_14px_rgba(34,211,238,0.48)] transition duration-300 group-hover:scale-105 group-hover:opacity-0 group-focus-visible:opacity-0"
                        />
                        <img
                            src="/storage/Assets/Logo_hover.png"
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute size-14 rounded-2xl object-contain object-center opacity-0 drop-shadow-[0_0_18px_rgba(34,211,238,0.85)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100 sm:size-16 md:size-20 lg:size-24"
                        />
                    </Link>
                    <div className="hidden flex-wrap items-center gap-4 md:flex lg:gap-7">
                        <SiteMenu items={mainItems} />
                    </div>
                </div>
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    <SiteMenu items={authItems} variant="auth" />
                    <Link
                        aria-label="Search the website"
                        className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 transition hover:border-cyan-100/70 hover:text-cyan-100 hover:drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]"
                        href="/search"
                        title="Search the website"
                    >
                        <Search className="size-5" />
                    </Link>
                    <Link
                        className="download-rank-button group relative hidden h-14 items-center justify-center overflow-hidden border-2 border-cyan-100/45 bg-[linear-gradient(135deg,rgba(14,116,144,0.22),rgba(255,255,255,0.08),rgba(8,47,73,0.28))] px-5 text-sm font-black tracking-[0.16em] text-white uppercase shadow-[0_0_22px_rgba(34,211,238,0.16)] backdrop-blur-[4px] transition hover:border-cyan-200 hover:bg-cyan-200/10 hover:text-cyan-100 hover:drop-shadow-[0_0_12px_rgba(103,232,249,0.55)] lg:inline-flex"
                        href="/download"
                    >
                        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.2)_45%,transparent_70%)] opacity-0 transition group-hover:opacity-100" />
                        <Download className="relative z-10 mr-1 size-4 text-white/85" />
                        <span className="relative z-10">Download</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2 md:hidden">
                    <Link
                        aria-label="Search the website"
                        className="inline-flex size-11 items-center justify-center border border-white/20 text-white/85 transition hover:border-cyan-100/70 hover:text-cyan-100"
                        href="/search"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <Search className="size-5" />
                    </Link>
                    <button
                        aria-controls="mobile-navigation"
                        aria-expanded={isMobileOpen}
                        aria-label={
                            isMobileOpen
                                ? 'Close navigation menu'
                                : 'Open navigation menu'
                        }
                        className="inline-flex size-11 items-center justify-center border border-cyan-100/40 bg-cyan-300/5 text-white transition hover:border-cyan-100 hover:bg-cyan-200/10"
                        onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
                        type="button"
                    >
                        {isMobileOpen ? (
                            <X className="size-6" />
                        ) : (
                            <MenuIcon className="size-6" />
                        )}
                    </button>
                </div>
            </div>

            <div
                aria-hidden={!isMobileOpen}
                className={cn(
                    'absolute inset-x-0 top-full z-50 border-t border-white/10 bg-[#07111d]/98 shadow-[0_24px_50px_rgba(0,0,0,0.62)] backdrop-blur-xl transition duration-300 md:hidden',
                    isMobileOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-3 opacity-0',
                )}
                id="mobile-navigation"
            >
                <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-4 py-5">
                    <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-cyan-200/70 uppercase">
                        Explore
                    </p>
                    <SiteMenu
                        items={mainItems}
                        layout="mobile"
                        onNavigate={() => setIsMobileOpen(false)}
                    />

                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-cyan-200/70 uppercase">
                        Account
                    </p>
                    <SiteMenu
                        items={authItems}
                        layout="mobile"
                        onNavigate={() => setIsMobileOpen(false)}
                        variant="auth"
                    />

                    <Link
                        className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 border border-cyan-100/45 bg-cyan-300/10 px-4 text-xs font-black tracking-[0.18em] text-white uppercase transition hover:border-cyan-100 hover:bg-cyan-200/15"
                        href="/download"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <Download className="size-4" /> Download game
                    </Link>
                </div>
            </div>

            {isMobileOpen && (
                <button
                    aria-label="Close navigation menu"
                    className="fixed inset-0 top-[4.5rem] z-40 bg-black/65 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                    type="button"
                />
            )}
        </nav>
    );
}
