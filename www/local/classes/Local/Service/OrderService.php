<?php

declare(strict_types=1);

namespace Local\Service;

use Bitrix\Main\Error;
use Bitrix\Main\Result;
use Local\DTO\OrderCreateDTO;
use Local\Service\Event\EventDispatcherInterface;
use Local\Service\Order\OrderGatewayInterface;

class OrderService
{
    public function __construct(
        private readonly OrderGatewayInterface $gateway,
        private readonly EventDispatcherInterface $eventDispatcher
    ) {
    }

    public function createFromBasket(OrderCreateDTO $dto, int $userId, string $siteId): Result
    {
        $validationResult = $this->validateDto($dto);

        if (!$validationResult->isSuccess()) {
            return $validationResult;
        }

        $gatewayResult = $this->gateway->createFromBasket($dto, $userId, $siteId);

        if (!$gatewayResult->isSuccess()) {
            return $gatewayResult;
        }

        /** @var array<string, string|int|null> $data */
        $data = $gatewayResult->getData();
        $orderId = (int)($data['orderId'] ?? 0);

        if ($orderId <= 0) {
            $result = new Result();
            $result->addError(new Error('Order ID is empty in gateway result', 'ORDER_ID_IS_EMPTY'));
            return $result;
        }

        $this->eventDispatcher->send(
            'local',
            'OnOrderCreated',
            [
                'ORDER_ID'   => $orderId,
                'ORDER_DATA' => $data,
                'DTO'        => $dto,
            ]
        );

        $result = new Result();
        $result->setData($data);

        return $result;
    }

    private function validateDto(OrderCreateDTO $dto): Result
    {
        $result = new Result();

        if ($dto->personTypeId <= 0) {
            $result->addError(new Error('Person type ID must be greater than 0', 'INVALID_PERSON_TYPE_ID'));
        }

        if ($dto->deliveryServiceId <= 0) {
            $result->addError(new Error('Delivery service ID must be greater than 0', 'INVALID_DELIVERY_SERVICE_ID'));
        }

        if ($dto->paySystemId <= 0) {
            $result->addError(new Error('Pay system ID must be greater than 0', 'INVALID_PAY_SYSTEM_ID'));
        }

        $requiredProperties = ['PHONE', 'EMAIL'];

        foreach ($requiredProperties as $code) {
            $value = $dto->properties[$code] ?? null;

            if ($value === null || $value === '') {
                $result->addError(
                    new Error(
                        \sprintf('Order property "%s" is required', $code),
                        \sprintf('MISSING_PROPERTY_%s', $code)
                    )
                );
            }
        }

        return $result;
    }
}
