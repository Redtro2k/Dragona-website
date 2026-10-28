<?php

use App\Models\GameAccount;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $account = new GameAccount;
    $account->setRawAttributes([
        'ObjectId' => '1001010000000000999',
        'IdName' => 'DragonRider',
        'Email' => 'rider@example.com',
        'Status' => 0,
        'ConnectCount' => 12,
        'RecentWorld' => 1,
    ], true);
    $this->actingAs($account);

    $response = $this->get(route('dashboard'));
    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->where('account.id', '1001010000000000999')
        ->where('account.name', 'DragonRider')
        ->where('account.status', 'Active'));
});
