<?php

declare(strict_types=1);

namespace Local\Infrastructure\DI;

use DI\Definition\Helper\AutowireDefinitionHelper;
use Local\Application\Port\Out\RequestRepositoryInterface;
use Local\Application\Port\Out\EventDispatcherInterface;
use Local\Application\Port\Out\OrderGatewayInterface;
use Local\Application\Port\Out\BasketRepositoryInterface;
use Local\Application\Port\Out\HttpClientPort;
use Local\Infrastructure\Persistence\RequestRepository;
use Local\Infrastructure\EventDispatcher\EventDispatcher;
use Local\Infrastructure\Persistence\D7OrderGateway;
use Local\Infrastructure\Persistence\D7BasketRepository;
use Local\Infrastructure\Http\BitrixHttpClient;

use function DI\autowire;

final class Bindings
{
    /**
     * @return array<string, AutowireDefinitionHelper>
     */
    public static function get(): array
    {
        return [
            RequestRepositoryInterface::class => autowire(RequestRepository::class),
            EventDispatcherInterface::class => autowire(EventDispatcher::class),
            OrderGatewayInterface::class => autowire(D7OrderGateway::class),
            BasketRepositoryInterface::class => autowire(D7BasketRepository::class),
            HttpClientPort::class => autowire(BitrixHttpClient::class),
        ];
    }
}
