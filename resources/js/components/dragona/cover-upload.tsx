import { ImagePlus, Replace, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FormField } from './form-controls';

export default function CoverUpload({
    file,
    currentUrl,
    error,
    onChange,
}: {
    file: File | null;
    currentUrl?: string;
    error?: string;
    onChange: (file: File | null) => void;
}) {
    const [preview, setPreview] = useState<string>();
    const [fileError, setFileError] = useState<string>();
    const input = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    const image = preview ?? currentUrl;
    return (
        <FormField
            id="cover"
            label="Cover image"
            hint="JPG, PNG, or WebP · up to 4 MB"
            error={fileError ?? error}
        >
            <div className="group relative overflow-hidden rounded-xl border border-dashed border-slate-600/70 bg-slate-950/40 transition focus-within:border-cyan-400/70 focus-within:ring-4 focus-within:ring-cyan-400/10 hover:border-cyan-400/60">
                <input
                    ref={input}
                    id="cover"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    aria-describedby={
                        'cover-hint' +
                        (fileError || error ? ' cover-error' : '')
                    }
                    aria-invalid={!!(fileError || error)}
                    className="peer sr-only"
                    onChange={(e) => {
                        const next = e.target.files?.[0];
                        if (!next) return;
                        if (
                            !['image/jpeg', 'image/png', 'image/webp'].includes(
                                next.type,
                            ) ||
                            next.size > 4 * 1024 * 1024
                        ) {
                            setFileError(
                                'Choose a JPG, PNG, or WebP image no larger than 4 MB.',
                            );
                            e.target.value = '';
                            return;
                        }
                        setFileError(undefined);
                        onChange(next);
                    }}
                />
                <label
                    htmlFor="cover"
                    className="flex cursor-pointer flex-col items-center justify-center text-center"
                >
                    {image ? (
                        <>
                            <img
                                src={image}
                                alt="Cover preview"
                                className="aspect-video w-full object-cover"
                            />
                            <span className="flex w-full items-center justify-center gap-2 border-t border-white/5 bg-slate-900/70 px-4 py-3 text-xs text-cyan-200">
                                <Replace
                                    aria-hidden="true"
                                    className="size-3.5"
                                />{' '}
                                Replace image
                            </span>
                        </>
                    ) : (
                        <div className="px-4 py-8">
                            <span className="mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-200">
                                <ImagePlus
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </span>
                            <span className="block text-sm font-semibold text-slate-200">
                                Choose a cover image
                            </span>
                            <span className="mt-2 block text-xs text-slate-500">
                                Make your post stand out
                            </span>
                        </div>
                    )}
                </label>
            </div>
            {file && (
                <div className="flex min-w-0 items-center gap-2 rounded-lg bg-cyan-300/5 px-3 py-2">
                    <span className="min-w-0 flex-1 truncate text-xs text-cyan-100">
                        {file.name}
                    </span>
                    <button
                        type="button"
                        aria-label="Remove selected image"
                        onClick={() => {
                            onChange(null);
                            setFileError(undefined);
                            if (input.current) input.current.value = '';
                        }}
                        className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <X className="size-3.5" />
                    </button>
                </div>
            )}
        </FormField>
    );
}
