import { Form, Head, Link } from '@inertiajs/react';
import {
    AuthField,
    AuthHeading,
    AuthStatus,
    AuthSubmit,
} from '@/components/dragona/auth-form';

export default function Register({ status }: { status?: string }) {
    return (
        <>
            <Head title="Register" />
            <AuthHeading title="Forge your legacy">
                Create your Dragona Dominion account and begin your journey.
            </AuthHeading>
            <AuthStatus status={status} />
            <Form
                action="/register"
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <AuthField
                            label="Account name"
                            name="username"
                            autoComplete="username"
                            minLength={4}
                            maxLength={20}
                            required
                            autoFocus
                            error={errors.username}
                        />
                        <AuthField
                            label="Email address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={254}
                            required
                            error={errors.email}
                        />
                        <AuthField
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={12}
                            required
                            error={errors.password}
                        />
                        <p className="-mt-2 font-[Arial,sans-serif] text-xs text-slate-400">
                            Use 8 to 12 characters, including letters and
                            numbers. This is also your game password.
                        </p>
                        <AuthField
                            label="Confirm password"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            maxLength={12}
                            required
                            error={errors.password_confirmation}
                        />
                        <AuthSubmit processing={processing}>
                            Create account
                        </AuthSubmit>
                    </>
                )}
            </Form>
            <p className="mt-7 text-center font-[Arial,sans-serif] text-sm text-slate-400">
                Already a warrior?{' '}
                <Link href="/login" className="text-cyan-200 hover:underline">
                    Log in
                </Link>
            </p>
        </>
    );
}
