<?php

use App\Actions\Dragona\RegisterDragonaAccount;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;

test('registration normalizes email before creating the game account', function () {
    $this->mock(RegisterDragonaAccount::class, function ($mock) {
        $mock->shouldReceive('handle')
            ->once()
            ->with('DragonRider', 'rider@example.com', 'Dragon123')
            ->andReturn(1001010000000000001);
    });

    $this->post('/register', [
        'username' => 'DragonRider',
        'email' => 'RIDER@example.com',
        'password' => 'Dragon123',
        'password_confirmation' => 'Dragon123',
    ])->assertSessionHasNoErrors()->assertRedirect('/register');

    $this->assertGuest();
});

test('registration rejects invalid account names and weak or mismatched passwords', function () {
    $this->mock(RegisterDragonaAccount::class, function ($mock) {
        $mock->shouldNotReceive('handle');
    });

    $this->post('/register', [
        'username' => 'bad name',
        'email' => 'rider@example.com',
        'password' => 'short',
        'password_confirmation' => 'different',
    ])->assertSessionHasErrors(['username', 'password']);
    $this->assertGuest();
});

test('unknown reset email has the same public response as a registered email', function () {
    Notification::fake();
    $user = User::factory()->create();
    $this->from('/forgot-password')->post('/forgot-password', ['email' => $user->email])->assertRedirect('/forgot-password');
    $status = session('status');
    $this->post('/forgot-password', ['email' => 'unknown@example.com'])->assertSessionHas('status', $status);
    Notification::assertSentTo($user, ResetPassword::class);
    Notification::assertCount(1);
});

test('reset tokens cannot be reused and old passwords stop working', function () {
    $user = User::factory()->create();
    $oldRemember = $user->remember_token;
    $token = Password::createToken($user);
    $data = ['token' => $token, 'email' => $user->email, 'password' => 'DragonRealm2026!', 'password_confirmation' => 'DragonRealm2026!'];
    $this->post('/reset-password', $data)->assertRedirect('/login')->assertSessionHasNoErrors();
    expect(Hash::check('DragonRealm2026!', $user->fresh()->password))->toBeTrue();
    expect($user->fresh()->remember_token)->not->toBe($oldRemember);
    $this->post('/reset-password', $data)->assertSessionHasErrors('email');
    $this->post('/login', ['email' => $user->email, 'password' => 'password'])->assertSessionHasErrors('email');
    $this->assertGuest();
    $this->post('/login', ['email' => $user->email, 'password' => 'DragonRealm2026!'])->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);
});

test('expired reset tokens cannot change passwords', function () {
    $user = User::factory()->create();
    $token = Password::createToken($user);
    $this->travel(61)->minutes();
    $this->post('/reset-password', [
        'token' => $token, 'email' => $user->email,
        'password' => 'DragonRealm2026!', 'password_confirmation' => 'DragonRealm2026!',
    ])->assertSessionHasErrors('email');
    expect(Hash::check('password', $user->fresh()->password))->toBeTrue();
});

test('reset email renders the branded message and configured origin', function () {
    config(['app.url' => 'https://dragona.example']);
    $user = User::factory()->create();
    $mail = (new ResetPassword('test-token'))->toMail($user);
    expect($mail->subject)->toBe('Reset your Dragona Dominion password');
    $html = view($mail->view, $mail->viewData)->render();
    expect($html)->toContain('DRAGONA DOMINION', 'https://dragona.example/reset-password/test-token', '60 minutes');
});

test('password recovery requests are rate limited', function () {
    Notification::fake();
    for ($i = 0; $i < 6; $i++) {
        $this->post('/forgot-password', ['email' => 'unknown@example.com'])->assertRedirect();
    }
    $this->post('/forgot-password', ['email' => 'unknown@example.com'])->assertTooManyRequests();
});

test('authenticated users cannot visit guest authentication pages', function () {
    $this->actingAs(User::factory()->create());
    foreach (['/login', '/register', '/forgot-password'] as $url) {
        $this->get($url)->assertRedirect();
    }
});
