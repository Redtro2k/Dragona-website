import { Form, Head, Link } from '@inertiajs/react';
import {
    AuthField,
    AuthHeading,
    AuthStatus,
    AuthSubmit,
} from '@/components/dragona/auth-form';

export default function Login({ status }: { status?: string }) {
    return (
        <>
            <Head title="Login" />
            <AuthHeading title="Welcome back">
                Enter your account details and return to the realm.
            </AuthHeading>
            <AuthStatus status={status} />
            <Form
                action="/login"
                method="post"
                resetOnSuccess={['password']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <AuthField
                            label="Email address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={255}
                            required
                            autoFocus
                            error={errors.email}
                        />
                        <AuthField
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            error={errors.password}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-3 font-[Arial,sans-serif] text-sm">
                            <label className="flex items-center gap-2 text-slate-300">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    value="1"
                                    className="size-4 accent-cyan-400"
                                />{' '}
                                Remember me
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-cyan-200 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <AuthSubmit processing={processing}>
                            Enter the realm
                        </AuthSubmit>
                    </>
                )}
            </Form>
            <p className="mt-7 text-center font-[Arial,sans-serif] text-sm text-slate-400">
                New to Dragona?{' '}
                <Link
                    href="/register"
                    className="text-cyan-200 hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </>
    );
}
