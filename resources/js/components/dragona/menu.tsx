import { Link } from '@inertiajs/react';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export type MenuItem = {
    label: string;
    href?: string;
    method?: 'get' | 'post';
    icon?: LucideIcon;
    children?: {
        label: string;
        href: string;
        icon?: LucideIcon;
        image?: string;
    }[];
};

export default function Menu({
    items,
    variant = 'main',
}: {
    items: MenuItem[];
    variant?: 'main' | 'auth';
}) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [currentUrl, setCurrentUrl] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const itemClassName = cn(
        'group relative inline-flex h-14 items-center justify-center gap-1.5 px-3 text-base font-black tracking-[0.18em] text-slate-100 uppercase transition duration-200 sm:px-4',
        'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.9),rgba(255,255,255,0))] after:transition after:duration-200',
        'hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] hover:after:scale-x-100',
        'focus-visible:outline-none focus-visible:after:scale-x-100',
        variant === 'auth'
            ? 'text-xs text-slate-200/90 hover:text-white'
            : 'text-slate-100',
    );

    useEffect(() => {
        function closeMenu(event: MouseEvent) {
            if (!menuRef.current?.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        }

        document.addEventListener('mousedown', closeMenu);

        return () => document.removeEventListener('mousedown', closeMenu);
    }, []);

    useEffect(() => {
        function updateCurrentUrl() {
            setCurrentUrl(`${window.location.pathname}${window.location.hash}`);
        }

        updateCurrentUrl();
        window.addEventListener('hashchange', updateCurrentUrl);
        window.addEventListener('popstate', updateCurrentUrl);

        return () => {
            window.removeEventListener('hashchange', updateCurrentUrl);
            window.removeEventListener('popstate', updateCurrentUrl);
        };
    }, []);

    function isHrefActive(href?: string) {
        if (!href || href === '#') {
            return false;
        }

        if (href.startsWith('#')) {
            return currentUrl.endsWith(href);
        }

        return currentUrl === href || currentUrl.startsWith(`${href}#`);
    }

    return (
        <div className="contents" ref={menuRef}>
            {items.map((item) => {
                const isActive =
                    isHrefActive(item.href) ||
                    item.children?.some((child) => isHrefActive(child.href));

                return item.children?.length ? (
                    <div className="relative" key={item.label}>
                        <button
                            aria-expanded={openMenu === item.label}
                            onClick={() =>
                                setOpenMenu((currentMenu) =>
                                    currentMenu === item.label
                                        ? null
                                        : item.label,
                                )
                            }
                            type="button"
                            className={cn(
                                itemClassName,
                                'gap-1.5',
                                (openMenu === item.label || isActive) &&
                                    'text-white after:scale-x-100',
                            )}
                        >
                            {item.icon && (
                                <item.icon
                                    aria-hidden="true"
                                    className="relative z-10 size-4 text-white/85"
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                            <ChevronDown
                                className={`relative z-10 size-4 text-white/90 transition ${
                                    openMenu === item.label ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        <div
                            className={`absolute top-full left-0 z-50 min-w-56 border-2 border-white/45 bg-slate-700/70 p-2 text-slate-100 shadow-[0_18px_36px_rgba(0,0,0,0.6)] backdrop-blur-md transition ${
                                openMenu === item.label
                                    ? 'visible translate-y-0 opacity-100'
                                    : 'invisible -translate-y-1 opacity-0'
                            }`}
                        >
                            {item.children.map((child) => {
                                const isChildActive = isHrefActive(child.href);

                                return (
                                    <Link
                                        className={cn(
                                            'flex items-center gap-2 px-2 py-1.5 text-sm font-bold tracking-[0.14em] text-slate-100 uppercase transition hover:bg-white/12 hover:text-white',
                                            isChildActive &&
                                                'bg-white/12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]',
                                        )}
                                        href={child.href}
                                        key={child.label}
                                        onClick={() => setOpenMenu(null)}
                                    >
                                        {child.image ? (
                                            <img
                                                src={child.image}
                                                alt=""
                                                aria-hidden="true"
                                                className="size-5 object-contain"
                                            />
                                        ) : child.icon ? (
                                            <child.icon
                                                aria-hidden="true"
                                                className="size-4 text-white/75"
                                            />
                                        ) : null}
                                        {child.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <Link
                        className={cn(
                            itemClassName,
                            isActive && 'text-white after:scale-x-100',
                        )}
                        href={item.href ?? '#'}
                        method={item.method ?? 'get'}
                        as={item.method === 'post' ? 'button' : 'a'}
                        key={item.label}
                    >
                        {item.icon && (
                            <item.icon
                                aria-hidden="true"
                                className="relative z-10 size-4 text-white/85"
                            />
                        )}
                        <span className="relative z-10">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
