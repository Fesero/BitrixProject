<?php

declare(strict_types=1);

namespace Local\Infrastructure\Http;

use Bitrix\Main\Web\HttpClient;
use Bitrix\Main\Web\Json;
use Local\Application\Port\Out\HttpClientPort;

class BitrixHttpClient implements HttpClientPort
{
    /** @param array<string, mixed> $payload */
    public function postJson(string $url, array $payload): bool
    {
        $client = new HttpClient(['socketTimeout' => 5, 'streamTimeout' => 5]);
        $client->setHeader('Content-Type', 'application/json');

        try {
            /** @var string $json */
            $json = Json::encode($payload);

            $client->post($url, $json);

            return $client->getStatus() === 200;
        } catch (\Exception) {
            return false;
        }
    }
}
