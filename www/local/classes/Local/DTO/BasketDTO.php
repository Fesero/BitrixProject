<?php

declare(strict_types=1);

namespace Local\DTO;

readonly class BasketDTO implements \JsonSerializable
{
    /**
     * Summary of __construct
     * @param float $totalPrice
     * @param string $totalPriceFormatted
     * @param int $totalCount
     * @param BasketItemDTO[] $items
     */
    public function __construct(
        public float $totalPrice,
        public string $totalPriceFormatted,
        public int $totalCount,
        public array $items
    ) {
    }

    /**
     * Summary of jsonSerialize
     * @return array{items: array<string, mixed>, totalCount: int, totalPrice: float, totalPriceFormatted: string}
     */
    public function jsonSerialize(): array
    {
        return [
            'totalPrice' => $this->totalPrice,
            'totalPriceFormatted' => $this->totalPriceFormatted,
            'totalCount' => $this->totalCount,
            'items' => $this->items,
        ];
    }
}
