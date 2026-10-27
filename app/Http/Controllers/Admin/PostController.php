<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SavePostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'category' => ['nullable', 'in:announcement,patch-announcement,notice,events'],
            'status' => ['nullable', 'in:draft,published'],
            'search' => ['nullable', 'string', 'max:100'],
        ]);
        $query = Post::query()->latest('updated_at');
        if (! empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['search'])) {
            $query->where('title', 'like', '%'.$filters['search'].'%');
        }

        return Inertia::render('admin/posts/index', [
            'posts' => $query->paginate(12)->withQueryString()->through(fn (Post $post) => $post->card()),
            'filters' => $filters,
            'counts' => [
                'total' => Post::count(),
                'published' => Post::published()->count(),
                'draft' => Post::where('status', 'draft')->count(),
            ],
            'status' => $request->session()->get('status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/editor', ['post' => null]);
    }

    public function store(SavePostRequest $request): RedirectResponse
    {
        $post = new Post;
        $post->author_id = $request->user()->id;
        $post->slug = (Str::slug($request->string('title')->toString()) ?: 'post').'-'.Str::lower(Str::random(8));
        $this->save($request, $post);

        return redirect()->route('admin.posts.index')->with('status', $post->status === 'published' ? 'Post published to the website.' : 'Draft saved. Only superadmins can see it.');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('admin/posts/editor', [
            'post' => [...$post->card(), 'body' => $post->body, 'has_cover' => (bool) $post->cover_path],
        ]);
    }

    public function update(SavePostRequest $request, Post $post): RedirectResponse
    {
        $this->save($request, $post);

        return redirect()->route('admin.posts.index')->with('status', $post->status === 'published' ? 'Published post updated.' : 'Draft saved. This post is hidden from the public website.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $cover = $post->cover_path;
        $post->delete();
        if ($cover) {
            Storage::disk('public')->delete($cover);
        }

        return redirect()->route('admin.posts.index')->with('status', 'Post deleted.');
    }

    private function save(SavePostRequest $request, Post $post): void
    {
        $previousCover = $post->cover_path;
        $post->fill($request->safe()->only(['title', 'category', 'excerpt', 'body', 'status']));
        if ($request->boolean('remove_cover')) {
            $post->cover_path = null;
        }
        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('posts', 'public');
            if ($path === false) {
                throw ValidationException::withMessages(['cover' => 'The image could not be stored. Please try again.']);
            }
            $post->cover_path = $path;
        }
        $post->published_at = $post->status === 'published' ? ($post->published_at ?? now()) : null;
        $post->save();
        if ($previousCover && $previousCover !== $post->cover_path) {
            Storage::disk('public')->delete($previousCover);
        }
    }
}
