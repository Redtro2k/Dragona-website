<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateSuperadmin extends Command
{
    protected $signature = 'app:create-superadmin {email} {--name=Superadmin}';

    protected $description = 'Create a superadmin with a generated password, or promote an existing account without changing its password';

    public function handle(): int
    {
        $email = strtolower(trim($this->argument('email')));
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Enter a valid email address.');

            return self::FAILURE;
        }
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->forceFill(['role' => 'superadmin'])->save();
            $this->info('Existing account promoted. Its password was not changed.');

            return self::SUCCESS;
        }
        $password = Str::password(24);
        $user = new User;
        $user->forceFill([
            'name' => $this->option('name'),
            'email' => $email,
            'password' => $password,
            'role' => 'superadmin',
        ])->save();
        $this->info('Superadmin created: '.$email);
        $this->line('Temporary password: '.$password);

        return self::SUCCESS;
    }
}
