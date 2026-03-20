<?php

declare(strict_types=1);

namespace Local\Application\Port\Out;

use Bitrix\Main\Result;
use Local\Application\DTO\OrderCreateDTO;

interface OrderGatewayInterface
{
    public function createFromBasket(OrderCreateDTO $dto, int $userId, string $siteId): Result;
}
