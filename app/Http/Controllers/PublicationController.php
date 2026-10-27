<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Dragona/welcome', [
            'latestPosts' => Post::published()->latest('published_at')->latest('id')->limit(6)->get()->map(fn (Post $post) => $post->card()),
        ]);
    }

    public function search(Request $request): Response
    {
        $query = trim((string) $request->string('q'));
        $staticPages = [
            ['title' => 'Home', 'type' => 'Page', 'description' => 'Welcome to Dragona Dominion, a legendary realm of dragons, magic, and war.', 'url' => route('home', absolute: false)],
            ['title' => 'Gunner', 'type' => 'Class', 'description' => 'A ranged specialist who uses precision weapons and explosive tactics to dominate fights.', 'url' => route('gunner', absolute: false)],
            ['title' => 'Assassin', 'type' => 'Class', 'description' => 'A deadly shadow fighter who punishes exposed targets with fast, decisive strikes.', 'url' => route('assassin', absolute: false)],
            ['title' => 'Sniper', 'type' => 'Class', 'description' => 'A patient marksman who finds perfect angles and ends battles before enemies can respond.', 'url' => route('sniper', absolute: false)],
            ['title' => 'Ranger', 'type' => 'Class', 'description' => 'A swift hunter who controls distance, strikes first, and slips away before danger closes in.', 'url' => route('ranger', absolute: false)],
            ['title' => 'Magician', 'type' => 'Class', 'description' => 'A master of ancient spells who bends elemental force into devastating battlefield power.', 'url' => route('magician', absolute: false)],
            ['title' => 'Shaman', 'type' => 'Class', 'description' => 'A spiritual caster who channels dragon rites to protect allies and weaken enemies.', 'url' => route('shaman', absolute: false)],
            ['title' => 'Scout', 'type' => 'Class', 'description' => 'A fast mid-range trapper who fights with shuriken, stealth, evasion, and nature-born agility.', 'url' => route('scout', absolute: false)],
            ['title' => 'Download', 'type' => 'Page', 'description' => 'Download the Dragona Dominion client and begin your journey.', 'url' => route('download', absolute: false)],
            ['title' => 'FAQ', 'type' => 'Support', 'description' => 'Find answers about your account, getting started, and the Dragona Dominion realm.', 'url' => route('faq', absolute: false)],
        ];

        $pageResults = collect($staticPages)
            ->filter(fn (array $page) => $query === '' || str_contains(mb_strtolower($page['title'].' '.$page['description']), mb_strtolower($query)))
            ->values();

        $postResults = $query === ''
            ? collect()
            : Post::published()
                ->where(function ($posts) use ($query) {
                    $term = '%'.$query.'%';
                    $posts->where('title', 'like', $term)
                        ->orWhere('excerpt', 'like', $term)
                        ->orWhere('body', 'like', $term);
                })
                ->latest('published_at')->latest('id')
                ->limit(20)
                ->get()
                ->map(fn (Post $post) => $post->card())
                ->values();

        return Inertia::render('Dragona/search', [
            'query' => $query,
            'pageResults' => $pageResults,
            'postResults' => $postResults,
        ]);
    }

    public function category(string $category): Response
    {
        abort_unless(array_key_exists($category, Post::CATEGORIES), 404);

        return Inertia::render('Dragona/'.$category, [
            'posts' => Post::published()->where('category', $category)->latest('published_at')->latest('id')
                ->paginate(9)->withQueryString()->through(fn (Post $post) => $post->card()),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Dragona/post', [
            'post' => [
                ...$post->card(),
                'body_html' => Str::markdown($post->body, ['html_input' => 'strip', 'allow_unsafe_links' => false]),
            ],
        ]);
    }
}
