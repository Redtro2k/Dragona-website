<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Dragona\AuthenticateDragonaAccount;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', ['status' => $request->session()->get('status')]);
    }

    public function store(Request $request, AuthenticateDragonaAccount $authenticate): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string', 'max:20', 'regex:/^[A-Za-z0-9]+$/'],
            'password' => ['required', 'string', 'max:13'],
        ]);

        $account = $authenticate->handle(
            $credentials['username'],
            $credentials['password'],
            $request->ip(),
        );

        if ($account === null) {
            throw ValidationException::withMessages([
                'username' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();
        $request->session()->put('auth.game_account_id', $account->getKey());
        Auth::setUser($account);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->forget('auth.game_account_id');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
