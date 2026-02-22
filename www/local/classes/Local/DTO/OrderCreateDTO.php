<?php

declare(strict_types=1);

namespace Local\DTO;

readonly class OrderCreateDTO
{
    /**
     *
     * @param int $userId
     * @param string $siteId
     * @param int $personTypeId
     * @param int $deliveryServiceId
     * @param int $paySystemId
     * @param array<string, mixed> $items
     * @param array<string, mixed> $properties
     * @param string|null $comment
     * @param string $currency
     */
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
    ) {
    }
}
