<?php

namespace Local\Application\Port\Out;

use Local\Application\DTO\RequestDTO;

interface RequestRepositoryInterface
{
    /**
     * Сохраняет данные заявки.
     *
     * @param RequestDTO $requestDTO
     * @return integer|null
     */
    public function save(RequestDTO $requestDTO): int|null;

    /**
     * Поиск заявки по id
     *
     * @param integer $id
     * @return array<string, mixed>|null
     */
    public function findById(int $id): ?array;

    /**
     * Получение всех заявок
     *
     * @return array<string, mixed>|null
     */
    public function getAll(): ?array;
}
