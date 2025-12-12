<?php

declare(strict_types=1);

namespace Local\Service;

use Local\Model\RequestTable;
use Local\DTO\RequestDTO;
use Local\Repository\RequestRepositoryInterface;

use Bitrix\Main\Event;

class RequestService
{
    public function __construct(
        private readonly RequestRepositoryInterface $repository
    ) {

    }

    public function createRequest(RequestDTO $requestDTO): int
    {
        $id = $this->repository->save($requestDTO);

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

    public function getRequestInfo(int $id): array
    {
        $data = $this->repository->findById($id);
        
        if ($data === null) {
             throw new \RuntimeException("Заявка #$id не найдена");
        }
        
        return $data;
    }
}
