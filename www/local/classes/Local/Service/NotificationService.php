<?php

namespace Local\Service;

use Bitrix\Main\Web\HttpClient;
use Bitrix\Main\Web\Json;

class NotificationService
{
    private const WEBHOOK_URL = 'https://webhook.site/c472902a-e2ce-4878-9cbd-72d1c98a22ae';

    public function sendWebhook(array $payload): bool
    {
        $httpClient = new HttpClient([
            'socketTimeout' => 5, // Ждем соединения 5 сек
            'streamTimeout' => 5, // Ждем ответа 5 сек
        ]);

        $httpClient->setHeader('Content-Type', 'application/json');

        try {
            $jsonData = Json::encode($payload);

            $result = $httpClient->post(self::WEBHOOK_URL, $jsonData);

            $status = $httpClient->getStatus();

            if ($status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        }
    }
}