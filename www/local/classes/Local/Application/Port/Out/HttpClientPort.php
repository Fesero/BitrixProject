<?php

declare(strict_types=1);

namespace Local\Application\Port\Out;

interface HttpClientPort
{
    /** @param array<string, mixed> $payload */
    public function postJson(string $url, array $payload): bool;
}
