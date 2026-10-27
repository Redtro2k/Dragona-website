<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AuthenticationServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('login', fn (Request $request) => Limit::perMinute(5)->by(
            strtolower((string) $request->input('email')).'|'.$request->ip(),
        ));

        ResetPassword::toMailUsing(function (User $user, string $token): MailMessage {
            return (new MailMessage)
                ->subject('Reset your Dragona Dominion password')
                ->view('mail.reset-password', [
                    'name' => $user->name,
                    'url' => rtrim(config('app.url'), '/').route('password.reset', [
                        'token' => $token,
                        'email' => $user->getEmailForPasswordReset(),
                    ], false),
                    'minutes' => config('auth.passwords.users.expire'),
                ]);
        });
    }
}
