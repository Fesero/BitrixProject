<?php
declare(strict_types=1);

namespace Local\Service\Event;

use Bitrix\Main\Event;

class EventDispatcher implements EventDispatcherInterface
{
    public function send(string $moduleId, string $moduleType, array $params=[]): void
    {
        $event = new Event(
            $moduleId,
            $moduleType,
            $params
        );

        $event->send();
    }
}