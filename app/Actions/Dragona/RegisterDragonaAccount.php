<?php

namespace App\Actions\Dragona;

use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class RegisterDragonaAccount
{
    public function handle(string $username, string $email, string $password): int
    {
        $connection = DB::connection('dragona');

        try {
            return $connection->transaction(function () use ($connection, $username, $email, $password): int {
                $account = $this->createGameAccount($connection, $username, $password);
                $resultCode = (int) ($account->result_code ?? 3);

                if ($resultCode === 2) {
                    throw ValidationException::withMessages([
                        'username' => 'That account name is already in use.',
                    ]);
                }

                if ($resultCode !== 0 || empty($account->object_id)) {
                    throw new RuntimeException('The Dragona account procedure could not create the account.');
                }

                $objectId = (int) $account->object_id;
                $updated = $connection->table('dbo.tbl_Account')
                    ->where('ObjectId', $objectId)
                    ->update([
                        'Email' => $email,
                        'EmailVerifiedAt' => null,
                    ]);

                if ($updated !== 1) {
                    throw new RuntimeException('The email could not be attached to the Dragona account.');
                }

                return $objectId;
            }, 3);
        } catch (QueryException $exception) {
            $driverCode = (int) ($exception->errorInfo[1] ?? 0);

            if (in_array($driverCode, [2601, 2627], true)
                && str_contains($exception->getMessage(), 'UX_tbl_Account_Email')) {
                throw ValidationException::withMessages([
                    'email' => 'That email address is already in use.',
                ]);
            }

            throw $exception;
        }
    }

    private function createGameAccount(ConnectionInterface $connection, string $username, string $password): ?object
    {
        return $connection->selectOne(
            <<<'SQL'
                DECLARE @ReturnCode INT;
                DECLARE @Result TINYINT;
                DECLARE @ObjectId BIGINT;

                EXEC @ReturnCode = dbo.usp_AccountInsert_Local
                    @IdName = ?,
                    @Passwd = ?,
                    @Result = @Result OUTPUT,
                    @ObjectId = @ObjectId OUTPUT;

                SELECT
                    @ReturnCode AS return_code,
                    @Result AS result_code,
                    @ObjectId AS object_id;
                SQL,
            [$username, $password],
        );
    }
}
