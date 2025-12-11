<?php
declare(strict_types=1);

namespace Local\MessageHandler;

use Local\Message\SendWebhook;
use Local\Service\NotificationService;
use Bitrix\Main\Loader;
use Local\Model\RequestTable;

class SendWebhookHandler
{
    public function __invoke(SendWebhook $message)
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

            $service = new NotificationService();
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
}