<?php
declare(strict_types=1);

namespace Local\Service;

use Bitrix\Main\Context;
use Bitrix\Main\Loader;
use Bitrix\Sale;
use Bitrix\Main\Error;
use Bitrix\Main\Result;

Loader::includeModule('sale');
Loader::includeModule('catalog');

class BasketService
{
    public function addToBasket(int $productId, int $quantity): Result
    {
        $result = new Result();

        try {
            $fUserId = Sale\Fuser::getId();
            $siteId = Context::getCurrent()->getSite();

            $basket = Sale\Basket::loadItemsForFUser($fUserId, $siteId);

            if ($items = $basket->getExistsItems('catalog', $productId)) {
                foreach ($items as $item) {
                    $item->setField('QUANTITY', $item->getQuantity() + $quantity);
                }
            } else {
                $item = $basket->createItem('catalog', $productId);

                $item->setFields([
                    'QUANTITY' => $quantity,
                    'CURRENCY' => \Bitrix\Currency\CurrencyManager::getBaseCurrency(),
                    'LID' => $siteId,
                    'PRODUCT_PROVIDER_CLASS' => \Bitrix\Catalog\Product\Basket::class,
                ]);
            }

            $saveResult = $basket->save();

            if (!$saveResult->isSuccess()) {
                $result->addErrors($saveResult->getErrors());

                return $result;
            }

            $data = [
                'basketTotal' => $basket->getPrice(),
                'basketCount' => \count($basket->getQuantityList()),
                'currentItemQuantity' => $item->getQuantity(),
            ];

            return $this->getBasketData(); 
        } catch (\Exception  $e) {
            $result->addError(new Error($e->getMessage()));
        }

        return  $result;
    }

    private function getBasket(): Sale\BasketBase
    {
        $fUserId = Sale\Fuser::getId();
        $siteId = Context::getCurrent()->getSite();
        return Sale\Basket::loadItemsForFUser($fUserId, $siteId);
    }

    public function getBasketData(): Result
    {
        $result = new Result();
        $basket = $this->getBasket();

        $items = [];
        foreach ($basket as $basketItem) {
            $items[] = [
                'id' => (int)$basketItem->getId(),
                'productId' => (int)$basketItem->getProductId(),
                'name' => $basketItem->getField('NAME'),
                'price' => (float)$basketItem->getPrice(),
                'quantity' => (int)$basketItem->getQuantity(),
                'sum' => (float)$basketItem->getFinalPrice(),
            ];
        }

        $result->setData([
            'items' => $items,
            'totalPrice' => $basket->getPrice(),
            'totalCount' => array_sum($basket->getQuantityList()),
        ]);

        return $result;
    }

    public function updateItemQuantity(int $basketItemId, float $quantity): Result
    {
        $result = new Result();
        $basket = $this->getBasket();
        $item = $basket->getItemById($basketItemId);

        if (!$item) {
            $result->addError(new Error('Item not found', 'ITEM_NOT_FOUND'));
            return $result;
        }

        if ($quantity <= 0) {
            $item->delete();
        } else {
            $item->setField('QUANTITY', $quantity);
        }

        $saveResult = $basket->save();
        if (!$saveResult->isSuccess()) {
            $result->addErrors($saveResult->getErrors());
            return $result;
        }

        return $this->getBasketData();
    }

    public function deleteItem(int $basketItemId): Result
    {
        $result = new Result();
        $basket = $this->getBasket();
        $item = $basket->getItemById($basketItemId);

        if ($item) {
            $item->delete();
            $saveResult = $basket->save();
            if (!$saveResult->isSuccess()) {
                $result->addErrors($saveResult->getErrors());
                return $result;
            }
        }
        
        return $this->getBasketData();
    }
}
