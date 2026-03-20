<?php

declare(strict_types=1);

namespace Local\Infrastructure\Persistence;

use Bitrix\Main\Loader;
use Bitrix\Sale\Basket;
use Bitrix\Sale\Fuser;
use Local\Application\Port\Out\BasketRepositoryInterface;

class D7BasketRepository implements BasketRepositoryInterface
{
    public function __construct()
    {
        Loader::includeModule('sale');
    }

    /**
     * @param int $fUserId
     * @param string $siteId
     * @return Basket
     */
    public function loadForFUser(int $fUserId, string $siteId): Basket
    {
        return Basket::loadItemsForFUser($fUserId, $siteId);
    }

    /**
     * @param int $userId
     * @return int
     */
    public function getFUserId(int $userId = 0): int
    {
        if ($userId > 0) {
            return (int) Fuser::getIdByUserId($userId);
        }

        return (int) Fuser::getId();
    }
}
