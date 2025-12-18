<?php
declare(strict_types=1);

namespace Local\DTO;

readonly class BasketDTO implements \JsonSerializable
{    
    public function __construct(
        public float $totalPrice,
        public string $totalPriceFormatted,
        public int $totalCount,
        public array $items
    ) {}

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