import { controlStyle } from '@/components/dragona/form-controls';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export function AuthHeading({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <header className="mb-7">
            <h1 className="text-2xl font-black text-white sm:text-3xl">
                {title}
            </h1>
            <p className="mt-3 font-[Arial,sans-serif] text-sm leading-6 text-slate-300">
                {children}
            </p>
        </header>
    );
}

export function AuthField({
    label,
    error,
    type = 'text',
    ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
    const [visible, setVisible] = useState(false);
    const id = props.id ?? props.name;
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-xs font-bold tracking-wide text-slate-200"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    {...props}
                    id={id}
                    type={type === 'password' && visible ? 'text' : type}
                    aria-invalid={!!error}
                    aria-describedby={error ? id + '-error' : undefined}
                    className={controlStyle + ' h-12 pr-12 text-base'}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setVisible(!visible)}
                        aria-label={visible ? 'Hide password' : 'Show password'}
                        aria-pressed={visible}
                        className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-cyan-200"
                    >
                        {visible ? (
                            <EyeOff className="size-4" />
                        ) : (
                            <Eye className="size-4" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p
                    id={id + '-error'}
                    role="alert"
                    className="mt-2 font-[Arial,sans-serif] text-sm text-rose-300"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export function AuthSubmit({
    processing,
    children,
}: {
    processing: boolean;
    children: ReactNode;
}) {
    return (
        <button
            disabled={processing}
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 border border-cyan-200/60 bg-gradient-to-r from-cyan-900 to-sky-950 px-4 py-3 text-xs font-black tracking-[.14em] text-white uppercase shadow-[0_0_20px_rgba(34,211,238,.12)] transition hover:border-cyan-200 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 disabled:cursor-wait disabled:opacity-60"
        >
            {processing && <LoaderCircle className="size-4 animate-spin" />}
            {children}
        </button>
    );
}

export function AuthStatus({ status }: { status?: string }) {
    return status ? (
        <div
            role="status"
            className="mb-5 border border-cyan-300/30 bg-cyan-300/10 p-4 font-[Arial,sans-serif] text-sm leading-6 text-cyan-100"
        >
            {status}
        </div>
    ) : null;
}
