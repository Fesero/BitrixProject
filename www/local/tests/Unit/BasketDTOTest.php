<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\BasketDTO;
use Local\DTO\BasketItemDTO;

class BasketDTOTest extends TestCase
{
    private function createBasketItemDTO(): BasketItemDTO
    {
        return new BasketItemDTO(1, 1, 'test', 1000, '1 000 ₽', 1000, 'RUB', 2);
    }

    private function createBasketDTO(): BasketDTO
    {
        return new BasketDTO(
            10.0,
            '10 ₽',
            5,
            [$this->createBasketItemDTO()]
        );
    }

    public function testConstructorFields(): void
    {
        $dto = $this->createBasketDTO();

        $this->assertSame(10.0, $dto->totalPrice);
        $this->assertSame('10 ₽', $dto->totalPriceFormatted);
        $this->assertSame(5, $dto->totalCount);
        $this->assertCount(1, $dto->items);
    }

    public function testJsonSerialize(): void
    {
        $dto = $this->createBasketDTO();

        $json = $dto->jsonSerialize();

        $this->assertSame(10.0, $json['totalPrice']);
        $this->assertSame('10 ₽', $json['totalPriceFormatted']);
        $this->assertSame(5, $json['totalCount']);
        $this->assertCount(1, $json['items']);
    }

    public function testJsonEncodeRoundTrip(): void
    {
        $dto = $this->createBasketDTO();
        $decoded = json_decode(json_encode($dto), true);

        $this->assertSame(10, $decoded['totalPrice']);
        $this->assertSame(5, $decoded['totalCount']);
        $this->assertIsArray($decoded['items']);
        $this->assertCount(1, $decoded['items']);
    }

    public function testEmptyBasket(): void
    {
        $dto = new BasketDTO(
            totalPrice: 0.0,
            totalPriceFormatted: '0 ₽',
            totalCount: 0,
            items: [],
        );

        $this->assertSame(0, $dto->totalCount);
        $this->assertEmpty($dto->items);
    }
}
