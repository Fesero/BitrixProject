<?php

declare(strict_types=1);

namespace Local\Application\Service;

use Bitrix\Main\Context;
use Bitrix\Main\Loader;
use Bitrix\Sale;
use Bitrix\Main\Error;
use Bitrix\Main\Result;
use Exception;
use Local\Infrastructure\Transformer\BasketTransformer;
use Local\Application\Port\Out\BasketRepositoryInterface;

Loader::includeModule('sale');
Loader::includeModule('catalog');

class BasketService
{
    private BasketTransformer $basketTransformer;

    public function __construct(
        private readonly BasketRepositoryInterface $basketRepositoryInterface
    ) {
        $this->basketTransformer = new BasketTransformer();
    }

    /**
     * @param int $productId
     * @param int $quantity
     * @return Result
     */
    public function addToBasket(int $productId, int $quantity): Result
    {
        $result = new Result();

        try {
            $basket = $this->getBasketEntity();

            if ($items = $basket->getExistsItems('catalog', $productId)) {
                foreach ($items as $item) {
                    $item->setField('QUANTITY', $item->getQuantity() + $quantity);
                }
            } else {
                $item = $basket->createItem('catalog', $productId);

                $item->setFields([
                    'QUANTITY' => $quantity,
                    'CURRENCY' => \Bitrix\Currency\CurrencyManager::getBaseCurrency(),
                    'LID' => Context::getCurrent()->getSite(),
                    'PRODUCT_PROVIDER_CLASS' => \Bitrix\Catalog\Product\Basket::class,
                ]);
            }

            $saveResult = $basket->save();

            if (!$saveResult->isSuccess()) {
                $result->addErrors($saveResult->getErrors());

                return $result;
            }

            return $this->processResult($basket);

        } catch (Exception  $e) {
            $result->addError(new Error($e->getMessage()));
        }

        return  $result;
    }

    /**
     * @return Result
     */
    public function getBasketData(): Result
    {
        $basket = $this->getBasketEntity();
        return $this->processResult($basket);
    }

    /**
     * @param int $basketItemId
     * @param float $quantity
     * @return Result
     */
    public function updateItemQuantity(int $basketItemId, float $quantity): Result
    {
        $result = new Result();
        $basket = $this->getBasketEntity();

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

        return $this->processResult($basket);
    }

    /**
     * @param int $basketItemId
     * @return Result
     */
    public function deleteItem(int $basketItemId): Result
    {
        $result = new Result();
        $basket = $this->getBasketEntity();
        $item = $basket->getItemById($basketItemId);

        if ($item) {
            $item->delete();
            $saveResult = $basket->save();
            if (!$saveResult->isSuccess()) {
                $result->addErrors($saveResult->getErrors());
                return $result;
            }
        }

        return $this->processResult($basket);
    }

    /**
     * @return Sale\Basket
     */
    private function getBasketEntity(): Sale\Basket
    {
        $fUserId = $this->basketRepositoryInterface->getFUserId();
        $siteId = Context::getCurrent()->getSite();
        return $this->basketRepositoryInterface->loadForFUser($fUserId, $siteId);
    }

    /**
     * @param Sale\Basket $basket
     * @return Result
     */
    private function processResult(Sale\Basket $basket): Result
    {
        $result = new Result();

        $dto = $this->basketTransformer->transform($basket);

        $result->setData(['basket' => $dto]);

        return $result;
    }
}
