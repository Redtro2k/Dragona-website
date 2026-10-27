<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SavePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'superadmin';
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(array_keys(Post::CATEGORIES))],
            'excerpt' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string', 'max:100000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096', 'dimensions:max_width=6000,max_height=6000'],
            'remove_cover' => ['sometimes', 'boolean'],
        ];
    }
}
