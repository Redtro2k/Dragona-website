<?php

use Inertia\Testing\AssertableInertia as Assert;

test('unknown pages render the themed 404 with an actual 404 status', function () {
    $this->get('/this-page-does-not-exist')->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page->component('errors/not-found'));
});

test('missing posts render the same 404 page', function () {
    $this->get('/posts/missing-post')->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page->component('errors/not-found'));
});

test('inertia navigation receives an inertia 404 instead of a debug modal', function () {
    $this->get('/missing-inertia-page', ['X-Inertia' => 'true', 'X-Requested-With' => 'XMLHttpRequest'])
        ->assertNotFound()->assertHeader('X-Inertia', 'true')
        ->assertJsonPath('component', 'errors/not-found');
});

test('API and JSON missing requests retain JSON responses', function () {
    $this->getJson('/api/missing')->assertNotFound()->assertJsonStructure(['message'])->assertJsonMissingPath('component');
    $this->getJson('/missing-json-page')->assertNotFound()->assertJsonStructure(['message'])->assertJsonMissingPath('component');
});
