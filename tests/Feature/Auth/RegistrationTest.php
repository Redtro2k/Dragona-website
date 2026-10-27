<?php

use App\Actions\Dragona\RegisterDragonaAccount;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $this->mock(RegisterDragonaAccount::class, function ($mock) {
        $mock->shouldReceive('handle')
            ->once()
            ->with('TestUser', 'test@example.com', 'Dragon123')
            ->andReturn(1001010000000000001);
    });

    $response = $this->post(route('register.store'), [
        'username' => 'TestUser',
        'email' => 'test@example.com',
        'password' => 'Dragon123',
        'password_confirmation' => 'Dragon123',
    ]);

    $this->assertGuest();
    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas('status', 'Account created successfully.')
        ->assertRedirect(route('register', absolute: false));
});
