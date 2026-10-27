import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronRight,
    Crown,
    ExternalLink,
    Feather,
    LayoutDashboard,
    LogOut,
    Megaphone,
    ScrollText,
    Shield,
    Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';
const channels = [
    { key: 'announcement', title: 'Announcements', icon: Megaphone },
    { key: 'patch-announcement', title: 'Patch notes', icon: ScrollText },
    { key: 'notice', title: 'Notices', icon: Bell },
    { key: 'events', title: 'Events', icon: Sparkles },
];
export default function AdminLayout({ children }: { children: ReactNode }) {
    const { url, props } = usePage<{
        auth: { user: { name: string } };
        filters?: { category?: string };
    }>();
    const creating = url.startsWith('/admin/posts/create');
    return (
        <div className="dominion-admin">
            <aside className="command-sidebar">
                <Link href="/" className="command-brand">
                    <img
                        src="/storage/Assets/DragonaLogoD.png"
                        alt="Dragona Dominion"
                    />
                    <span>COMMAND SANCTUM</span>
                </Link>
                <div className="command-rank">
                    <Crown size={19} />
                    <div>
                        <strong>SUPERADMIN</strong>
                        <span>Realm authority</span>
                    </div>
                    <span className="rank-diamond">◆</span>
                </div>
                <nav aria-label="Admin navigation" className="command-nav">
                    <p className="command-caption">COMMAND</p>
                    <Link
                        href="/admin/posts"
                        aria-current={
                            !creating &&
                            !props.filters?.category &&
                            !url.includes('/edit')
                                ? 'page'
                                : undefined
                        }
                    >
                        <LayoutDashboard size={17} /> Overview{' '}
                        <ChevronRight size={14} />
                    </Link>
                    <Link
                        href="/admin/posts/create"
                        aria-current={creating ? 'page' : undefined}
                    >
                        <Feather size={17} /> Create post{' '}
                        <ChevronRight size={14} />
                    </Link>
                    <p className="command-caption">PUBLICATION CHANNELS</p>
                    {channels.map((item) => (
                        <Link
                            key={item.key}
                            href={'/admin/posts?category=' + item.key}
                            aria-current={
                                props.filters?.category === item.key
                                    ? 'page'
                                    : undefined
                            }
                        >
                            <item.icon size={17} />
                            {item.title}
                            <ChevronRight size={14} />
                        </Link>
                    ))}
                    <p className="command-caption">REALM ACCESS</p>
                    <Link href="/settings/security">
                        <Shield size={17} /> Account security{' '}
                        <ChevronRight size={14} />
                    </Link>
                    <Link href="/">
                        <ExternalLink size={17} /> Visit website{' '}
                        <ChevronRight size={14} />
                    </Link>
                </nav>
                <div className="command-profile">
                    <span className="command-avatar">
                        {props.auth.user.name.slice(0, 1)}
                    </span>
                    <div>
                        <strong>{props.auth.user.name}</strong>
                        <span>Superadmin account</span>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        aria-label="Log out"
                    >
                        <LogOut size={17} />
                    </Link>
                </div>
            </aside>
            <div className="command-main">
                <header className="command-topbar">
                    <span>
                        <Shield size={14} /> DOMINION CONTROL
                    </span>
                    <span className="command-topbar-right">
                        YOUR REALM. YOUR WORD.{' '}
                        <span className="command-gem">◆</span>
                    </span>
                </header>
                {children}
                <footer className="command-footer">
                    <span>DRAGONA DOMINION</span>
                    <span>Where dragons rise, kingdoms fall.</span>
                </footer>
            </div>
        </div>
    );
}
