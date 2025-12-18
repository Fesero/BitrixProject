<?php
declare(strict_types=1);

namespace Local\Transformer;

use Bitrix\Sale\Basket;
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

    public function transform(Basket $basket): BasketDTO
    {
        $items = [];
        $productIds = [];

        foreach ($basket as $basketItem) {
            $productIds[] = $basketItem->getProductId();
        }

        $catalogData = $this->loadCatalogData(array_unique($productIds));

        foreach ($basket as $basketItem) {
            $prodId = $basketItem->getProductId();
            
            $currency = $basketItem->getCurrency();
            $price = $basketItem->getPrice();
            $sum = $basketItem->getFinalPrice();

            $formattedPrice = \CCurrencyLang::CurrencyFormat($price, $currency, true);
            $formattedSum = \CCurrencyLang::CurrencyFormat($sum, $currency, true);

            $items[] = new BasketItemDto(
                id: $basketItem->getId(),
                productId: $prodId,
                name: $basketItem->getField('NAME'),
                price: $price,
                formattedPrice: html_entity_decode($formattedPrice),
                sum: $sum,
                formattedSum: html_entity_decode($formattedSum),
                quantity: (int)$basketItem->getQuantity(),
                image: $catalogData[$prodId]['image'] ?? null,
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

    private function loadCatalogData(array $productIds): array
    {
        if (empty($productIds)) {
            return [];
        }

        $result = [];

        $iterator = ElementTable::getList([
            'select' => ['ID', 'PREVIEW_PICTURE', 'DETAIL_PICTURE', 'IBLOCK_ID', 'CODE'],
            'filter' => ['ID' => $productIds]
        ]);

        while ($row = $iterator->fetch()) {
            $imgId = $row['PREVIEW_PICTURE'] ?: $row['DETAIL_PICTURE'];
            $imgSrc = null;

            if ($imgId > 0) {
                $imgSrc = \CFile::GetPath($imgId); 
            } else {
                $imgSrc = '';
            }

            # TODO: url
            $url = '/catalog/' . $row['ID'] . '/'; 

            $result[$row['ID']] = [
                'image' => $imgSrc,
                'detailUrl' => $url
            ];
        }

        return $result;
    }
}
