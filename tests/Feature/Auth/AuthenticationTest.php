<?php

use App\Actions\Dragona\AuthenticateDragonaAccount;
use App\Models\GameAccount;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

test('login screen can be rendered', function () {
    $response = $this->get(route('login'));

    $response->assertOk();
});

test('users can authenticate using the login screen', function () {
    $account = new GameAccount;
    $account->setRawAttributes([
        'ObjectId' => 1001010000000000999,
        'IdName' => 'DragonRider',
        'Email' => 'rider@example.com',
        'Status' => 0,
    ], true);

    $this->mock(AuthenticateDragonaAccount::class, function ($mock) use ($account) {
        $mock->shouldReceive('handle')
            ->once()
            ->with('DragonRider', 'Dragon123', '127.0.0.1')
            ->andReturn($account);
    });

    $response = $this->post(route('login.store'), [
        'username' => 'DragonRider',
        'password' => 'Dragon123',
    ]);

    $this->assertAuthenticated();
    $response->assertSessionHas('auth.game_account_id', 1001010000000000999);
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function () {
    $this->mock(AuthenticateDragonaAccount::class, function ($mock) {
        $mock->shouldReceive('handle')
            ->once()
            ->with('DragonRider', 'WrongPass', '127.0.0.1')
            ->andReturnNull();
    });

    $this->post(route('login.store'), [
        'username' => 'DragonRider',
        'password' => 'WrongPass',
    ])->assertSessionHasErrors('username');

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('home'));

    $this->assertGuest();
});

test('users are rate limited', function () {
    $this->mock(AuthenticateDragonaAccount::class, function ($mock) {
        $mock->shouldNotReceive('handle');
    });

    RateLimiter::increment(md5('login'.implode('|', ['dragonrider', '127.0.0.1'])), amount: 5);

    $response = $this->post(route('login.store'), [
        'username' => 'DragonRider',
        'password' => 'WrongPass',
    ]);

    $response->assertTooManyRequests();
});
