<?php

namespace Local\Repository;

use Local\Model\RequestTable;
use Local\DTO\RequestDTO;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;

class RequestRepository implements RequestRepositoryInterface
{
    public function save(RequestDTO $requestDTO): int|null
    {
        $result = RequestTable::add([
            'USER_NAME' => $requestDTO->name,
            'PHONE' => $requestDTO->phone,
            'COMMENT' => ($requestDTO->comment ?? '') . ' from repository',
        ]);

        if (!$result->isSuccess()) {
            throw new Exception(implode(', ', $result->getErrorMessages()));
        }

        $id = $result->getId();

        if (\is_int($id)) {
            return $id;
        } else {
            return null;
        }
    }

    public function findById(int $id): ?array
    {
        try {
            $row = RequestTable::getByPrimary($id)->fetch();

            return $row === false ? null : $row;
        } catch (ObjectPropertyException|ArgumentException|SystemException $e) {
            return null;
        }
    }

    /**
     * Summary of getAll
     * @return array<array<string, mixed>>|null
     */
    public function getAll(): ?array
    {
        $queryResult = RequestTable::getList([
            'select' => [
                'ID',
                'USER_NAME',
                'USER_ID',
                'USER_LOGIN' => 'MY_USER.LOGIN',
                'USER_EMAIL' => 'MY_USER.EMAIL'
            ],
            'order' => ['ID' => 'DESC'],
        ]);

        $result = [];

        while ($row = $queryResult->fetch()) {
            /**
             * @var array<string, array<string|int, mixed>|bool|int|string|null> $row
             */

            if (\intval($row['ID']) > 0) {
                $item = [
                    'id' => \intval($row['ID']),
                    'user_name' => $row['USER_NAME'],
                    'auth_info' => null,
                ];

                if (\intval($row['USER_ID']) > 0) {
                    $item['auth_info'] = [
                        'id'    => \intval($row['USER_ID']),
                        'login' => $row['USER_LOGIN'],
                        'email' => $row['USER_EMAIL'],
                    ];
                }

                $result[] = $item;
            }
        }

        return $result;
    }
}
