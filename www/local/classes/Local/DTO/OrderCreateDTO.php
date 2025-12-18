<?php
declare(strict_types=1);

namespace Local\DTO;

readonly class OrderCreateDTO
{
    public function __construct(
        public int $userId,
        public string $siteId,
        public int $personTypeId,
        public int $deliveryServiceId,
        public int $paySystemId,
        public array $items,
        public array $properties,
        public ?string $comment = null,
        public string $currency = 'RUB',
    ) {}
}