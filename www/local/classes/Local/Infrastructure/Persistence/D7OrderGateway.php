<?php

declare(strict_types=1);

namespace Local\Infrastructure\Persistence;

use Bitrix\Main\Error;
use Bitrix\Main\Loader;
use Bitrix\Main\Result;
use Bitrix\Sale;
use Bitrix\Sale\DiscountCouponsManager;
use Local\Application\DTO\OrderCreateDTO;
use Local\Application\Port\Out\OrderGatewayInterface;

class D7OrderGateway implements OrderGatewayInterface
{
    public function __construct()
    {
        Loader::includeModule('sale');
        Loader::includeModule('catalog');
    }

    public function createFromBasket(OrderCreateDTO $dto, int $userId, string $siteId): Result
    {
        $result = new Result();

        $basket = $this->loadBasket($siteId, $userId);

        if ($basket === null || $basket->isEmpty()) {
            $result->addError(new Error('Basket is empty', 'BASKET_EMPTY'));
            return $result;
        }

        $order = Sale\Order::create($siteId, $userId);
        $order->setPersonTypeId($dto->personTypeId);
        $order->setField('CURRENCY', $dto->currency);
        $order->setBasket($basket);

        $this->fillProperties($order, $dto->properties);
        $this->createShipment($order, $dto->deliveryServiceId);
        $this->createPayment($order, $dto->paySystemId);

        if (!empty($dto->properties['COUPON']) && \is_string($dto->properties['COUPON'])) {
            DiscountCouponsManager::add($dto->properties['COUPON']);
        }

        $order->doFinalAction(true);

        $saveResult = $order->save();

        if (!$saveResult->isSuccess()) {
            foreach ($saveResult->getErrors() as $error) {
                $result->addError($error);
            }

            return $result;
        }

        $result->setData([
            'orderId'  => $order->getId(),
            'price'    => $order->getPrice(),
            'currency' => $order->getCurrency(),
        ]);

        return $result;
    }

    private function loadBasket(string $siteId, int $userId): ?Sale\Basket
    {
        if ($userId > 0) {
            $fUserId = Sale\Fuser::getIdByUserId($userId);
        } else {
            $fUserId = Sale\Fuser::getId();
        }

        if (!$fUserId) {
            return null;
        }

        return Sale\Basket::loadItemsForFUser($fUserId, $siteId);
    }

    /**
     * @param array<string, mixed> $properties
     */
    private function fillProperties(Sale\Order $order, array $properties): void
    {
        $propertyCollection = $order->getPropertyCollection();

        foreach ($propertyCollection as $propertyItem) {
            $code = $propertyItem->getField('CODE');
            if (!\is_string($code) || $code === '') {
                continue;
            }

            if (\array_key_exists($code, $properties)) {
                $propertyItem->setValue($properties[$code]);
            }
        }
    }

    private function createShipment(Sale\Order $order, int $deliveryServiceId): void
    {
        $shipmentCollection = $order->getShipmentCollection();
        $shipment = $shipmentCollection->createItem();

        $service = Sale\Delivery\Services\Manager::getObjectById($deliveryServiceId);
        if ($service !== null) {
            $shipment->setFields([
                'DELIVERY_ID'   => $deliveryServiceId,
                'DELIVERY_NAME' => $service->getName(),
            ]);
        }

        $basket = $order->getBasket();
        $shipmentItemCollection = $shipment->getShipmentItemCollection();

        foreach ($basket->getBasketItems() as $basketItem) {
            $shipmentItem = $shipmentItemCollection->createItem($basketItem);
            $shipmentItem->setQuantity($basketItem->getQuantity());
        }
    }

    private function createPayment(Sale\Order $order, int $paySystemId): void
    {
        $paymentCollection = $order->getPaymentCollection();
        $payment = $paymentCollection->createItem();

        $payment->setField('SUM', $order->getPrice());
        $payment->setField('CURRENCY', $order->getCurrency());
        $payment->setField('PAY_SYSTEM_ID', $paySystemId);
    }
}
