import { Link, usePage } from '@inertiajs/react';
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
    layout = 'desktop',
    onNavigate,
}: {
    items: MenuItem[];
    variant?: 'main' | 'auth';
    layout?: 'desktop' | 'mobile';
    onNavigate?: () => void;
}) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { url: currentUrl } = usePage();
    const itemClassName = cn(
        'group relative inline-flex min-h-12 items-center gap-2 px-3 text-base font-black tracking-[0.18em] text-slate-100 uppercase transition duration-200 sm:px-4',
        'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.9),rgba(255,255,255,0))] after:transition after:duration-200',
        'hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] hover:after:scale-x-100',
        'focus-visible:outline-none focus-visible:after:scale-x-100',
        layout === 'mobile'
            ? 'w-full justify-between border border-white/10 bg-white/[0.035] px-4 py-3 text-left after:inset-x-4'
            : 'h-14 justify-center',
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
        <div
            className={cn(
                layout === 'mobile' ? 'flex w-full flex-col gap-2' : 'contents',
            )}
            ref={menuRef}
        >
            {items.map((item) => {
                const isActive =
                    isHrefActive(item.href) ||
                    item.children?.some((child) => isHrefActive(child.href));

                return item.children?.length ? (
                    <div
                        className={cn(
                            'relative',
                            layout === 'mobile' && 'w-full',
                        )}
                        key={item.label}
                    >
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
                            <span
                                className={cn(
                                    'relative z-10',
                                    layout === 'mobile' && 'mr-auto',
                                )}
                            >
                                {item.label}
                            </span>
                            <ChevronDown
                                className={`relative z-10 size-4 text-white/90 transition ${
                                    openMenu === item.label ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        <div
                            className={cn(
                                'z-50 border border-white/25 bg-slate-800/95 p-2 text-slate-100 shadow-[0_18px_36px_rgba(0,0,0,0.6)] backdrop-blur-md transition',
                                layout === 'mobile'
                                    ? 'mt-1 grid w-full overflow-hidden'
                                    : 'absolute top-full left-0 min-w-56',
                                openMenu === item.label
                                    ? layout === 'mobile'
                                        ? 'visible grid-rows-[1fr] opacity-100'
                                        : 'visible translate-y-0 opacity-100'
                                    : layout === 'mobile'
                                      ? 'invisible grid-rows-[0fr] border-y-0 py-0 opacity-0'
                                      : 'invisible -translate-y-1 opacity-0',
                            )}
                        >
                            <div className="min-h-0">
                                {item.children.map((child) => {
                                    const isChildActive = isHrefActive(
                                        child.href,
                                    );

                                    return (
                                        <Link
                                            className={cn(
                                                'flex min-h-11 items-center gap-3 px-3 py-2 text-sm font-bold tracking-[0.14em] text-slate-100 uppercase transition hover:bg-white/12 hover:text-white',
                                                isChildActive &&
                                                    'bg-white/12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]',
                                            )}
                                            href={child.href}
                                            key={child.label}
                                            onClick={() => {
                                                setOpenMenu(null);
                                                onNavigate?.();
                                            }}
                                        >
                                            {child.image ? (
                                                <img
                                                    src={child.image}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className="size-6 object-contain"
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
                        onClick={onNavigate}
                    >
                        {item.icon && (
                            <item.icon
                                aria-hidden="true"
                                className="relative z-10 size-4 text-white/85"
                            />
                        )}
                        <span
                            className={cn(
                                'relative z-10',
                                layout === 'mobile' && 'mr-auto',
                            )}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
