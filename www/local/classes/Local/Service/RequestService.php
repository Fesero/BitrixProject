<?php

declare(strict_types=1);

namespace Local\Service;

use Local\DTO\RequestDTO;
use Local\Repository\RequestRepositoryInterface;
use Local\Service\Event\EventDispatcherInterface;

class RequestService
{
    public function __construct(
        private readonly RequestRepositoryInterface $repository,
        private readonly EventDispatcherInterface $eventDispatcher
    ) {

    }

    public function createRequest(RequestDTO $requestDTO): int
    {
        $id = $this->repository->save($requestDTO);

        if ($id === null) {
            throw new \RuntimeException('Failed to save request');
        }

        $this->eventDispatcher->send(
            'local',
            'OnAfterRequestAdd',
            [
                'id' => $id,
                'fields' => $requestDTO
            ]
        );

        return $id;
    }

    /**
     * @param int $id
     * @throws \RuntimeException
     * @return array<string, mixed>
     */
    public function getRequestInfo(int $id): array
    {
        $data = $this->repository->findById($id);

        if ($data === null) {
            throw new \RuntimeException("Заявка #$id не найдена");
        }

        return $data;
    }

    /**
     * @return array<string, mixed>
     */
    public function getAll(): ?array
    {
        $data = $this->repository->getAll();

        return $data ?? [];
    }
}
