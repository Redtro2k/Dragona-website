import { Head, Link } from '@inertiajs/react';
import {
    CalendarDays,
    CircleCheckBig,
    Download,
    Gamepad2,
    History,
    LogOut,
    Mail,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import { dashboard } from '@/routes';

type AccountSummary = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    status: string;
    memberSince: string | null;
    lastLogin: string | null;
    lastLogout: string | null;
    loginCount: number;
    recentWorld: number;
};

const fallback = 'Not available';

export default function Dashboard({ account }: { account: AccountSummary }) {
    const cards = [
        ['Account status', account.status, ShieldCheck],
        [
            'Email status',
            account.emailVerified ? 'Verified' : 'Pending',
            CircleCheckBig,
        ],
        ['Realm logins', account.loginCount.toLocaleString(), History],
    ] as const;

    return (
        <>
            <Head title="My Account" />
            <section
                className="relative min-h-screen overflow-hidden bg-[#050b12] px-4 pt-28 pb-20 text-white sm:px-6 sm:pt-36"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(5,11,18,.76),rgba(5,11,18,.94)), url('/storage/Assets/BackgroundContent.jpg')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,.16),transparent_42%)]" />
                <div className="relative mx-auto max-w-6xl">
                    <div className="border border-cyan-100/20 bg-[#07111d]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,.5)] backdrop-blur-md sm:p-9">
                        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                            <div>
                                <p className="text-xs font-black tracking-[0.22em] text-cyan-200 uppercase">
                                    Dragona Dominion Account
                                </p>
                                <h1 className="mt-4 text-3xl font-black tracking-[0.08em] uppercase sm:text-5xl">
                                    Welcome, {account.name}
                                </h1>
                                <p className="mt-4 max-w-2xl font-[Arial,sans-serif] text-sm leading-7 text-slate-300 sm:text-base">
                                    Review your realm identity and latest
                                    account activity.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-cyan-100/45 bg-cyan-300/10 px-5 text-xs font-black tracking-[0.16em] uppercase transition hover:border-cyan-100 hover:bg-cyan-200/15"
                                    href="/download"
                                >
                                    <Download className="size-4" /> Download
                                </Link>
                                <Link
                                    as="button"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-black/25 px-5 text-xs font-black tracking-[0.16em] uppercase transition hover:border-white/50 hover:bg-white/10"
                                    href="/logout"
                                    method="post"
                                >
                                    <LogOut className="size-4" /> Logout
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map(([label, value, Icon]) => (
                            <article
                                className="border border-white/12 bg-black/55 p-5 backdrop-blur-sm"
                                key={label}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-[11px] font-black tracking-[0.18em] text-white/55 uppercase">
                                        {label}
                                    </p>
                                    <Icon className="size-5 text-cyan-200" />
                                </div>
                                <p className="mt-5 text-2xl font-black text-white">
                                    {value}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
                        <section className="border border-white/12 bg-black/55 p-6 backdrop-blur-sm sm:p-8">
                            <h2 className="text-xl font-black tracking-[0.12em] uppercase sm:text-2xl">
                                Account details
                            </h2>
                            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                <Detail
                                    icon={UserRound}
                                    label="Account name"
                                    value={account.name}
                                />
                                <Detail
                                    icon={Mail}
                                    label="Email address"
                                    value={account.email || fallback}
                                />
                                <Detail
                                    icon={CalendarDays}
                                    label="Member since"
                                    value={account.memberSince || fallback}
                                />
                                <Detail
                                    icon={Gamepad2}
                                    label="Account ID"
                                    value={account.id}
                                />
                                <Detail
                                    icon={History}
                                    label="Last login"
                                    value={account.lastLogin || fallback}
                                />
                                <Detail
                                    icon={History}
                                    label="Last logout"
                                    value={account.lastLogout || fallback}
                                />
                            </div>
                        </section>

                        <aside className="border border-cyan-100/20 bg-[#07111d]/88 p-6 sm:p-8">
                            <ShieldCheck className="size-9 text-cyan-200" />
                            <h2 className="mt-5 text-xl font-black tracking-[0.1em] uppercase">
                                Realm access
                            </h2>
                            <p className="mt-4 font-[Arial,sans-serif] text-sm leading-7 text-slate-300">
                                Your website account and game account use the
                                same Dragona identity.
                            </p>
                            <p className="mt-4 font-[Arial,sans-serif] text-xs text-slate-400">
                                Recent world: {account.recentWorld || 'None'}
                            </p>
                            <Link
                                className="mt-7 inline-flex min-h-12 w-full items-center justify-center border border-cyan-100/40 bg-cyan-300/10 px-4 text-xs font-black tracking-[0.16em] uppercase transition hover:border-cyan-100 hover:bg-cyan-200/15"
                                href="/"
                            >
                                Return to the realm
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}

function Detail({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof UserRound;
    label: string;
    value: string;
}) {
    return (
        <div className="min-w-0 border border-white/10 bg-white/[.035] p-4">
            <div className="flex items-center gap-2 text-cyan-200">
                <Icon className="size-4 shrink-0" />
                <span className="text-[10px] font-black tracking-[0.18em] uppercase">
                    {label}
                </span>
            </div>
            <p className="mt-3 overflow-hidden font-[Arial,sans-serif] text-sm font-bold break-all text-white/90">
                {value}
            </p>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'My Account',
            href: dashboard(),
        },
    ],
};
