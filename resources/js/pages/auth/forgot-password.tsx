import { Form, Head, Link } from '@inertiajs/react';
import {
    AuthField,
    AuthHeading,
    AuthStatus,
    AuthSubmit,
} from '@/components/dragona/auth-form';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />
            <AuthHeading title="Reclaim your account">
                Enter the email address linked to your account. We’ll email you
                a link to choose a new password.
            </AuthHeading>
            <AuthStatus status={status} />
            <Form action="/forgot-password" method="post" className="space-y-5">
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
                        <AuthSubmit processing={processing}>
                            Send reset link
                        </AuthSubmit>
                    </>
                )}
            </Form>
            <p className="mt-7 text-center font-[Arial,sans-serif] text-sm">
                <Link href="/login" className="text-cyan-200 hover:underline">
                    Back to login
                </Link>
            </p>
        </>
    );
}
