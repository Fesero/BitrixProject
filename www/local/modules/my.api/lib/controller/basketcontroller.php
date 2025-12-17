<?php
declare(strict_types=1);

namespace My\Api\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Error;

use Local\Service\BasketService;

class Basketcontroller extends Controller
{
    public function configureActions()
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

    public function addAction(int $productId, int $quantity = 0)
    {
        if ($productId <= 0 || $quantity <= 0) {
            $this->addError(new Error('WRONG PARAMS', 'INVALID_PARAMS'));
            return null;
        }

        $service = new BasketService();
        $result = $service->addToBasket($productId, $quantity);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());

            return null;
        }

        return $result->getData();
    }

    public function getAction()
    {
        $service = new BasketService();
        $result = $service->getBasketData();

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }
        return $result->getData();
    }

    public function updateAction(int $productId, float $quantity)
    {
        $service = new BasketService();
        $result = $service->updateItemQuantity($productId, $quantity);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }
        return $result->getData();
    }

    public function deleteAction(int $productId)
    {
        $service = new BasketService();
        $result = $service->deleteItem($productId);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }
        return $result->getData();
    }
}