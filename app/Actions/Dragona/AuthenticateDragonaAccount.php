<?php

namespace App\Actions\Dragona;

use App\Models\GameAccount;
use Illuminate\Support\Facades\DB;

class AuthenticateDragonaAccount
{
    public function handle(string $username, string $password, ?string $ipAddress): ?GameAccount
    {
        $login = DB::connection('dragona')->selectOne(
            <<<'SQL'
                DECLARE @Login TABLE
                (
                    IsInspectionTime TINYINT,
                    ObjectId BIGINT,
                    IdName NVARCHAR(20),
                    Passwd NVARCHAR(13),
                    Status TINYINT,
                    RecentWorld TINYINT,
                    Security TINYINT,
                    SubSecurity TINYINT,
                    Cash INT,
                    LastLogout NCHAR(19),
                    SecondPwd INT,
                    CBTEvent TINYINT,
                    AutoGuide SMALLINT
                );

                INSERT INTO @Login
                EXEC dbo.usp_AccountLogin_Local
                    @IdName = ?,
                    @Passwd = ?,
                    @IP = ?;

                SELECT TOP (1)
                    ObjectId AS object_id,
                    Status AS account_status
                FROM @Login;
                SQL,
            [$username, $password, $this->normalizeIpAddress($ipAddress)],
        );

        if ($login === null || (int) $login->account_status !== 0) {
            return null;
        }

        return GameAccount::query()->find((int) $login->object_id);
    }

    private function normalizeIpAddress(?string $ipAddress): string
    {
        return filter_var($ipAddress, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)
            ? $ipAddress
            : '0.0.0.0';
    }
}
