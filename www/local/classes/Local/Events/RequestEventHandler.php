<?php
declare(strict_types=1);

namespace Local\Events;

use Bitrix\Main\Event;
use Bitrix\Main\Diag\FileLogger;
use Bitrix\Main\Application;
use Local\Service\NotificationService;
use Local\Message\SendWebhook;
use Local\Service\BusFactory;

class RequestEventHandler
{
    public static function onAdd(Event $event)
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