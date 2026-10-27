export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-12">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
                <div>
                    <img
                        src="/storage/Assets/Logo2.png"
                        alt="Dragona Dominion"
                        className="h-28 w-64 object-contain object-left drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]"
                    />
                    <p className="mt-4 max-w-md text-sm leading-6 text-white/62">
                        Enter a realm shaped by dragon blood, ancient war, and
                        heroes brave enough to challenge the darkness.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-black tracking-[0.18em] text-white uppercase">
                        Home
                    </h3>
                    <div className="mt-4 space-y-3 text-sm text-white/58">
                        <a
                            className="block transition hover:text-white"
                            href="/announcement"
                        >
                            Announcement
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/patch-announcement"
                        >
                            Patch Announcement
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/events"
                        >
                            Events
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/#classes"
                        >
                            Classes
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/gunner"
                        >
                            Gunner
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/assassin"
                        >
                            Assassin
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/scout"
                        >
                            Scout
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-black tracking-[0.18em] text-white uppercase">
                        Support
                    </h3>
                    <div className="mt-4 space-y-3 text-sm text-white/58">
                        <a
                            className="block transition hover:text-white"
                            href="/faq"
                        >
                            FAQ
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/notice"
                        >
                            Notices
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/faq"
                        >
                            Help Center
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-black tracking-[0.18em] text-white uppercase">
                        Account
                    </h3>
                    <div className="mt-4 space-y-3 text-sm text-white/58">
                        <a
                            className="block transition hover:text-white"
                            href="/login"
                        >
                            Login
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/register"
                        >
                            Register
                        </a>
                        <a
                            className="block transition hover:text-white"
                            href="/download"
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs tracking-[0.12em] text-white/42 uppercase sm:flex-row sm:items-center sm:justify-between">
                <p>(c) 2026 Dragona Dominion. All rights reserved.</p>
                <p>Where dragons rise, kingdoms fall.</p>
            </div>
        </footer>
    );
}
