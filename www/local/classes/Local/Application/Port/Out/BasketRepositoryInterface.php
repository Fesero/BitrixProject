<?php

declare(strict_types=1);

namespace Local\Application\Port\Out;

use Bitrix\Sale\Basket;

interface BasketRepositoryInterface
{
    /**
     * @param int $fUserId
     * @param string $siteId
     * @return Basket
     */
    public function loadForFUser(int $fUserId, string $siteId): Basket;

    /**
     * @param int $userId
     * @return int
     */
    public function getFUserId(int $userId = 0): int;
}
