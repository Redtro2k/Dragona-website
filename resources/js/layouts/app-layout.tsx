import { usePage } from '@inertiajs/react';
import Footer from '@/components/dragona/footer';
import Navigation from '@/components/dragona/navigation';
import type { MenuItem } from '@/components/dragona/menu';
import {
    Bell,
    CircleHelp,
    Crosshair,
    Gamepad2,
    LogIn,
    Megaphone,
    ScrollText,
    ShieldQuestion,
    Sparkles,
    UserPlus,
} from 'lucide-react';

const mainMenuItems: MenuItem[] = [
    {
        label: 'Home',
        icon: Gamepad2,
        children: [
            {
                label: 'Announcement',
                href: '/announcement',
                icon: Megaphone,
            },
            {
                label: 'Patch Announcement',
                href: '/patch-announcement',
                icon: ScrollText,
            },
            {
                label: 'Notice',
                href: '/notice',
                icon: Bell,
            },
            {
                label: 'Events',
                href: '/events',
                icon: Sparkles,
            },
        ],
    },
    {
        label: 'Classes',
        icon: Crosshair,
        children: [
            {
                label: 'Gunner',
                href: '/gunner',
                image: '/storage/Assets/Class/gunner_logo.png',
            },
            {
                label: 'Assassin',
                href: '/assassin',
                image: '/storage/Assets/Class/assasin_logo.png',
            },
            {
                label: 'Sniper',
                href: '/sniper',
                image: '/storage/Assets/Class/sniper_logo.png',
            },
            {
                label: 'Ranger',
                href: '/ranger',
                image: '/storage/Assets/Class/rander_logo.png',
            },
            {
                label: 'Magician',
                href: '/magician',
                image: '/storage/Assets/Class/mage_logo.png',
            },
            {
                label: 'Shaman',
                href: '/shaman',
                image: '/storage/Assets/Class/shaman_logo.png',
            },
            {
                label: 'Scout',
                href: '/scout',
                image: '/storage/Assets/Class/scout_logo.png',
            },
        ],
    },
    {
        label: 'Support',
        icon: CircleHelp,
        children: [
            {
                label: 'FAQ',
                href: '/faq',
                icon: ShieldQuestion,
            },
        ],
    },
];

const authMenuItems: MenuItem[] = [
    {
        label: 'Login',
        href: '/login',
        icon: LogIn,
    },
    {
        label: 'Register',
        href: '/register',
        icon: UserPlus,
    },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<{
        auth: { user: { name: string; role: string } | null };
    }>().props;
    const accountItems: MenuItem[] = auth.user
        ? [
              {
                  label: auth.user.role === 'superadmin' ? 'Admin' : 'Account',
                  href: '/dashboard',
                  icon: LogIn,
              },
              { label: 'Logout', href: '/logout', method: 'post', icon: LogIn },
          ]
        : authMenuItems;
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">
                <Navigation
                    authItems={accountItems}
                    mainItems={mainMenuItems}
                />
            </header>
            <main className="relative z-10">{children}</main>
            <Footer />
        </>
    );
}
