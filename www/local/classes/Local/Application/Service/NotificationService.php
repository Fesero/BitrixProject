<?php

namespace Local\Application\Service;

use Local\Application\Port\Out\HttpClientPort;

class NotificationService
{
    private const WEBHOOK_URL = 'https://webhook.site/c472902a-e2ce-4878-9cbd-72d1c98a22ae';

    public function __construct(
        private readonly HttpClientPort $httpClientPort,
    ) {
    }

    /**
     * @param array<string, mixed> $payload
     * @return bool
     */
    public function sendWebhook(array $payload): bool
    {
        return $this->httpClientPort->postJson(self::WEBHOOK_URL, $payload);
    }
}
