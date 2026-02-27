<?php

use PHPUnit\Framework\TestCase;
use Bitrix\Main\Result;
use Local\DTO\OrderCreateDTO;
use Local\Service\Event\EventDispatcherInterface;
use Local\Service\OrderService;
use Local\Service\Order\OrderGatewayInterface;

class OrderServiceTest extends TestCase
{
    private function createValidDto(): OrderCreateDTO
    {
        return new OrderCreateDTO(
            personTypeId: 1,
            deliveryServiceId: 2,
            paySystemId: 3,
            items: [],
            properties: [
                'PHONE' => '+79999999999',
                'EMAIL' => 'test@example.com',
            ],
            comment: 'Test order',
            currency: 'RUB'
        );
    }

    public function testCreateOrderSuccess(): void
    {
        $dto = $this->createValidDto();

        $gatewayResult = new Result();
        $gatewayResult->setData([
            'orderId'  => 123,
            'price'    => 1000.0,
            'currency' => 'RUB',
        ]);

        $gatewayMock = $this->createMock(OrderGatewayInterface::class);
        $gatewayMock
            ->expects($this->once())
            ->method('createFromBasket')
            ->with($dto)
            ->willReturn($gatewayResult);

        $eventDispatcherMock = $this->createMock(EventDispatcherInterface::class);
        $eventDispatcherMock
            ->expects($this->once())
            ->method('send')
            ->with(
                'local',
                'OnOrderCreated',
                $this->callback(function (array $params): bool {
                    return isset($params['ORDER_ID']) && $params['ORDER_ID'] === 123;
                })
            );

        $service = new OrderService($gatewayMock, $eventDispatcherMock);

        $result = $service->createFromBasket($dto, 10, 's1');

        $this->assertTrue($result->isSuccess());
        $this->assertSame(123, $result->getData()['orderId']);
    }

    public function testCreateOrderFailsIfGatewayError(): void
    {
        $dto = $this->createValidDto();

        $gatewayResult = new Result();
        $gatewayResult->addError(new \Bitrix\Main\Error('Some error', 'GATEWAY_ERROR'));

        $gatewayMock = $this->createMock(OrderGatewayInterface::class);
        $gatewayMock
            ->expects($this->once())
            ->method('createFromBasket')
            ->with($dto)
            ->willReturn($gatewayResult);

        $eventDispatcherMock = $this->createMock(EventDispatcherInterface::class);
        $eventDispatcherMock
            ->expects($this->never())
            ->method('send');

        $service = new OrderService($gatewayMock, $eventDispatcherMock);

        $result = $service->createFromBasket($dto, 10, 's1');

        $this->assertFalse($result->isSuccess());
    }

    public function testCreateOrderFailsOnMissingPhone(): void
    {
        $dto = new OrderCreateDTO(
            personTypeId: 1,
            deliveryServiceId: 2,
            paySystemId: 3,
            items: [],
            properties: [ // без PHONE
                'EMAIL' => 'test@example.com',
            ],
            comment: null,
            currency: 'RUB'
        );

        $gatewayMock = $this->createMock(OrderGatewayInterface::class);
        $gatewayMock
            ->expects($this->never())
            ->method('createFromBasket');

        $eventDispatcherMock = $this->createMock(EventDispatcherInterface::class);
        $eventDispatcherMock
            ->expects($this->never())
            ->method('send');

        $service = new OrderService($gatewayMock, $eventDispatcherMock);

        $result = $service->createFromBasket($dto, 10, 's1');

        $this->assertFalse($result->isSuccess());
    }
}
