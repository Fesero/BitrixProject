<?php

declare(strict_types=1);

namespace Local\Infrastructure\Messenger;

use Local\Application\Message\SendWebhook;
use Local\Application\MessageHandler\SendWebhookHandler;
use Bitrix\Main\DI\ServiceLocator;
use Symfony\Component\Messenger\Handler\HandlersLocator;
use Symfony\Component\Messenger\MessageBus;
use Symfony\Component\Messenger\Middleware\HandleMessageMiddleware;
use Symfony\Component\Messenger\Middleware\SendMessageMiddleware;
use Symfony\Component\Messenger\Transport\Serialization\PhpSerializer;
use Symfony\Component\Messenger\Transport\Sender\SendersLocator;
use Symfony\Component\Messenger\Bridge\Redis\Transport\RedisTransportFactory;
use Symfony\Component\Messenger\Transport\TransportInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;

class BusFactory
{
    private const REDIS_DSN = 'redis://redis:6379/messages';

    /**
     * @return array{0: MessageBus, 1: TransportInterface}
     */
    public static function create(): array
    {
        $serializer = new PhpSerializer();

        $transportFactory = new RedisTransportFactory();

        $transport = $transportFactory->createTransport(
            self::REDIS_DSN,
            ['stream' => 'messages'],
            $serializer
        );

        $container = new class ($transport) implements ContainerInterface {
            private object $transport;

            public function __construct(object $transport)
            {
                $this->transport = $transport;
            }

            public function get(string $id)
            {
                if ($id === 'redis_transport') {
                    return $this->transport;
                }
                throw new class () extends \Exception implements NotFoundExceptionInterface {};
            }

            public function has(string $id): bool
            {
                return $id === 'redis_transport';
            }
        };

        $sendersLocator = new SendersLocator([
            SendWebhook::class => ['redis_transport'],
        ], $container);

        /**
         * @var SendWebhookHandler $sendWebhookHandler
         */
        $sendWebhookHandler = ServiceLocator::getInstance()->get(SendWebhookHandler::class);

        $handlersLocator = new HandlersLocator([
            SendWebhook::class => [$sendWebhookHandler],
        ]);

        $middleware = [
            new SendMessageMiddleware($sendersLocator),

            new HandleMessageMiddleware($handlersLocator),
        ];

        $bus = new MessageBus($middleware);

        return [$bus, $transport];
    }
}
