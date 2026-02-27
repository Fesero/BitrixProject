<?php

declare(strict_types=1);

namespace Local\Service\Order;

use Bitrix\Main\Result;
use Local\DTO\OrderCreateDTO;

interface OrderGatewayInterface
{
    public function createFromBasket(OrderCreateDTO $dto, int $userId, string $siteId): Result;
}
