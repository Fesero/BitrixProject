<?php
declare(strict_types=1);

namespace Local\Service;
use Local\Model\RequestTable;
use Local\DTO\RequestDTO;
use Bitrix\Main\Event;

class RequestService
{
    public function createRequest(RequestDTO $requestDTO): int
    {
        $result = RequestTable::add([
            'USER_NAME' => $requestDTO->name,
            'PHONE' => $requestDTO->phone,
            'COMMENT' => $requestDTO->comment ?? '',
        ]);
        
        if (!$result->isSuccess()) {
            throw new \Exception(implode(', ', $result->getErrorMessages()));
        }

        $id = $result->getId();

        $event = new Event(
            'local',
            'OnAfterRequestAdd',
            [
                'id' => $id,
                'fields' => $requestDTO
            ]
        );

        $event->send();
        
        return $id;
    }
}