<?php

declare(strict_types=1);

namespace My\Api\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Error;
use Local\Application\Service\BasketService;
use Bitrix\Main\DI\ServiceLocator;

class BasketController extends Controller
{
    /**
     * Summary of configureActions
     * @return array<string, array<string, array<ActionFilter\HttpMethod|string>>>
     */
    public function configureActions(): array
    {
        $prefilters = [
            'prefilters' => [
                new ActionFilter\HttpMethod([ActionFilter\HttpMethod::METHOD_POST]),
            ],
            '-prefilters' => [
                ActionFilter\Csrf::class,
            ]
        ];

        return [
            'add' => $prefilters,
            'delete' => $prefilters,
            'update' => $prefilters,
            'get' => [
                'prefilters' => [
                    new ActionFilter\HttpMethod([ActionFilter\HttpMethod::METHOD_GET, ActionFilter\HttpMethod::METHOD_POST]),
                ],
            ],
        ];
    }

    public function addAction(int $productId, int $quantity = 0): mixed
    {
        if ($productId <= 0 || $quantity <= 0) {
            $this->addError(new Error('WRONG PARAMS', 'INVALID_PARAMS'));
            return null;
        }

        $service = $this->getBasketService();
        $result = $service->addToBasket($productId, $quantity);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());

            return null;
        }

        return $result->getData()['basket'];
    }

    public function getAction(): mixed
    {
        $service = $this->getBasketService();
        $result = $service->getBasketData();

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }

        return $result->getData()['basket'];
    }

    public function updateAction(int $productId, float $quantity): mixed
    {
        $service = $this->getBasketService();
        $result = $service->updateItemQuantity($productId, $quantity);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }

        return $result->getData()['basket'];
    }

    public function deleteAction(int $productId): mixed
    {
        $service = $this->getBasketService();
        $result = $service->deleteItem($productId);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }

        return $result->getData()['basket'];
    }

    private function getBasketService(): BasketService
    {
        $service = ServiceLocator::getInstance()->get(BasketService::class);

        if (!$service instanceof BasketService) {
            throw new \RuntimeException('BasketService not found in ServiceLocator');
        }

        return $service;
    }
}
