<?php

declare(strict_types=1);

namespace Bitrix\Sale;

use Bitrix\Main\Result;

class BasketItem
{
    public function getProductId(): int
    {
        return 0;
    }
    public function getCurrency(): string
    {
        return '';
    }
    public function getPrice(): float
    {
        return 0.0;
    }
    public function getFinalPrice(): float
    {
        return 0.0;
    }
    public function getQuantity(): float
    {
        return 0.0;
    }
    public function getId(): int
    {
        return 0;
    }
    /** @return mixed */
    public function getField(string $name): mixed
    {
        return null;
    }
    public function setField(string $name, mixed $value): void
    {
    }
    /** @param array<string, mixed> $fields */
    public function setFields(array $fields): void
    {
    }
    public function delete(): void
    {
    }
}

class BasketBase
{
    public function save(): Result
    {
        return new Result();
    }
    public function getPrice(): float
    {
        return 0.0;
    }
    public function getItemById(int $id): ?BasketItem
    {
        return null;
    }
    /** @return BasketItem[] */
    public function getExistsItems(string $moduleId, int $productId): array
    {
        return [];
    }
    public function createItem(string $moduleId, int $productId): BasketItem
    {
        return new BasketItem();
    }
}

class Basket extends BasketBase
{
    /** @return BasketItem[] */
    public function getBasketItems(): array
    {
        return [];
    }
    public function isEmpty(): bool
    {
        return true;
    }
    public static function loadItemsForFUser(int $fuserId, string $siteId): static
    {
        return new static();
    }
}

class Fuser
{
    public static function getId(bool $skipCreate = false): int
    {
        return 0;
    }
    public static function getIdByUserId(int $userId): int
    {
        return 0;
    }
}

class PropertyItem
{
    /** @return mixed */
    public function getField(string $name): mixed
    {
        return null;
    }
    public function setValue(mixed $value): Result
    {
        return new Result();
    }
}

/** @implements \IteratorAggregate<int, PropertyItem> */
class PropertyCollection implements \IteratorAggregate
{
    /** @return \ArrayIterator<int, PropertyItem> */
    public function getIterator(): \ArrayIterator
    {
        return new \ArrayIterator([]);
    }
}

class Payment
{
    public function setField(string $name, mixed $value): Result
    {
        return new Result();
    }
}

class PaymentCollection
{
    public function createItem(): Payment
    {
        return new Payment();
    }
}

class ShipmentItem
{
    public function setQuantity(float $quantity): Result
    {
        return new Result();
    }
}

class ShipmentItemCollection
{
    public function createItem(BasketItem $basketItem): ShipmentItem
    {
        return new ShipmentItem();
    }
}

class Shipment
{
    /** @param array<string, mixed> $fields */
    public function setFields(array $fields): Result
    {
        return new Result();
    }
    public function getShipmentItemCollection(): ShipmentItemCollection
    {
        return new ShipmentItemCollection();
    }
}

class ShipmentCollection
{
    public function createItem(): Shipment
    {
        return new Shipment();
    }
}

class Order
{
    public static function create(string $siteId, int $userId, string $currency = 'RUB'): static
    {
        return new static();
    }
    public function setPersonTypeId(int $personTypeId): Result
    {
        return new Result();
    }
    public function setBasket(Basket $basket): Result
    {
        return new Result();
    }
    public function setField(string $name, mixed $value): Result
    {
        return new Result();
    }
    public function doFinalAction(bool $flag): Result
    {
        return new Result();
    }
    public function save(): Result
    {
        return new Result();
    }
    public function getId(): int
    {
        return 0;
    }
    public function getPrice(): float
    {
        return 0.0;
    }
    public function getCurrency(): string
    {
        return '';
    }
    public function getBasket(): Basket
    {
        return new Basket();
    }
    public function getPropertyCollection(): PropertyCollection
    {
        return new PropertyCollection();
    }
    public function getShipmentCollection(): ShipmentCollection
    {
        return new ShipmentCollection();
    }
    public function getPaymentCollection(): PaymentCollection
    {
        return new PaymentCollection();
    }
}

class DiscountCouponsManager
{
    public static function add(string $coupon): bool
    {
        return true;
    }
}

namespace Bitrix\Sale\Delivery\Services;

class ServiceBase
{
    public function getName(): string
    {
        return '';
    }
}

class Manager
{
    public static function getObjectById(int $id): ?ServiceBase
    {
        return null;
    }
}
