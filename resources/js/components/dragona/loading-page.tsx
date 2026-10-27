import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const minimumLoadingTime = 500;

export default function LoadingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const startedAt = useRef(0);
    const timeoutId = useRef<number | null>(null);

    useEffect(() => {
        const clearLoadingTimeout = () => {
            if (timeoutId.current) {
                window.clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }
        };

        const showLoading = () => {
            clearLoadingTimeout();
            startedAt.current = performance.now();
            setIsLoading(true);
        };

        const hideLoading = () => {
            const elapsed = performance.now() - startedAt.current;
            const remaining = Math.max(minimumLoadingTime - elapsed, 0);

            clearLoadingTimeout();
            timeoutId.current = window.setTimeout(() => {
                setIsLoading(false);
            }, remaining);
        };

        const removeStartListener = router.on('start', showLoading);
        const removeFinishListener = router.on('finish', hideLoading);

        return () => {
            clearLoadingTimeout();
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black text-white">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.82),rgba(0,0,0,0.96))]" />
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
                <img
                    alt="Dragona Dominion"
                    className="h-36 w-72 object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.42)]"
                    src="/storage/Assets/DragonaLogoD.png"
                />
                <div className="mt-4 h-px w-56 overflow-hidden bg-white/12">
                    <div className="dragona-loading-bar h-full w-1/2 bg-gradient-to-r from-transparent via-orange-100 to-cyan-100" />
                </div>
                <p className="mt-5 text-xs font-black tracking-[0.28em] text-orange-100 uppercase">
                    Loading Realm
                </p>
            </div>
        </div>
    );
}
