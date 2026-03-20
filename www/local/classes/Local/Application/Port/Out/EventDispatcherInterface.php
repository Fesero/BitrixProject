<?php

declare(strict_types=1);

namespace Local\Application\Port\Out;

interface EventDispatcherInterface
{
    /**
     * Summary of send
     * @param string $moduleId
     * @param string $eventType
     * @param array<string, mixed> $params
     * @return void
     */
    public function send(string $moduleId, string $eventType, array $params = []): void;
}
