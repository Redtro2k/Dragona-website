import { Form, Head, Link } from '@inertiajs/react';
import {
    AuthField,
    AuthHeading,
    AuthSubmit,
} from '@/components/dragona/auth-form';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    return (
        <>
            <Head title="Reset password" />
            <AuthHeading title="A fresh beginning">
                Choose a new password to regain access to your account.
            </AuthHeading>
            <Form
                action="/reset-password"
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="token" value={token} />
                        <AuthField
                            label="Email address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            defaultValue={email}
                            required
                            error={errors.email}
                        />
                        <AuthField
                            label="New password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={12}
                            required
                            autoFocus
                            error={errors.password}
                        />
                        <p className="-mt-2 font-[Arial,sans-serif] text-xs text-slate-400">
                            Use at least 12 characters, including letters and
                            numbers.
                        </p>
                        <AuthField
                            label="Confirm new password"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            required
                            error={errors.password_confirmation}
                        />
                        {errors.token && (
                            <p role="alert" className="text-sm text-rose-300">
                                {errors.token}
                            </p>
                        )}
                        <AuthSubmit processing={processing}>
                            Reset password
                        </AuthSubmit>
                    </>
                )}
            </Form>
            <p className="mt-7 text-center font-[Arial,sans-serif] text-sm">
                <Link
                    href="/forgot-password"
                    className="text-cyan-200 hover:underline"
                >
                    Need a new reset link?
                </Link>
            </p>
        </>
    );
}
