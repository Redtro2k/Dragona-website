import { Link } from '@inertiajs/react';
import { ArrowLeft, Shield } from 'lucide-react';
import type { ReactNode } from 'react';

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
    title?: string;
    description?: string;
}) {
    return (
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#07111d] px-5 py-12 text-slate-100">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(90deg,rgba(7,17,29,.82),rgba(7,17,29,.7)),url('/storage/Assets/background1.jpg')",
                }}
            />
            <div className="relative grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
                <section className="text-center lg:text-left">
                    <Link href="/" aria-label="Dragona Dominion home">
                        <img
                            src="/storage/Assets/DragonaLogoD.png"
                            alt="Dragona Dominion"
                            className="mx-auto w-72 drop-shadow-[0_0_25px_rgba(34,211,238,.4)] sm:w-96 lg:-ml-8"
                        />
                    </Link>
                    <p className="mt-5 text-xs font-bold tracking-[.3em] text-cyan-200 uppercase">
                        The realm awaits
                    </p>
                    <h2 className="mt-5 text-3xl leading-relaxed font-black sm:text-4xl">
                        Your legend
                        <br />
                        begins here.
                    </h2>
                    <p className="mx-auto mt-5 max-w-sm font-[Arial,sans-serif] text-base leading-7 text-slate-300 lg:mx-0">
                        Return to the battlefield. Stand with your allies. Forge
                        your legacy in Dragona Dominion.
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest text-cyan-100 transition hover:text-white"
                    >
                        <ArrowLeft className="size-4" /> Back to the realm
                    </Link>
                </section>
                <section className="relative border border-cyan-200/30 bg-[#081523]/95 p-6 shadow-[0_0_70px_rgba(8,145,178,.16)] backdrop-blur-xl sm:p-10">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
                    />
                    <div className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[.25em] text-cyan-200 uppercase">
                        <Shield className="size-4" /> Dragona Dominion account
                    </div>
                    {children}
                </section>
            </div>
        </main>
    );
}
