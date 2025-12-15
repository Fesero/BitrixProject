<?php
declare(strict_types=1);

namespace Local\Service\Event;

interface EventDispatcherInterface
{
    public function send(string $moduleId, string $eventType, array $params = []): void;
}