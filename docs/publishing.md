# Publishing website posts

Superadmins use /admin/posts to create, edit, filter, publish, unpublish, or delete posts.
The four supported categories are Announcement, Patch Announcement, Notice, and Event.
Normal registered accounts have the user role and cannot access publishing routes.

Posts require a title, a short summary, content, and a category. Content supports Markdown.
Raw HTML and unsafe links are stripped when rendering public articles. Cover images may be
JPG, PNG, or WebP up to 4 MB; the default realm image is used when no cover is supplied.

Save draft keeps the post private (and removes an existing publication from the website).
Publish post makes it visible in the landing page's latest six posts and in its paginated category.
Public article links are stable when titles or categories change. Delete removes the post permanently.

The local dummy account is superadmin@dragona.test. Its generated password is provided in the task,
not committed to source. Change it through /settings/security after signing in.

To create or promote another account from the trusted server console:
    php artisan app:create-superadmin user@example.com --name="Display Name"

Existing passwords are preserved on promotion. Newly created accounts receive a generated password.
Roles are not accepted through registration or profile-update forms.

Database setup:
    php artisan migrate

The public storage link must point at storage/app/public for cover images:
    php artisan storage:link

Verification:
    php artisan test
    npm run types:check
    npm run build
    php vendor/bin/phpstan analyse --memory-limit=512M
