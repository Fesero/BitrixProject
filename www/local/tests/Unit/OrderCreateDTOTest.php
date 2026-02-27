<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\OrderCreateDTO;

class OrderCreateDTOTest extends TestCase
{
    public function testConstructorSetsAllFields(): void
    {
        $dto = new OrderCreateDTO(
            personTypeId: 1,
            deliveryServiceId: 2,
            paySystemId: 3,
            items: [['productId' => 10, 'quantity' => 1]],
            properties: ['PHONE' => '+79001112233', 'EMAIL' => 'a@b.com'],
            comment: 'Тестовый заказ',
            currency: 'USD',
        );

        $this->assertSame(1, $dto->personTypeId);
        $this->assertSame(2, $dto->deliveryServiceId);
        $this->assertSame(3, $dto->paySystemId);
        $this->assertSame('Тестовый заказ', $dto->comment);
        $this->assertSame('USD', $dto->currency);
        $this->assertCount(1, $dto->items);
        $this->assertSame('+79001112233', $dto->properties['PHONE']);
    }

    public function testConstructorDefaultValues(): void
    {
        $dto = new OrderCreateDTO(
            personTypeId: 1,
            deliveryServiceId: 1,
            paySystemId: 1,
            items: [],
            properties: [],
        );

        $this->assertNull($dto->comment);
        $this->assertSame('RUB', $dto->currency);
    }

    public function testFromArrayWithCamelCaseKeys(): void
    {
        $payload = [
            'personTypeId'      => 1,
            'deliveryServiceId' => 2,
            'paySystemId'       => 3,
            'items'             => [],
            'properties'        => ['PHONE' => '+7999'],
            'comment'           => 'Тест',
            'currency'          => 'EUR',
        ];

        $dto = OrderCreateDTO::fromArray($payload);

        $this->assertSame(1, $dto->personTypeId);
        $this->assertSame(2, $dto->deliveryServiceId);
        $this->assertSame(3, $dto->paySystemId);
        $this->assertSame('Тест', $dto->comment);
        $this->assertSame('EUR', $dto->currency);
    }

    public function testFromArrayWithUpperCaseKeys(): void
    {
        $payload = [
            'PERSON_TYPE_ID'      => 5,
            'DELIVERY_SERVICE_ID' => 6,
            'PAY_SYSTEM_ID'       => 7,
            'ITEMS'               => [['id' => 1]],
            'PROPERTIES'          => ['EMAIL' => 'x@y.com'],
            'CURRENCY'            => 'USD',
        ];

        $dto = OrderCreateDTO::fromArray($payload);

        $this->assertSame(5, $dto->personTypeId);
        $this->assertSame(6, $dto->deliveryServiceId);
        $this->assertSame(7, $dto->paySystemId);
        $this->assertSame('USD', $dto->currency);
        $this->assertSame('x@y.com', $dto->properties['EMAIL']);
    }

    public function testFromArrayWithEmptyPayloadUsesDefaults(): void
    {
        $dto = OrderCreateDTO::fromArray([]);

        $this->assertSame(0, $dto->personTypeId);
        $this->assertSame(0, $dto->deliveryServiceId);
        $this->assertSame(0, $dto->paySystemId);

        $this->assertSame([], $dto->items);
        $this->assertSame([], $dto->properties);

        $this->assertNull($dto->comment);
        $this->assertSame('RUB', $dto->currency);
    }

    public function testFromArrayCommentNullWhenNotProvided(): void
    {
        $dtoWithout = OrderCreateDTO::fromArray(['personTypeId' => 1]);
        $this->assertNull($dtoWithout->comment);
    }

    public function testFromArrayCommentIgnoredWhenNonScalar(): void
    {
        $dto = OrderCreateDTO::fromArray([
            'comment' => ['some' => 'array'],
        ]);

        $this->assertNull($dto->comment);
    }

    public function testFromArrayCurrencyFallsBackToRubWhenNonScalar(): void
    {
        $dto = OrderCreateDTO::fromArray([
            'currency' => ['invalid'],
        ]);

        $this->assertSame('RUB', $dto->currency);
    }

    public function testFromArrayItemsAreCastToArray(): void
    {
        $items = [
            ['productId' => 1, 'qty' => 2],
            ['productId' => 5, 'qty' => 1],
        ];

        $dto = OrderCreateDTO::fromArray(['items' => $items]);

        $this->assertCount(2, $dto->items);
        $this->assertSame(1, $dto->items[0]['productId']);
    }

    public function testDtoIsReadonly(): void
    {
        $this->expectException(\Error::class);

        $dto = new OrderCreateDTO(1, 1, 1, [], []);

        $dto->personTypeId = 999;
    }
}