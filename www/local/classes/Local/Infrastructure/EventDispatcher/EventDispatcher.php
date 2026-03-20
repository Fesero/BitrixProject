<?php

declare(strict_types=1);

namespace Local\Infrastructure\EventDispatcher;

use Bitrix\Main\Event;
use Local\Application\Port\Out\EventDispatcherInterface;

class EventDispatcher implements EventDispatcherInterface
{
    public function send(string $moduleId, string $moduleType, array $params = []): void
    {
        $event = new Event(
            $moduleId,
            $moduleType,
            $params
        );

        $event->send();
    }
}
