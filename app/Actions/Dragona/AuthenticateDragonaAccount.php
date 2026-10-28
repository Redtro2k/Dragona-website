<?php

namespace App\Actions\Dragona;

use App\Models\GameAccount;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOStatement;

class AuthenticateDragonaAccount
{
    public function handle(string $username, string $password, ?string $ipAddress): ?GameAccount
    {
        $statement = DB::connection('dragona')->getPdo()->prepare(
            <<<'SQL'
                EXEC dbo.usp_AccountLogin_Local
                    @IdName = ?,
                    @Passwd = ?,
                    @IP = ?
                SQL,
        );

        try {
            $statement->execute([
                $username,
                $password,
                $this->normalizeIpAddress($ipAddress),
            ]);

            $login = $this->firstResultRow($statement);
        } finally {
            $statement->closeCursor();
        }

        if ($login === null || (int) ($login[4] ?? -1) !== 0) {
            return null;
        }

        return GameAccount::query()->find((string) $login[1]);
    }

    /** @return array<int, mixed>|null */
    private function firstResultRow(PDOStatement $statement): ?array
    {
        do {
            if ($statement->columnCount() === 0) {
                continue;
            }

            $row = $statement->fetch(PDO::FETCH_NUM);

            return $row === false ? null : $row;
        } while ($statement->nextRowset());

        return null;
    }

    private function normalizeIpAddress(?string $ipAddress): string
    {
        return filter_var($ipAddress, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)
            ? $ipAddress
            : '0.0.0.0';
    }
}
