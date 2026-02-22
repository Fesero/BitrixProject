<?php

declare(strict_types=1);

namespace Local\Transformer;

use Bitrix\Sale\Basket;
use Bitrix\Sale\BasketItem;
use Bitrix\Iblock\ElementTable;
use Bitrix\Main\Loader;
use Local\DTO\BasketDTO;
use Local\DTO\BasketItemDTO;

class BasketTransformer
{
    public function __construct()
    {
        Loader::includeModule('iblock');
        Loader::includeModule('sale');
    }

    /**
     * Summary of transform
     * @param Basket $basket
     * @return BasketDTO
     */
    public function transform(Basket $basket): BasketDTO
    {
        $items = [];
        $productIds = [];

        /** @var BasketItem $basketItem */
        foreach ($basket->getBasketItems() as $basketItem) {
            $productIds[] = $basketItem->getProductId();
        }

        $catalogData = $this->loadCatalogData(array_unique($productIds));

        /** @var BasketItem $basketItem */
        foreach ($basket->getBasketItems() as $basketItem) {
            $prodId = $basketItem->getProductId();

            $currency = $basketItem->getCurrency();
            $price = $basketItem->getPrice();
            $sum = $basketItem->getFinalPrice();

            $formattedPrice = \CCurrencyLang::CurrencyFormat($price, $currency, true);
            $formattedSum = \CCurrencyLang::CurrencyFormat($sum, $currency, true);

            $field = $basketItem->getField('NAME');

            $name = match (true) {
                \is_string($field) => $field,
                \is_int($field), \is_float($field), \is_bool($field) => (string)$field,
                $field instanceof \Stringable => (string)$field,
                default => '',
            };

            $items[] = new BasketItemDTO(
                id: $basketItem->getId(),
                productId: $prodId,
                name: $name,
                price: $price,
                formattedPrice: html_entity_decode($formattedPrice),
                sum: $sum,
                formattedSum: html_entity_decode($formattedSum),
                quantity: (int)$basketItem->getQuantity(),
                image: ($catalogData[$prodId]['image']) ?? null,
                detailUrl: $catalogData[$prodId]['detailUrl'] ?? '#'
            );
        }

        $totalPrice = $basket->getPrice();
        $totalFormatted = \CCurrencyLang::CurrencyFormat($totalPrice, \Bitrix\Currency\CurrencyManager::getBaseCurrency(), true);

        $totalCount = \count($basket->getBasketItems());

        return new BasketDTO(
            totalPrice: $totalPrice,
            totalPriceFormatted: html_entity_decode($totalFormatted),
            totalCount: $totalCount,
            items: $items
        );
    }

    /**
     * Summary of loadCatalogData
     * @param array<int> $productIds
     * @return array<int, array<string, string|null>>
     */
    private function loadCatalogData(array $productIds): array
    {
        if (empty($productIds)) {
            return [];
        }

        $result = [];

        /** @var \Bitrix\Main\ORM\Query\Result $iterator */
        $iterator = ElementTable::getList([
            'select' => ['ID', 'PREVIEW_PICTURE', 'DETAIL_PICTURE', 'IBLOCK_ID', 'CODE'],
            'filter' => ['ID' => $productIds]
        ]);

        while ($row = $iterator->fetch()) {
            /** @var array{
             *   ID:int|string,
             *   PREVIEW_PICTURE:int|string|null,
             *   DETAIL_PICTURE:int|string|null
             * } $row */

            $imgId = $row['PREVIEW_PICTURE'] ?: $row['DETAIL_PICTURE'];

            $imgSrc = \intval($imgId) > 0 ? \CFile::GetPath(\intval($imgId)) : '';

            # TODO: url
            $url = '/catalog/' . $row['ID'] . '/';

            $result[\intval($row['ID'])] = [
                'image' => $imgSrc,
                'detailUrl' => $url
            ];
        }

        return $result;
    }
}
