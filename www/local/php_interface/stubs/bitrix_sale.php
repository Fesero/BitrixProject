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
}

class Order
{
    public static function create(string $siteId, int $userId, string $currency = 'RUB'): static
    {
        return new static();
    }

    public function setBasket(Basket $basket): Result
    {
        return new Result();
    }

    public function setField(string $name, mixed $value): Result
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
}
