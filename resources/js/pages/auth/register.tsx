import { Form, Head, Link } from '@inertiajs/react';
import {
    AuthField,
    AuthHeading,
    AuthSubmit,
} from '@/components/dragona/auth-form';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <AuthHeading title="Forge your legacy">
                Create your Dragona Dominion account and begin your journey.
            </AuthHeading>
            <Form
                action="/register"
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <AuthField
                            label="Display name"
                            name="name"
                            autoComplete="nickname"
                            maxLength={255}
                            required
                            autoFocus
                            error={errors.name}
                        />
                        <AuthField
                            label="Email address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={255}
                            required
                            error={errors.email}
                        />
                        <AuthField
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={12}
                            required
                            error={errors.password}
                        />
                        <p className="-mt-2 font-[Arial,sans-serif] text-xs text-slate-400">
                            Use at least 12 characters, including letters and
                            numbers.
                        </p>
                        <AuthField
                            label="Confirm password"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
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
