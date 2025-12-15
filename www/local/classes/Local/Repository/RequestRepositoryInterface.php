<?php

namespace Local\Repository;

use Local\DTO\RequestDTO;

interface RequestRepositoryInterface
{
    /**
     * Сохраняет данные заявки.
     *
     * @param RequestDTO $requestDTO
     * @return integer
     */
    public function save(RequestDTO $requestDTO): int;

    /**
     * Поиск заявки по id
     *
     * @param integer $id
     * @return array|null
     */
    public function findById(int $id): ?array;

    /**
     * Получение всех заявок
     *
     * @return array|null
     */
    public function getAll(): ?array;
}
