import { AlertCircle, ChevronDown } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const controlStyle =
    'w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 font-[Arial,sans-serif] text-sm leading-6 text-slate-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.18)] outline-none transition duration-200 placeholder:text-slate-500 hover:border-slate-500/80 focus:border-cyan-400/70 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-400/60 aria-invalid:focus:ring-rose-400/10';

export function FormField({
    id,
    label,
    hint,
    error,
    counter,
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    counter?: string;
    children: ReactNode;
}) {
    return (
        <div className="min-w-0 space-y-2.5 font-[Arial,sans-serif]">
            <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor={id}
                    className="text-sm font-semibold text-slate-200"
                >
                    {label}
                </label>
                {counter && (
                    <span className="shrink-0 text-[11px] text-slate-500 tabular-nums">
                        {counter}
                    </span>
                )}
            </div>
            {children}
            {hint && (
                <p
                    id={id + '-hint'}
                    className="text-xs leading-5 text-slate-400"
                >
                    {hint}
                </p>
            )}
            {error && (
                <p
                    id={id + '-error'}
                    role="alert"
                    className="flex items-start gap-1.5 text-xs leading-5 text-rose-300"
                >
                    <AlertCircle
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0"
                    />
                    {error}
                </p>
            )}
        </div>
    );
}
export function TextInput({ className, ...props }: ComponentProps<'input'>) {
    return <input {...props} className={cn(controlStyle, className)} />;
}
export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
    return (
        <textarea
            {...props}
            className={cn(controlStyle, 'min-h-32 resize-y', className)}
        />
    );
}
export function SelectInput({
    className,
    children,
    ...props
}: ComponentProps<'select'>) {
    return (
        <div className="relative min-w-0">
            <select
                {...props}
                className={cn(
                    controlStyle,
                    'appearance-none pr-10 [&>option]:bg-slate-900',
                    className,
                )}
            >
                {children}
            </select>
            <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-400"
            />
        </div>
    );
}
