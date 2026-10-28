<?php

use App\Http\Controllers\AccountDashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\PublicationController;
use App\Http\Middleware\EnsureSuperadmin;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicationController::class, 'home'])->name('home');
Route::get('/search', [PublicationController::class, 'search'])->name('search');
Route::inertia('/gunner', 'Dragona/gunner')->name('gunner');
Route::inertia('/assassin', 'Dragona/assassin')->name('assassin');
Route::inertia('/sniper', 'Dragona/sniper')->name('sniper');
Route::inertia('/shaman', 'Dragona/shaman')->name('shaman');
Route::inertia('/ranger', 'Dragona/ranger')->name('ranger');
Route::inertia('/magician', 'Dragona/magician')->name('magician');
Route::inertia('/scout', 'Dragona/scout')->name('scout');
Route::inertia('/download', 'Dragona/download')->name('download');
Route::inertia('/faq', 'Dragona/faq')->name('faq');

foreach (['announcement', 'patch-announcement', 'notice', 'events'] as $category) {
    Route::get('/'.$category, [PublicationController::class, 'category'])->defaults('category', $category)->name($category);
}
Route::get('/posts/{slug}', [PublicationController::class, 'show'])->name('posts.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', AccountDashboardController::class)->name('dashboard');
});

Route::middleware(['auth', EnsureSuperadmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('posts', PostController::class)->except('show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
