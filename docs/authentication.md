# Dragona Dominion authentication

Login, registration, logout and password recovery are implemented in app/Http/Controllers/Auth and routes/auth.php. The forms are custom React/Inertia pages. Laravel's underlying session guard, hashing, CSRF middleware, notification mail transport and password broker provide the security primitives; no starter-kit controllers handle these routes.

Existing account-settings features (two-factor authentication, passkeys and email verification) remain compatible with the pre-existing Fortify integration. Confirmed two-factor accounts still require their challenge.

## Email delivery

Local configuration currently uses MAIL_MAILER=log, so password reset emails appear in storage/logs/laravel.log rather than being delivered. Configure the following in the private .env using your email provider's values:

    APP_URL=https://your-public-domain.example
    MAIL_MAILER=smtp
    MAIL_SCHEME=smtp
    MAIL_HOST=your-smtp-host
    MAIL_PORT=587
    MAIL_USERNAME=your-smtp-username
    MAIL_PASSWORD=your-smtp-password
    MAIL_FROM_ADDRESS=your-verified-sender@example.com
    MAIL_FROM_NAME="Dragona Dominion"

Use your provider's required scheme and port (smtps/465 for implicit TLS). Never commit credentials. Run php artisan config:clear after changing configuration. Reset links use APP_URL; set it to the address users can actually reach. Delivery is synchronous and does not require a queue worker.

Test with an account you control: request a link, open the email, reset the password, log in with the new password, and verify the old link cannot be reused. Links expire after 60 minutes; repeat requests for the same email are limited by the password broker. The response intentionally does not reveal whether an account exists.

## Verification

    php artisan test
    npm run types:check
    npm run build

