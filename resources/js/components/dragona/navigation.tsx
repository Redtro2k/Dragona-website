import { Link } from '@inertiajs/react';
import Menu, { type MenuItem } from '@/components/dragona/menu';
import { Download, Search } from 'lucide-react';
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

    useEffect(() => {
        const updateScrolled = () => setIsScrolled(window.scrollY > 12);

        updateScrolled();
        window.addEventListener('scroll', updateScrolled, { passive: true });

        return () => window.removeEventListener('scroll', updateScrolled);
    }, []);

    return (
        <nav
            className={cn(
                'px-4 py-2 transition duration-300',
                isScrolled &&
                'bg-[#07111d]/58 shadow-[0_10px_30px_rgba(0,0,0,0.36)] backdrop-blur-[3px]',
            )}
        >
            <div className="mx-auto flex max-w-[1840px] flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4">
                <div className="flex min-w-0 items-center gap-4 lg:gap-9">
                    <Link
                        className="group relative flex h-16 w-16 shrink-0 items-center sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                        href="/"
                        aria-label="Dragona Dominion home"
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
                            className="pointer-events-none absolute h-16 w-16 rounded-2xl object-contain object-center opacity-0 drop-shadow-[0_0_18px_rgba(34,211,238,0.85)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                        />
                    </Link>
                    <div className="hidden flex-wrap items-center gap-4 md:flex lg:gap-7">
                        <Menu items={mainItems} />
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <Menu items={authItems} variant="auth" />
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
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:hidden">
                <Menu items={mainItems} />
            </div>
        </nav>
    );
}
