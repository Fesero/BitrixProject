<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\BasketItemDTO;

class BasketItemDTOTest extends TestCase
{
    private function createBasketItemDTO(): BasketItemDTO
    {
        return new BasketItemDTO(1, 2, 'test', 1000, 'RUB', 1000, 'RUB', 5);
    }

    public function testConstructorFields(): void
    {
        $dto = $this->createBasketItemDTO();

        $this->assertSame(1, $dto->id);
        $this->assertSame(2, $dto->productId);
        $this->assertSame('test', $dto->name);
        $this->assertSame(1000.0, $dto->price);
        $this->assertSame('RUB', $dto->formattedPrice);
        $this->assertSame(1000.0, $dto->sum);
        $this->assertSame('RUB', $dto->formattedSum);
        $this->assertSame(5, $dto->quantity);
        $this->assertNull($dto->image);
        $this->assertEmpty($dto->detailUrl);
    }

    public function testJsonSerialize(): void
    {
        $dto = $this->createBasketItemDTO();

        $json = $dto->jsonSerialize();

        $this->assertSame(1, $json['id']);
        $this->assertSame(2, $json['productId']);
        $this->assertSame('test', $json['name']);
        $this->assertSame(1000.0, $json['price']);
        $this->assertSame('RUB', $json['formattedPrice']);
        $this->assertSame(1000.0, $json['sum']);
        $this->assertSame('RUB', $json['formattedSum']);
        $this->assertSame(5, $json['quantity']);
        $this->assertNull($json['image']);
        $this->assertEmpty($json['detailUrl']);
    }
}
