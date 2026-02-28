<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\BasketDTO;
use Local\DTO\BasketItemDTO;

class BasketDTOTest extends TestCase
{
    private function createBasketItemDTO(): BasketItemDTO
    {
        return new BasketItemDTO(1, 1, 'test', 1000, 'RUB', 1000, 'RUB', 2);
    }

    private function createBasketDTO(): BasketDTO
    {
        return new BasketDTO(
            10,
            'RUB',
            5,
            [$this->createBasketItemDTO()]
        );
    }

    public function testConstructorFields(): void
    {
        $dto = $this->createBasketDTO();

        $this->assertSame(10.0, $dto->totalPrice);
        $this->assertSame('RUB', $dto->totalPriceFormatted);
        $this->assertSame(5, $dto->totalCount);
        $this->assertCount(1, $dto->items);
    }

    public function testJsonSerialize(): void
    {
        $dto = $this->createBasketDTO();

        $json = $dto->jsonSerialize();

        $this->assertSame(10.0, $json['totalPrice']);
        $this->assertSame('RUB', $json['totalPriceFormatted']);
        $this->assertSame(5, $json['totalCount']);
        $this->assertCount(1, $json['items']);
    }
}
