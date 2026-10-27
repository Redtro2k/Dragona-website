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
                            label="Account name"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Your game account name"
                            maxLength={20}
                            required
                            autoFocus
                            error={errors.username}
                        />
                        <AuthField
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            maxLength={13}
                            required
                            error={errors.password}
                        />
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
