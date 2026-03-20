<?php

declare(strict_types=1);

namespace Local\Application\DTO;

readonly class BasketItemDTO implements \JsonSerializable
{
    public function __construct(
        public int $id,
        public int $productId,
        public string $name,
        public float $price,
        public string $formattedPrice,
        public float $sum,
        public string $formattedSum,
        public int $quantity,
        public ?string $image = null,
        public string $detailUrl = ''
    ) {
    }

    /**
     * Summary of jsonSerialize
     * @return array{detailUrl: string, formattedPrice: string, formattedSum: string, id: int, image: string|null, name: string, price: float, productId: int, quantity: int, sum: float}
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'productId' => $this->productId,
            'name' => $this->name,
            'price' => $this->price,
            'formattedPrice' => $this->formattedPrice,
            'sum' => $this->sum,
            'formattedSum' => $this->formattedSum,
            'quantity' => $this->quantity,
            'image' => $this->image,
            'detailUrl' => $this->detailUrl,
        ];
    }
}
