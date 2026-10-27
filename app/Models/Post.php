<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $author_id
 * @property string $title
 * @property string $slug
 * @property string $category
 * @property string $excerpt
 * @property string $body
 * @property string|null $cover_path
 * @property string $status
 * @property CarbonImmutable|null $published_at
 */
class Post extends Model
{
    public const CATEGORIES = [
        'announcement' => 'Announcement',
        'patch-announcement' => 'Patch Announcement',
        'notice' => 'Notice',
        'events' => 'Event',
    ];

    protected $fillable = ['title', 'category', 'excerpt', 'body', 'status'];

    protected function casts(): array
    {
        return ['published_at' => 'immutable_datetime'];
    }

    /** @param Builder<Post> $query */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', 'published')->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    /** @return array<string, mixed> */
    public function card(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'category_label' => self::CATEGORIES[$this->category],
            'excerpt' => $this->excerpt,
            'status' => $this->status,
            'published_at' => $this->published_at?->toIso8601String(),
            'date' => $this->published_at?->format('F j, Y'),
            'cover_url' => $this->cover_path ? '/storage/'.$this->cover_path : '/storage/Assets/Freatures/slide1.webp',
            'url' => route('posts.show', $this->slug, false),
        ];
    }
}
