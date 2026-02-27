<?php

declare(strict_types=1);

namespace Local\DTO;

readonly class OrderCreateDTO
{
    /**
     * @param int $personTypeId
     * @param int $deliveryServiceId
     * @param int $paySystemId
     * @param array<int|string, mixed> $items
     * @param array<string, mixed> $properties
     * @param string|null $comment
     * @param string $currency
     */
    public function __construct(
        public int $personTypeId,
        public int $deliveryServiceId,
        public int $paySystemId,
        public array $items,
        public array $properties,
        public ?string $comment = null,
        public string $currency = 'RUB',
    ) {
    }

    /**
     * @param array<string, array<string, mixed>|string|int|null> $payload
     */
    public static function fromArray(array $payload): self
    {
        $personTypeId = (int)($payload['personTypeId'] ?? $payload['PERSON_TYPE_ID'] ?? 0);
        $deliveryServiceId = (int)($payload['deliveryServiceId'] ?? $payload['DELIVERY_SERVICE_ID'] ?? 0);
        $paySystemId = (int)($payload['paySystemId'] ?? $payload['PAY_SYSTEM_ID'] ?? 0);

        /** @var array<string, array<string, mixed>> $items */
        $items = (array)($payload['items'] ?? $payload['ITEMS'] ?? []);

        /** @var array<string, array<string, mixed>> $properties */
        $properties = (array)($payload['properties'] ?? $payload['PROPERTIES'] ?? []);

        $rawComment = $payload['comment'] ?? null;
        $comment = ($rawComment !== null && \is_scalar($rawComment)) ? (string)$rawComment : null;

        $rawCurrency = $payload['currency'] ?? $payload['CURRENCY'] ?? 'RUB';
        $currency = \is_scalar($rawCurrency) ? (string)$rawCurrency : 'RUB';

        return new self(
            $personTypeId,
            $deliveryServiceId,
            $paySystemId,
            $items,
            $properties,
            $comment,
            $currency
        );
    }
}
