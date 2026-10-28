<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;

class GameAccount extends Authenticatable
{
    protected $connection = 'dragona';

    protected $table = 'dbo.tbl_Account';

    protected $primaryKey = 'ObjectId';

    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'string';

    protected $visible = [
        'id',
        'name',
        'email',
        'role',
        'email_verified_at',
    ];

    protected $appends = [
        'id',
        'name',
        'email',
        'role',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'EmailVerifiedAt' => 'datetime',
            'RegDate' => 'datetime',
            'LastLogin' => 'datetime',
            'LastLogout' => 'datetime',
            'Status' => 'integer',
            'ConnectCount' => 'integer',
            'RecentWorld' => 'integer',
        ];
    }

    protected function id(): Attribute
    {
        return Attribute::get(fn (): string => (string) $this->getRawOriginal('ObjectId'));
    }

    protected function name(): Attribute
    {
        return Attribute::get(fn (): string => trim((string) $this->getRawOriginal('IdName')));
    }

    protected function email(): Attribute
    {
        return Attribute::get(fn (): string => trim((string) $this->getRawOriginal('Email')));
    }

    protected function role(): Attribute
    {
        return Attribute::get(function (): string {
            $role = strtolower(trim((string) $this->getRawOriginal('WebRole')));

            return in_array($role, ['user', 'moderator', 'superadmin'], true)
                ? $role
                : 'user';
        });
    }

    protected function emailVerifiedAt(): Attribute
    {
        return Attribute::get(fn (): mixed => $this->getRawOriginal('EmailVerifiedAt'));
    }

    public function getAuthPassword(): string
    {
        return '';
    }

    public function getRememberToken(): ?string
    {
        return null;
    }

    public function setRememberToken($value): void
    {
        // The legacy game account table has no Laravel remember-token column.
    }

    public function getRememberTokenName(): string
    {
        return '';
    }
}
