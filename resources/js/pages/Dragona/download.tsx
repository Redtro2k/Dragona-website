import { Head } from '@inertiajs/react';
import {
    Download as DownloadIcon,
    ExternalLink,
    FileArchive,
    MessageCircleQuestion,
    Play,
    ShieldCheck,
} from 'lucide-react';

const installationSteps = [
    {
        title: 'Download the installer',
        description:
            'Click the download button and save the Dragona Dominion installer to your computer.',
        icon: FileArchive,
    },
    {
        title: 'Run setup',
        description:
            'Open the installer, choose your preferred folder, and wait for the game files to finish extracting.',
        icon: ShieldCheck,
    },
    {
        title: 'Launch the game',
        description:
            'Start Dragona Dominion from your desktop shortcut, log in, and begin your journey.',
        icon: Play,
    },
];

export default function Download() {
    return (
        <>
            <Head title="Download" />
            <section
                className="relative min-h-screen bg-black bg-cover bg-fixed bg-center px-6 pt-40 pb-24 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/58" />
                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <h1 className="text-3xl font-black tracking-[0.12em] uppercase sm:text-6xl">
                        Download
                    </h1>
                    <div className="mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                    <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-xl">
                        Prepare your client, gather your allies, and step into
                        the world of Dragona Dominion.
                    </p>
                    <span
                        aria-disabled="true"
                        className="relative mt-10 inline-flex h-16 cursor-not-allowed items-center justify-center gap-2 overflow-hidden border-2 border-white/20 bg-white/5 px-8 text-sm font-black tracking-[0.18em] text-white/45 uppercase"
                    >
                        <DownloadIcon className="relative z-10 size-5" />
                        <span className="relative z-10">
                            Client Coming Soon
                        </span>
                    </span>
                </div>

                <div className="relative z-10 mx-auto mt-20 max-w-5xl rounded-md border border-b-4 border-cyan-100/20 border-b-cyan-100/35 bg-[linear-gradient(135deg,rgba(14,116,144,0.22),rgba(15,23,42,0.68),rgba(8,47,73,0.18))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.38)] backdrop-blur-[5px] sm:p-8">
                    <h2 className="text-2xl font-black tracking-[0.12em] text-white uppercase">
                        Installation Guide
                    </h2>
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {installationSteps.map((step, index) => (
                            <article
                                className="rounded-md border border-b-4 border-cyan-100/20 border-b-cyan-100/35 bg-[linear-gradient(145deg,rgba(15,23,42,0.78),rgba(14,116,144,0.2))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_28px_rgba(0,0,0,0.22)] backdrop-blur-[4px]"
                                key={step.title}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex size-10 items-center justify-center border border-cyan-200/35 text-cyan-100">
                                        <step.icon className="size-5" />
                                    </span>
                                    <span className="text-xs font-black tracking-[0.18em] text-cyan-100/62 uppercase">
                                        Step {index + 1}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-black text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/72">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mx-auto mt-10 max-w-5xl overflow-hidden rounded-md border border-b-4 border-cyan-100/20 border-b-cyan-100/35 bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(2,6,23,0.76),rgba(15,23,42,0.58))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[6px] sm:p-8">
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/75 to-transparent" />
                    <div className="flex items-center gap-4">
                        <span className="flex size-12 items-center justify-center border border-cyan-100/30 bg-cyan-200/8 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                            <MessageCircleQuestion className="size-6" />
                        </span>
                        <h2 className="text-2xl font-black tracking-[0.08em] text-white uppercase">
                            Still stuck?
                        </h2>
                    </div>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                        If none of these fix it, contact support on Discord so
                        staff can look at your case directly.
                    </p>
                    <span
                        aria-disabled="true"
                        className="relative mt-6 inline-flex h-14 cursor-not-allowed items-center justify-center gap-2 overflow-hidden border border-white/20 bg-white/5 px-6 text-sm font-black tracking-[0.16em] text-white/45 uppercase"
                    >
                        <ExternalLink className="relative z-10 size-5" />
                        <span className="relative z-10">
                            Discord Coming Soon
                        </span>
                    </span>
                </div>
            </section>
        </>
    );
}
