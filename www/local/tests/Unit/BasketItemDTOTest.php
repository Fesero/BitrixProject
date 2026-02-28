<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\BasketItemDTO;

class BasketItemDTOTest extends TestCase
{
    private function createBasketItemDTO(?string $image = null): BasketItemDTO
    {
        return new BasketItemDTO(
            id: 1,
            productId: 2,
            name: 'Тестовый товар',
            price: 1000.0,
            formattedPrice: '1 000 ₽',
            sum: 2000.0,
            formattedSum: '2 000 ₽',
            quantity: 2,
            image: $image,
            detailUrl: '/catalog/tovar/',
        );
    }

    public function testConstructorFields(): void
    {
        $dto = $this->createBasketItemDTO();

        $this->assertSame(1, $dto->id);
        $this->assertSame(2, $dto->productId);
        $this->assertSame('Тестовый товар', $dto->name);
        $this->assertSame(1000.0, $dto->price);
        $this->assertSame('1 000 ₽', $dto->formattedPrice);
        $this->assertSame(2000.0, $dto->sum);
        $this->assertSame('2 000 ₽', $dto->formattedSum);
        $this->assertSame(2, $dto->quantity);
        $this->assertNull($dto->image);
        $this->assertSame('/catalog/tovar/', $dto->detailUrl);
    }

    public function testJsonSerialize(): void
    {
        $dto = $this->createBasketItemDTO();

        $json = $dto->jsonSerialize();

        $this->assertSame(1, $json['id']);
        $this->assertSame(2, $json['productId']);
        $this->assertSame('Тестовый товар', $json['name']);
        $this->assertSame(1000.0, $json['price']);
        $this->assertSame('1 000 ₽', $json['formattedPrice']);
        $this->assertSame(2000.0, $json['sum']);
        $this->assertSame('2 000 ₽', $json['formattedSum']);
        $this->assertSame(2, $json['quantity']);
        $this->assertNull($json['image']);
        $this->assertSame('/catalog/tovar/', $json['detailUrl']);
    }

    public function testImageCanBeSet(): void
    {
        $dto = $this->createBasketItemDTO('/upload/iblock/img.jpg');
        $this->assertSame('/upload/iblock/img.jpg', $dto->image);
        $this->assertSame('/upload/iblock/img.jpg', $dto->jsonSerialize()['image']);
    }

    public function testJsonEncodeRoundTrip(): void
    {
        $dto = $this->createBasketItemDTO();
        $json = json_encode($dto);
        $decoded = json_decode($json, true);

        $this->assertSame(1, $decoded['id']);
        $this->assertSame('1 000 ₽', $decoded['formattedPrice']);
        $this->assertSame(2, $decoded['quantity']);
    }

    public function testDtoIsReadonly(): void
    {
        $this->expectException(\Error::class);
        $dto = $this->createBasketItemDTO();
        /** @phpstan-ignore-next-line */
        $dto->price = 999.0;
    }
}
