<?php

namespace App\Http\Middleware;

use App\Models\GameAccount;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateDragonaSession
{
    public function handle(Request $request, Closure $next): Response
    {
        $accountId = $request->session()->get('auth.game_account_id');

        if ($accountId !== null) {
            $account = GameAccount::query()->find((int) $accountId);

            if ($account !== null && (int) $account->getRawOriginal('Status') === 0) {
                Auth::setUser($account);
            } else {
                $request->session()->forget('auth.game_account_id');
            }
        }

        return $next($request);
    }
}
