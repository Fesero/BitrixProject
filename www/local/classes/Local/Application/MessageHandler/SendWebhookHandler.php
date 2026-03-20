<?php

declare(strict_types=1);

namespace Local\Application\MessageHandler;

use Exception;
use Local\Application\Message\SendWebhook;
use Local\Application\Service\NotificationService;
use Local\Infrastructure\ORM\RequestTable;
use Bitrix\Main\DI\ServiceLocator;

class SendWebhookHandler
{
    public function __invoke(SendWebhook $message): void
    {
        echo sprintf("[%s] Processing Webhook for Request ID: %d ... ", date('H:i:s'), $message->requestId);

        try {
            $request = RequestTable::getByPrimary($message->requestId)->fetch();

            if (!$request) {
                echo "ERROR: Request not found in DB.\n";
                return;
            }

            $logMessage = sprintf(
                "[%s] WORKER: Обработка заявки ID %d. Отправка вебхука.",
                date('Y-m-d H:i:s'),
                $message->requestId
            );

            $crmPayload = [
                'data' => $request,
                'message' => $logMessage,
                'source' => 'async_worker'
            ];

            $service = $this->getNotificationService();
            $success = $service->sendWebhook($crmPayload);

            if ($success) {
                echo "SUCCESS (Sent)\n";
            } else {
                echo "FAILED (Http Error)\n";
            }
        } catch (\Throwable $e) {
            echo "CRITICAL ERROR: " . $e->getMessage() . "\n";
        }
    }

    private function getNotificationService(): NotificationService
    {
        $service = ServiceLocator::getInstance()->get(NotificationService::class);

        if (!$service instanceof NotificationService) {
            throw new Exception("NotificationService not found in ServiceLocator");
        }

        return $service;
    }
}
