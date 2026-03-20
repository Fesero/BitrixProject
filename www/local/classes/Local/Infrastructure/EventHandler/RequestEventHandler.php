<?php

declare(strict_types=1);

namespace Local\Infrastructure\EventHandler;

use Bitrix\Main\Event;
use Local\Application\Message\SendWebhook;
use Local\Infrastructure\Messenger\BusFactory;

class RequestEventHandler
{
    public static function onAdd(Event $event): void
    {
        $arParams = $event->getParameters();
        $id = $arParams['id'] ?? 0;

        if ($id <= 0) {
            return;
        }

        [$bus, $transport] = BusFactory::create();

        $message = new SendWebhook($id);

        $bus->dispatch($message);
    }
}
