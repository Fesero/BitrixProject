<?php

declare(strict_types=1);

namespace Local\Application\MessageHandler;

use Local\Application\Message\SendWebhook;
use Local\Application\Service\NotificationService;
use Local\Application\Port\Out\RequestRepositoryInterface;

class SendWebhookHandler
{
    public function __construct(
        private readonly NotificationService $notificationService,
        private readonly RequestRepositoryInterface $requestRepositoryInterface
    ) {
    }

    public function __invoke(SendWebhook $message): void
    {
        echo sprintf("[%s] Processing Webhook for Request ID: %d ... ", date('H:i:s'), $message->requestId);

        try {
            $request = $this->requestRepositoryInterface->findById($message->requestId);

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

            $success = $this->notificationService->sendWebhook($crmPayload);

            if ($success) {
                echo "SUCCESS (Sent)\n";
            } else {
                echo "FAILED (Http Error)\n";
            }
        } catch (\Throwable $e) {
            echo "CRITICAL ERROR: " . $e->getMessage() . "\n";
        }
    }
}
