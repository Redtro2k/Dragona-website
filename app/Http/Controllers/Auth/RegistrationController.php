<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Dragona\RegisterDragonaAccount;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/register', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(Request $request, RegisterDragonaAccount $register): RedirectResponse
    {
        $request->merge([
            'username' => is_string($request->username) ? trim($request->username) : $request->username,
            'email' => is_string($request->email) ? strtolower(trim($request->email)) : $request->email,
        ]);

        $data = $request->validate([
            'username' => ['required', 'string', 'min:4', 'max:20', 'alpha_num:ascii'],
            'email' => ['required', 'string', 'email', 'max:254'],
            'password' => ['required', 'string', 'confirmed', 'max:12', Password::min(8)->letters()->numbers()],
        ]);

        $register->handle($data['username'], $data['email'], $data['password']);

        return redirect()
            ->route('register')
            ->with('status', 'Account created successfully.');
    }
}
