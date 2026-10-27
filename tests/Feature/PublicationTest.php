<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

function publicationAdmin(): User
{
    $user = User::factory()->create();
    $user->forceFill(['role' => 'superadmin'])->save();

    return $user;
}

function publicationData(string $category = 'announcement', string $status = 'draft'): array
{
    return ['title' => 'A new chapter', 'category' => $category, 'excerpt' => 'News for the realm.', 'body' => "## Update\n\nWelcome **warriors**.", 'status' => $status];
}

test('guests and ordinary users cannot manage posts', function () {
    $this->get('/admin/posts')->assertRedirect('/login');
    $this->post('/admin/posts', publicationData())->assertRedirect('/login');
    $this->actingAs(User::factory()->create());
    $this->get('/admin/posts')->assertForbidden();
    $this->get('/admin/posts/create')->assertForbidden();
    $this->post('/admin/posts', publicationData())->assertForbidden();
    expect(Post::count())->toBe(0);
});

test('superadmin dashboard redirects to publishing', function () {
    $this->actingAs(publicationAdmin())->get('/dashboard')->assertRedirect('/admin/posts');
    $this->get('/admin/posts')->assertOk()->assertInertia(fn (Assert $page) => $page->component('admin/posts/index'));
    $this->get('/admin/posts/create')->assertOk();
});

test('all four publication categories appear on their page and landing page', function (string $category) {
    $this->actingAs(publicationAdmin())->post('/admin/posts', publicationData($category, 'published'))->assertSessionHasNoErrors()->assertRedirect('/admin/posts');
    $post = Post::firstOrFail();
    $this->get('/'.$category)->assertInertia(fn (Assert $page) => $page->has('posts.data', 1)->where('posts.data.0.title', $post->title));
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('latestPosts', 1)->where('latestPosts.0.slug', $post->slug));
    $this->get('/posts/'.$post->slug)->assertOk()->assertInertia(fn (Assert $page) => $page->where('post.body_html', fn ($html) => str_contains($html, '<strong>warriors</strong>')));
})->with(['announcement', 'patch-announcement', 'notice', 'events']);

test('drafts stay private and publishing then unpublishing updates public visibility', function () {
    $this->actingAs(publicationAdmin())->post('/admin/posts', publicationData());
    $post = Post::firstOrFail();
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('latestPosts', 0));
    $this->get('/announcement')->assertInertia(fn (Assert $page) => $page->has('posts.data', 0));
    $this->get('/posts/'.$post->slug)->assertNotFound();
    $this->put('/admin/posts/'.$post->id, publicationData('notice', 'published'))->assertSessionHasNoErrors();
    expect($post->fresh()->slug)->toBe($post->slug);
    $this->get('/posts/'.$post->slug)->assertOk();
    $this->get('/announcement')->assertInertia(fn (Assert $page) => $page->has('posts.data', 0));
    $this->put('/admin/posts/'.$post->id, publicationData('notice', 'draft'));
    $this->get('/posts/'.$post->slug)->assertNotFound();
    $this->get('/notice')->assertInertia(fn (Assert $page) => $page->has('posts.data', 0));
});

test('ordinary users cannot edit or delete any posts', function () {
    $this->actingAs(publicationAdmin())->post('/admin/posts', publicationData());
    $post = Post::firstOrFail();
    $this->actingAs(User::factory()->create());
    $this->get('/admin/posts/'.$post->id.'/edit')->assertForbidden();
    $this->put('/admin/posts/'.$post->id, publicationData('notice', 'published'))->assertForbidden();
    $this->delete('/admin/posts/'.$post->id)->assertForbidden();
    expect($post->fresh()->status)->toBe('draft');
});

test('post validation rejects invalid categories and empty content', function () {
    $this->actingAs(publicationAdmin())->post('/admin/posts', [...publicationData(), 'category' => 'admin', 'body' => '', 'title' => ''])->assertSessionHasErrors(['category', 'body', 'title']);
    expect(Post::count())->toBe(0);
});

test('post covers can be uploaded and removed', function () {
    Storage::fake('public');
    $this->actingAs(publicationAdmin())->post('/admin/posts', [...publicationData(), 'cover' => UploadedFile::fake()->image('cover.jpg')])->assertSessionHasNoErrors();
    $post = Post::firstOrFail();
    Storage::disk('public')->assertExists($post->cover_path);
    $this->post('/admin/posts/'.$post->id, [...publicationData(), '_method' => 'put', 'remove_cover' => true])->assertSessionHasNoErrors();
    expect($post->fresh()->cover_path)->toBeNull();
});

test('executable cover files and raw html are not published', function () {
    Storage::fake('public');
    $this->actingAs(publicationAdmin())->post('/admin/posts', [...publicationData(), 'cover' => UploadedFile::fake()->create('danger.svg', 1, 'image/svg+xml')])->assertSessionHasErrors('cover');
    $this->post('/admin/posts', [...publicationData('announcement', 'published'), 'body' => '<script>alert(1)</script>'."\n\n".'[bad](javascript:alert(1))']);
    $this->get('/posts/'.Post::firstOrFail()->slug)->assertInertia(fn (Assert $page) => $page->where('post.body_html', fn ($html) => ! str_contains($html, '<script') && ! str_contains($html, 'href="javascript:')));
});

test('superadmin can delete a post', function () {
    $this->actingAs(publicationAdmin())->post('/admin/posts', publicationData('events', 'published'));
    $post = Post::firstOrFail();
    $this->delete('/admin/posts/'.$post->id)->assertRedirect('/admin/posts');
    $this->get('/posts/'.$post->slug)->assertNotFound();
    expect(Post::count())->toBe(0);
});

test('registration cannot grant the superadmin role', function () {
    $this->post('/register', ['name' => 'Player', 'email' => 'player@example.com', 'password' => 'DragonRealm2026!', 'password_confirmation' => 'DragonRealm2026!', 'role' => 'superadmin'])->assertSessionHasNoErrors();
    expect(User::where('email', 'player@example.com')->firstOrFail()->role)->toBe('user');
});

test('superadmin command does not replace an existing password', function () {
    $user = User::factory()->create();
    $passwordHash = $user->password;
    $this->artisan('app:create-superadmin', ['email' => $user->email])->assertSuccessful();
    expect($user->fresh()->role)->toBe('superadmin');
    expect($user->fresh()->password)->toBe($passwordHash);
});
