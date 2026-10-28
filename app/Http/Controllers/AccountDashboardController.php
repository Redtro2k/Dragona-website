<?php

namespace App\Http\Controllers;

use App\Models\GameAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountDashboardController extends Controller
{
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $account = $request->user();

        if ($account?->role === 'superadmin') {
            return redirect()->route('admin.posts.index');
        }

        abort_unless($account instanceof GameAccount, 403);

        return Inertia::render('dashboard', [
            'account' => [
                'id' => (string) $account->getRawOriginal('ObjectId'),
                'name' => $account->name,
                'email' => $account->email,
                'emailVerified' => $account->getAttribute('EmailVerifiedAt') !== null,
                'status' => (int) $account->getRawOriginal('Status') === 0 ? 'Active' : 'Restricted',
                'memberSince' => $account->getAttribute('RegDate')?->format('F j, Y'),
                'lastLogin' => $account->getAttribute('LastLogin')?->format('F j, Y, g:i A'),
                'lastLogout' => $account->getAttribute('LastLogout')?->format('F j, Y, g:i A'),
                'loginCount' => (int) $account->getRawOriginal('ConnectCount'),
                'recentWorld' => (int) $account->getRawOriginal('RecentWorld'),
            ],
        ]);
    }
}
