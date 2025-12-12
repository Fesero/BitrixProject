<?php

namespace Local\Repository;

use Local\Model\RequestTable;
use Local\DTO\RequestDTO;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Event;
use Exception;

class RequestRepository implements RequestRepositoryInterface
{
    public function save(RequestDTO $requestDTO): int
    {
        $result = RequestTable::add([
            'USER_NAME' => $requestDTO->name,
            'PHONE' => $requestDTO->phone,
            'COMMENT' => $requestDTO->comment . ' from repository' ?? '',
        ]);

        if (!$result->isSuccess()) {
            throw new \Exception(implode(', ', $result->getErrorMessages()));
        }

        return $result->getId();
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
}
